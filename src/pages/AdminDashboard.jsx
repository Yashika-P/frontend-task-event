import React, { useEffect, useState } from "react";
import { getEvents, approveEvent, rejectEvent } from "../api/api";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const data = await getEvents(); // Fetch events from API
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Call fetchEvents when the component mounts
  }, []);
  
  const handleApprove = async (id) => {
    try {
      await approveEvent(id);
      alert("Event approved!");
      fetchEvents();
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectEvent(id);
      alert("Event rejected!");
      fetchEvents();
    } catch (error) {
      console.error("Error rejecting event:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {events.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Title</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t">
                <td className="p-2">{event.title}</td>
                <td className="p-2">{event.date}</td>
                <td className="p-2">
                  <button onClick={() => handleApprove(event.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Approve</button>
                  <button onClick={() => handleReject(event.id)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending events.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
