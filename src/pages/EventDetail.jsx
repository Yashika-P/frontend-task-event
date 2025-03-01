import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/api";
import TicketPurchase from "../components/TicketPurchase";
import axios from "axios";
const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
   
 const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(eventId); // ✅ Fetch event details
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600 mt-2">{event.description}</p>
      <p className="mt-2">Date: {event.date}</p>
      <p className="mt-2">Location: {event.location}</p>
      <p className="mt-2">Price: ${event.price}</p>
      <TicketPurchase event={event} />
    </div>
  );
};

const handleBuyTicket = async () => {
  alert("Ticket purchase UI only (No payment integration)");
};
<button 
  onClick={handleBuyTicket} 
  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
>
  Buy Ticket
</button>

const handleRegister = async () => {
  alert("User registered for the event (UI only)");
};
<button 
  onClick={handleRegister} 
  className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
>
  Register for Event
</button>




export default EventDetail;
