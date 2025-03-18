import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name || "User"}!</h2>
      <p>Select an option below:</p>
      <div className="mt-4">
        <Link to="/events" className="bg-green-500 text-white px-4 py-2 rounded mr-2">View Events</Link>
        <Link to="/create-event" className="bg-blue-500 text-white px-4 py-2 rounded">Create Event</Link>
      </div>
    </div>
  );
};

export default Dashboard;
