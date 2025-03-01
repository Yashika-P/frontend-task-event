const AttendeeList = ({ attendees }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-xl font-bold">Attendee List</h3>
      <ul className="mt-2">
        {attendees.map((attendee, index) => (
          <li key={index} className="border-b py-2">{attendee.name} - {attendee.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeList;
