import React from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaChartBar, FaTicketAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="p-4 bg-white text-black flex justify-center space-x-6 shadow-md">
      <Link to="/" className="flex items-center gap-2 hover:text-gray-600">
        <FaHome /> Home
      </Link>
      <Link to="/events" className="flex items-center gap-2 hover:text-gray-600">
        <FaCalendarAlt /> Events
      </Link>
      <Link to="/schedule" className="flex items-center gap-2 hover:text-gray-600">
        <FaCalendarAlt /> Event Schedule
      </Link>
      <Link to="/attendees" className="flex items-center gap-2 hover:text-gray-600">
        <FaUsers /> Attendee List
      </Link>
      <Link to="/analytics" className="flex items-center gap-2 hover:text-gray-600">
        <FaChartBar /> Analytics
      </Link>
      <Link to="/purchase" className="flex items-center gap-2 hover:text-gray-600">
        <FaTicketAlt /> Buy Ticket
      </Link>
      <Link to="/my-tickets" className="flex items-center gap-2 hover:text-gray-600">
        <FaTicketAlt /> My Tickets
      </Link>
    </nav>
  );
};

export default Navbar;
