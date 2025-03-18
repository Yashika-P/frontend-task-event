import { useEffect, useState, useCallback } from "react";
import { getUserEvents } from "../api/api";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  const fetchUserEvents = useCallback(async () => {
    try {
      const data = await getUserEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  }, []); // Empty dependency ensures function reference remains stable

  useEffect(() => {
    fetchUserEvents(); // ✅ Now useEffect properly depends on fetchUserEvents
  }, [fetchUserEvents]); // ✅ Fixed Warning: Now it includes fetchUserEvents
  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="border-b py-2">
              <strong>{event.title}</strong> - {event.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No registered events.</p>
      )}
    </div>
  );
};

export default UserDashboard;

