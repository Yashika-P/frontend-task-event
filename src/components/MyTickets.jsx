import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserTickets } from "../api/api";

const MyTickets = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getUserTickets(user._id || user.userId);
                setTickets(response);
                console.log("✅ User Tickets:", response);
            } catch (error) {
                console.error("Error fetching tickets:", error);
                setError("Error loading your tickets. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchTickets();
    }, [user]);

    if (loading) return <p>Loading your tickets...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
            {tickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => (
                        <div key={ticket._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">{ticket.eventId.title}</h2>
                            <p className="text-gray-700 mb-2">🎫 {ticket.ticketType} - {ticket.quantity} Ticket(s)</p>
                            <p className="text-gray-500">📅 {new Date(ticket.eventId.date).toLocaleDateString()}</p>
                            <p className="text-gray-500">📍 {ticket.eventId.location}</p>
                            <p className="text-gray-900 font-bold">💲 {ticket.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tickets purchased yet.</p>
            )}
        </div>
    );
};

export default MyTickets;
