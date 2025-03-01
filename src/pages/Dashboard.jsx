import AnalyticsDashboard from "../components/AnalyticsDashboard";
import AttendeeList from "../components/AttendeeList";

const Dashboard = () => {
  const attendees = [{ name: "John Doe", email: "john@example.com" }, { name: "Jane Doe", email: "jane@example.com" }];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <AnalyticsDashboard />
        <AttendeeList attendees={attendees} />
      </div>
    </div>
  );
};

export default Dashboard;
