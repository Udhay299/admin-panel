import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy Event Data
const dummyEvents = [
  {
    _id: 3,
    name: 'Tech Conference 2024',
    location: 'New York, USA',
    description: 'A conference for tech enthusiasts and professionals to explore the latest trends in technology.',
    starting_date: '2023-12-31T18:30:00.000Z',
    ending_date: '2024-01-14T18:30:00.000Z',
    category: 'Technology',
    tags: ['tech', 'conference'],
    sub_events: {
      0: {
        name: 'Keynote Speech',
        description: 'Opening keynote speech by a renowned tech visionary.',
        start_time: '09:00:00',
        end_time: '10:00:00',
        starting_date: '2024-01-09T18:30:00.000Z',
        hostedBy: 'John Doe',
        ticket_type: 'VIP',
        ticket_price: 50,
        restrictions: ['No photography', 'VIP only'],
      },
    },
  },
 
];

// EventCard Component
const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-72 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer p-4"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{event.name}</h3>
      <p className="text-xs text-gray-600 mb-1">📍 {event.location}</p>
      <p className="text-xs text-gray-600 mb-1">
        📅 {new Date(event.starting_date).toDateString()} - {new Date(event.ending_date).toDateString()}
      </p>
      <p className="text-xs text-gray-600 mb-2">📁 Category: {event.category}</p>
      <div className="flex gap-2 flex-wrap">
        {event.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Events_Page Component
const Events_Page = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setEvents(dummyEvents);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Upcoming Events</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Events_Page;
