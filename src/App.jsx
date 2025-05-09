import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AttendeeList from './components/AttendeeList';
import EventSchedule from './components/EventSchedule';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TicketPurchase from './components/TicketPurchase';
import CreateEvent from "./pages/CreateEvent";
import MyTickets from "./components/MyTickets";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto mt-4 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/user-dashboard" element={<PrivateRoute element={<UserDashboard />} />} />
            <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
            <Route path="/create-event" element={<PrivateRoute element={<CreateEvent />} />} />
            <Route path="/attendees" element={<AttendeeList />} />
        <Route path="/schedule" element={<EventSchedule />} />
        <Route path="/analytics" element={<PrivateRoute><AnalyticsDashboard /></PrivateRoute>} />
            <Route path="/buy-ticket/:id" element={<TicketPurchase />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
