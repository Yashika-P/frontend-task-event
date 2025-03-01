import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getEvents } from "../api/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents(); // ✅ Fetching events from API
        setEvents(response.data); // ✅ Storing events in state
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} /> // ✅ Now using EventCard component
          ))}
        </div>
      ) : (
        !loading && <p>No events available.</p>
      )}
    </div>
  );
};

export default Events;
 

  

  