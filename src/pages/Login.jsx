import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulating API call - Replace this with actual API request
      const userData = { email }; 
      const token = "demo-token"; // Replace with actual token from API response

      login(userData, token); // Store user data in context
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* Demo Credentials */}
        <p className="mt-4 text-center text-gray-600">
          <strong>Demo Credentials:</strong> <br />
          Email: <strong>demo@user.com</strong> <br />
          Password: <strong>password123</strong>
        </p>

        {/* Register Link */}
        <p className="mt-4 text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
