import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api" // For development
    : "https://backend-task-erlt.onrender.com/api"; // For production

// Axios instance for cleaner requests
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Fetch all events
export const getEvents = async () => {
  try {
    const response = await API.get('/events');
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
    const response = await API.get(`/events/${id}`);
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

// ✅ Approve an event (Admin)
export const approveEvent = async (eventId) => {
  try {
    await api.put(`/events/${eventId}/approve`);
  } catch (error) {
    console.error("Error approving event:", error);
  }
};

// ✅ Reject an event (Admin)
export const rejectEvent = async (eventId) => {
  try {
    await api.put(`/events/${eventId}/reject`);
  } catch (error) {
    console.error("Error rejecting event:", error);
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

// ✅ Register a new user
export const registerUser = async (userData) => {
  try {
    console.log("📌 Sending userData:", userData);
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    console.log("✅ Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error registering user:", error.response || error.message);
    throw error.response?.data || error.message;
  }
};



// ✅ Login user
export const loginUser = async (email, password) => {
  try {
    // ✅ Ensure the correct body format
    const response = await API.post('/auth/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


// ✅ Logout user
export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// ✅ Purchase Ticket
export const purchaseTicket = async (eventId, userId, ticketType, price, quantity) => {
  try {
    console.log("📌 Sending ticket data:", { eventId, userId, ticketType, price, quantity });

    const response = await axios.post(`http://localhost:5000/api/tickets`, {
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


// Fetch all events (For Admin Dashboard)
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/all`); // Check if this route exists in your backend
    return response.data;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};







const API = axios.create({ baseURL: API_BASE_URL });
export default API;
export const fetchAttendees = () => API.get('/attendees');
export const createAttendee = (attendee) => API.post('/attendees', attendee);
export const deleteAttendee = (id) => API.delete(`/attendees/${id}`);