import React from 'react';

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
  {
    _id: 4,
    name: 'Startup Meetup 2024',
    location: 'San Francisco, USA',
    description: 'Meet with top startup founders and investors.',
    starting_date: '2024-02-01T18:30:00.000Z',
    ending_date: '2024-02-03T18:30:00.000Z',
    category: 'Business',
    tags: ['startup', 'networking'],
    sub_events: {},
  },
  {
    _id: 5,
    name: 'Art Expo 2024',
    location: 'Paris, France',
    description: 'An exhibition featuring modern artists from around the world.',
    starting_date: '2024-03-10T18:30:00.000Z',
    ending_date: '2024-03-15T18:30:00.000Z',
    category: 'Art',
    tags: ['art', 'expo'],
    sub_events: {},
  },
];

const Events_Details = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Events</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {dummyEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>

            <div className="text-gray-600 text-sm mb-2 space-y-1">
              <p>📍 {event.location}</p>
              <p>📅 {new Date(event.starting_date).toDateString()} - {new Date(event.ending_date).toDateString()}</p>
              <p>📁 {event.category}</p>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-gray-700 text-sm mb-4">
              {event.description.length > 80
                ? `${event.description.slice(0, 80)}...`
                : event.description}
            </p>

            {Object.keys(event.sub_events).length > 0 && (
              <div className="bg-gray-100 p-2 rounded text-xs">
                <h3 className="font-semibold mb-2">Sub Events:</h3>
                {Object.values(event.sub_events).map((sub, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="font-medium">{sub.name}</p>
                    <p>🕒 {sub.start_time} - {sub.end_time}</p>
                    <p>🎤 {sub.hostedBy}</p>
                    <p>🎟️ {sub.ticket_type} - ${sub.ticket_price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events_Details;
