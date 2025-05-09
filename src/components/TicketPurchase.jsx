import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById, purchaseTicket } from '../api/api'; // ✅ Include purchaseTicket
import { useAuth } from '../context/AuthContext'; // ✅ Import useAuth

const TicketPurchase = () => {
  const { id } = useParams();
  //const navigate = useNavigate(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ticketType, setTicketType] = useState('General');
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth(); // ✅ Get the logged-in user

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

   const handlePurchase = async () => {
        try {
            if (!user || !user._id) {
                alert("Please log in first.");
                return;
            }

            const userId = user._id; // ✅ Make sure this is correctly defined

            const ticketData = {
                eventId: event._id,
                userId,  // ✅ Correct usage
                ticketType,
                price: event.price || 100, // Default price if not available
                quantity,
            };

      const response = await purchaseTicket(ticketData);
      alert('🎟️ Ticket purchased successfully!');
      console.log('Purchase Response:', response.data);
    } catch (error) {
      alert('❌ Purchase failed. Try again.');
      console.error('Purchase error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p className="mb-2">{event.description}</p>
      <p className="mb-2">📅 {new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-4">💵 Price: ${event.price}</p>

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
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handlePurchase}
        className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
      >
        Buy Ticket
      </button>
    </div>
  );
};

export default TicketPurchase;
