import { useState } from "react";

const EventForm = ({ onSubmit, initialData = {} }) => {
  const [event, setEvent] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    date: initialData.date || "",
    location: initialData.location || "",
    price: initialData.price || "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="title" value={event.title} onChange={handleChange} placeholder="Event Title" className="w-full p-2 border" required />
      <textarea name="description" value={event.description} onChange={handleChange} placeholder="Event Description" className="w-full p-2 border" required />
      <input type="date" name="date" value={event.date} onChange={handleChange} className="w-full p-2 border" required />
      <input type="text" name="location" value={event.location} onChange={handleChange} placeholder="Event Location" className="w-full p-2 border" required />
      <input type="number" name="price" value={event.price} onChange={handleChange} placeholder="Ticket Price" className="w-full p-2 border" required />
      <button type="submit" className="w-full bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default EventForm;
