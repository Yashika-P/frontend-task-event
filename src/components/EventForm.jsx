import React, { useState } from "react";

const EventForm = ({ onSubmit }) => {
  const [eventData, setEventData] = useState({ title: "", date: "" });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={eventData.title}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
};

export default EventForm;
