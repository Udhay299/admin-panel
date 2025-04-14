import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
      },
    },
  },
];

const Events_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = dummyEvents.find((e) => e._id.toString() === id);

  if (!event) return <p className="text-center text-xl mt-10">Event not found</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="text-gray-600 mb-2">📍 {event.location}</p>
      <p className="text-gray-600 mb-2">📅 {new Date(event.starting_date).toDateString()} - {new Date(event.ending_date).toDateString()}</p>
      <p className="text-gray-600 mb-4">📁 Category: {event.category}</p>

      <div className="mb-4">
        {event.tags.map((tag, idx) => (
          <span key={idx} className="inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-lg font-medium mb-2">Description:</p>
      <p className="mb-6">{event.description}</p>

      <h2 className="text-2xl font-bold mb-4">Sub Events:</h2>
      {Object.values(event.sub_events).map((sub, idx) => (
        <div key={idx} className="border rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold">{sub.name}</h3>
          <p className="text-gray-600">🕒 {sub.start_time} - {sub.end_time}</p>
          <p className="text-gray-600">🎤 Hosted by: {sub.hostedBy}</p>
          <p className="text-gray-600">🎟️ {sub.ticket_type} - ${sub.ticket_price}</p>
          <p className="mt-2">{sub.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Events_Details;
