import axios from "axios";

const API_URL = "https://backend-task-erlt.onrender.com";


// Fetch all events
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

// Fetch a single event by ID
export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

// Get event details (with analytics, schedule, etc.)
export const getEventDetails = async (id) => {
  const response = await axios.get(`${API_URL}/events/details/${id}`);
  return response.data;
};

// User Authentication
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};


// Create new event
export const createEvent = async (eventData, token) => {
  const response = await axios.post(`${API_URL}/events`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch pending events (for admin approval)
export const getPendingEvents = async () => {
  const response = await axios.get(`${API_URL}/admin/pending-events`);
  return response.data;
};

// Approve an event (Admin)
export const approveEvent = async (eventId) => {
  const response = await axios.put(`${API_URL}/admin/approve-event/${eventId}`);
  return response.data;
};

// Reject an event (Admin)
export const rejectEvent = async (eventId) => {
  const response = await axios.put(`${API_URL}/admin/reject-event/${eventId}`);
  return response.data;
};

// Get user's purchased tickets
export const getUserTickets = async (userId) => {
  const response = await axios.get(`${API_URL}/tickets/user/${userId}`);
  return response.data;
};

// Purchase a ticket
export const purchaseTicket = async (ticketData) => {
  const response = await axios.post(`${API_URL}/tickets/purchase`, ticketData);
  return response.data;
};

// Get event analytics (sales, attendance, revenue)
export const getEventAnalytics = async (eventId) => {
  const response = await axios.get(`${API_URL}/events/analytics/${eventId}`);
  return response.data;
};

// Get event attendees list
export const getAttendees = async (eventId) => {
  const response = await axios.get(`${API_URL}/events/attendees/${eventId}`);
  return response.data;
};
