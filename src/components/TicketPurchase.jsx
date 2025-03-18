import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/api';

const TicketPurchase = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getEventById(id);
        console.log('Event data:', data);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p className="mb-2">{event.description}</p>
      <p className="mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-2">Price: ${event.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Buy Ticket
      </button>
    </div>
  );
};

export default TicketPurchase;
