import { useEffect, useState } from 'react';
import { getEvents } from "../api/api";

const EventSchedule = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getEvents();
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

if (loading) return <p className="text-center text-white">Loading event schedule...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;


  return (
    <div
      className="min-h-screen bg-cover bg-center py-12"
      style={{ backgroundImage: `url('/images/event-schedule-bg.jpg')` }} // ✅ Background Image
    >
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Event Schedule
        </h1>
        {events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{event.title}</td>
                    <td className="py-3 px-6">{event.description}</td>
                    <td className="py-3 px-6">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">{event.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white text-center mt-4">No events scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventSchedule;
