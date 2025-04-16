import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById, purchaseTicket, purchaseTickett } from "../api/api";
import { useAuth } from "../context/AuthContext";

const EventDetail = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ticketType, setTicketType] = useState("General");
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth(); // ✅ To get logged-in user info

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getEventById(id);
        console.log("Fetched event details:", data);
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // ✅ Handle Ticket Purchase
  const handlePurchase = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Or get from AuthContext if you store it there
      if (!userId) {
        alert("Please log in first.");
        return;
      }

      const ticketData = {
        eventId: event._id,
        userId: userId,
        quantity: 1,
      };

      console.log("📌 Sending ticket data:", ticketData);
      const response = await purchaseTicket(ticketData);
      console.log("🎟️ Ticket purchase success:", response.data);
      alert("Ticket purchased successfully!");
    } catch (error) {
      console.error("❌ Failed to purchase ticket:", error);
      alert("Failed to purchase ticket. Please try again.");
    }
  };


  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
        <img 
          src={event.image || "/images/music festival.jpg"} 
          alt={event.title} 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-lg text-gray-700 mb-2">{event.description}</p>
        <p className="text-gray-500 mb-2">📍 {event.location}</p>
        <p className="text-gray-500 mb-6">📅 {new Date(event.date).toLocaleDateString()}</p>

        {/* ✅ Ticket Purchase Form */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Buy Tickets</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="General">General</option>
              <option value="VIP">VIP</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            onClick={handlePurchase}
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
