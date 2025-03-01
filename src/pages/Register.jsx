import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(userData);
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" required />
        <button type="submit" className="w-full bg-green-500 text-white p-2">Register</button>
      </form>
    </div>
  );
};

export default Register;
