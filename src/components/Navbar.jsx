import React from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaChartBar, FaTicketAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-center space-x-6 shadow-md">
      <Link to="/" className="flex items-center gap-2 hover:text-blue-400">
        <FaHome /> Home
      </Link>
      <Link to="/events" className="flex items-center gap-2 hover:text-blue-400">
        <FaCalendarAlt /> Events
      </Link>
      <Link to="/schedule" className="flex items-center gap-2 hover:text-blue-400">
        <FaCalendarAlt /> Event Schedule
      </Link>
      <Link to="/attendees" className="flex items-center gap-2 hover:text-blue-400">
        <FaUsers /> Attendee List
      </Link>
      <Link to="/analytics" className="flex items-center gap-2 hover:text-blue-400">
        <FaChartBar /> Analytics
      </Link>
      <Link to="/purchase" className="flex items-center gap-2 hover:text-blue-400">
        <FaTicketAlt /> Buy Ticket
      </Link>
    </nav>
  );
};

export default Navbar;


