import React from "react";
import { useNavigate } from 'react-router-dom';

const topics = [
  { name: 'Events', icon: '📅', link: '/events', bg: '/images/events.jpg' },
  { name: 'Schedule', icon: '🗓️', link: '/schedule', bg: '/images/schedule.jpg' },
  { name: 'Attendees', icon: '👥', link: '/attendees', bg: '/images/attendees.jpg' },
  { name: 'Analytics', icon: '📊', link: '/analytics', bg: '/images/analytics.jpg' },
  { name: 'Buy Tickets', icon: '🎫', link: '/tickets', bg: '/images/tickets.jpg' }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12"
      style={{
        backgroundImage: `url('/images/events background.jpg')`
        }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-50 min-h-screen py-12 flex flex-col items-center">
        
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-white mb-8">
          Event Management
        </h1>

        {/* Cards Section */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <div
              key={topic.name}
              onClick={() => navigate(topic.link)}
              className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${topic.bg})` }}
              ></div>
              <div className="p-4 bg-white text-center">
                <span className="text-4xl">{topic.icon}</span>
                <h3 className="text-xl font-bold mt-2 group-hover:text-blue-500">
                  {topic.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;