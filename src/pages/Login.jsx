import { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const userData = { email, password };
    const response = await loginUser(userData);

    // ✅ Use response directly if response is already the data object
    if (response?.user) {
      login(response.user);
      alert("✅ Login successful!");
      navigate("/events");
    } else {
      console.error("Unexpected login response:", response);
      alert("❌ Invalid login response.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("❌ Invalid credentials.");
  }
};


  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/login.bg.jpg')` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="mb-3 p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-3 p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          New user?{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;