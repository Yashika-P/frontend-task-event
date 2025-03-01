import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/api";
import EventForm from "../components/EventForm";

const CreateEvent = () => {
  const navigate = useNavigate();

  const handleSubmit = (eventData) => {
    createEvent(eventData).then(() => navigate("/dashboard"));
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Create an Event</h2>
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateEvent;
