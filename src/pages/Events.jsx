import { useState, useEffect } from "react";
import { getEvents } from "../api/api";
import { Link } from "react-router-dom";


const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getEvents();
        console.log("Fetched events in Events.jsx:", data);
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12"
      style={{ backgroundImage: `url('/images/events.jpg')` }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
          Upcoming Events
        </h1>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id} // ✅ Fixed key value
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {/* ✅ Use different images for each event */}
                <img
                  src={event.image || `/images/default-event.jpg`} // ✅ Dynamic image loading
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <Link to={`/event/${event._id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
               View Details
               </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-lg">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
