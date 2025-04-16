import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api" // Development
    : "https://backend-task-erlt.onrender.com/api"; // Production

// ✅ Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

// ✅ Register User
export const registerUser = async (userData) => {
    try {
        console.log("📌 Sending registration request:", userData); // Debugging log
        const response = await api.post("/auth/register", userData);
        console.log("✅ Registration successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("🚨 Registration error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Registration failed. Please try again.");
        throw error;
    }
};

// ✅ Fetch all events
export const getEvents = async () => {
  try {
    const response = await api.get('/events'); // ✅ Changed from API.get() to api.get()
    console.log('📌 API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    throw error;
  }
};

// ✅ Fetch event by ID
export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`); // ✅ Fixed API call
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// ✅ Create a new event (Admin Only)
export const createEvent = async (eventData) => {
  try {
    const response = await api.post("/events", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};



// ✅ Login user (Fixed API call)
export const loginUser = async (userData) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", userData, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response;
};

// ✅ Logout user
export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// ✅ Purchase Ticket (Fixed API call)
export const purchaseTicket = async (eventId, userId, ticketType, price, quantity) => {
  try {
    console.log("📌 Sending ticket data:", { eventId, userId, ticketType, price, quantity });

    const response = await api.post(`/tickets`, {
      eventId,
      userId,
      ticketType,
      price,
      quantity,
    });

    console.log("✅ Ticket purchased:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error purchasing ticket:", error);
    throw error;
  }
};

// ✅ Fetch all events (For Admin Dashboard)
export const getAllEvents = async () => {
  try {
    const response = await api.get(`/events/all`); // ✅ Fixed API call
    return response.data;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};



// ✅ Approve an event (Admin)
export const approveEvent = async (eventId) => {
  try {
    await api.put(`/events/${eventId}/approve`);
  } catch (error) {
    console.error("Error approving event:", error);
    throw error;
  }
};

// ✅ Reject an event (Admin)
export const rejectEvent = async (eventId) => {
  try {
    await api.put(`/events/${eventId}/reject`);
  } catch (error) {
    console.error("Error rejecting event:", error);
    throw error;
  }
};

// ✅ Fetch user's registered events
export const getUserEvents = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user events:", error);
    return [];
  }
};


// ✅ Fetch and manage attendees
export const fetchAttendees = () => api.get('/attendees');
export const createAttendee = (attendee) => api.post('/attendees', attendee);
export const deleteAttendee = (id) => api.delete(`/attendees/${id}`);

export default api;
