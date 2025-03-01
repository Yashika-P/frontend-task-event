import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">Welcome to Event Manager</h1>
      <p className="text-gray-600 mt-2">Find and manage events easily.</p>
      <div className="mt-6">
        <Link to="/events" className="bg-blue-500 text-white px-6 py-2 rounded-lg">Explore Events</Link>
      </div>
    </div>
  );
};

export default Home;
