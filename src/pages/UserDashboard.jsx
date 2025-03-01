import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserTickets } from "../api/api";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (user) {
        try {
          const data = await getUserTickets(user._id);
          setTickets(data);
        } catch (error) {
          console.error("Error fetching user tickets:", error);
        }
      }
    };

    fetchTickets();
  }, [user]);

  if (!user) {
    return <div className="text-center mt-10">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <p>Welcome, {user.name}!</p>

      <h3 className="text-xl font-bold mt-6">My Tickets</h3>
      {tickets.length > 0 ? (
        <ul className="mt-4">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="border-b py-2">
              {ticket.eventTitle} - {ticket.date}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">You have not registered for any events yet.</p>
      )}
    </div>
  );
};

export default UserDashboard;
