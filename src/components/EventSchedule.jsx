import React from "react";

const EventSchedule = ({ schedule }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold">Event Schedule</h2>
      {schedule?.length > 0 ? (
        <ul className="mt-2">
          {schedule.map((session, index) => (
            <li key={index} className="border-b py-2">
              <strong>{session.time}:</strong> {session.topic} - {session.speaker}
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedule available.</p>
      )}
    </div>
  );
};

export default EventSchedule;
