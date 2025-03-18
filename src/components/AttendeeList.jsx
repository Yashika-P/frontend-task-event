import { useState, useEffect } from "react";
import { fetchAttendees } from "../api/api"; // ✅ Importing correctly

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttendees = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetchAttendees(); // ✅ Use imported function directly
        setAttendees(response.data);
      } catch (error) {
        console.error("Failed to fetch attendees:", error);
        setError("Failed to load attendees");
      } finally {
        setLoading(false);
      }
    };

    loadAttendees(); // ✅ No conflict now
  }, []);

  if (loading) return <p className="text-center text-white">Loading attendees...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12"
      style={{ backgroundImage: `url('/images/attendees-bg.jpg')` }}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Attendee List
        </h1>
        {attendees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Event</th>
                  <th className="py-3 px-6 text-left">Registered Date</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee) => (
                  <tr key={attendee._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{attendee.name}</td>
                    <td className="py-3 px-6">{attendee.email}</td>
                    <td className="py-3 px-6">{attendee.eventTitle}</td>
                    <td className="py-3 px-6">
                      {new Date(attendee.registeredDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white text-center mt-4">No attendees registered yet.</p>
        )}
      </div>
    </div>
  );
};

export default AttendeeList;
