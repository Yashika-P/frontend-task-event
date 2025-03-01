import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  if (!event || !event._id) {
    return <p>Error: Event data is missing</p>;
  }

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p>{event.description}</p>
      <Link to={`/events/${event._id}`} className="text-blue-500">
        View Event
      </Link>
    </div>
  );
};

export default EventCard;
