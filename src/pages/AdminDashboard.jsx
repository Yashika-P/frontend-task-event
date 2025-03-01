import React, { useEffect, useState } from "react";
import { getPendingEvents, approveEvent, rejectEvent } from "../api/api";

const AdminDashboard = () => {
  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    const fetchPendingEvents = async () => {
      try {
        const data = await getPendingEvents();
        setPendingEvents(data);
      } catch (error) {
        console.error("Error fetching pending events:", error);
      }
    };

    fetchPendingEvents();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveEvent(id);
      setPendingEvents(pendingEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectEvent(id);
      setPendingEvents(pendingEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error rejecting event:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <h3 className="text-xl font-bold mt-6">Pending Event Approvals</h3>
      {pendingEvents.length > 0 ? (
        <ul className="mt-4">
          {pendingEvents.map((event) => (
            <li key={event._id} className="border-b py-2 flex justify-between">
              <div>
                {event.title} - {event.date}
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-3 py-1 mr-2"
                  onClick={() => handleApprove(event._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1"
                  onClick={() => handleReject(event._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">No pending events.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
