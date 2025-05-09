import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById, purchaseTicket } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ticketType, setTicketType] = useState("General");
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        setError("Failed to load event details.");
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

 const handlePurchase = async () => {
    // 🟢 Make sure the user is logged in
    const userId = user?._id || user?.userId; // handle both backend response types
    if (!userId) {
        alert("⚠️ Please log in first.");
        return;
    }

    try {
            const ticketData = {
                eventId: event._id,
                userId: user._id || user.userId,
                ticketType,
                price: event.price || 100,  // 🟢 Set a default price if not available
                quantity,
            };

            // 🟢 Make sure the API call includes credentials
            await purchaseTicket(ticketData);
            alert("🎟️ Ticket purchased successfully!");
            
            // ✅ Redirect to My Tickets Page
            navigate("/my-tickets");
        } catch (error) {
            alert("❌ Purchase failed. Try again.");
            console.error("Purchase error:", error);
        }
    };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
        <img 
          src={event.image || "/images/music-festival.jpg"} 
          alt={event.title} 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-lg text-gray-700 mb-2">{event.description}</p>
        <p className="text-gray-500 mb-2">📍 {event.location}</p>
        <p className="text-gray-500 mb-6">📅 {new Date(event.date).toLocaleDateString()}</p>

        {/* Ticket Purchase UI */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Buy Tickets</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Ticket Type</label>
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
            <label className="block mb-1 font-medium">Quantity</label>
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
            className="w-full bg-black text-white p-3 rounded hover:opacity-90 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
