import React from "react";

import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  if (!event || !event._id) return null;
  return (
    <div className="p-4 border rounded">
      <img src={event.image || "/images/tech conference.jpg"} alt={event.title} className="w-full h-40 object-cover mb-2" />
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <Link to={`/events/${event.id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Buy Tickets
        </button>
      </Link>
    </div>
  );
};

export default EventCard;