import React, { useState } from 'react';

const EventCard = ({ event }) => {
  const [showFull, setShowFull] = useState(false);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div
      onClick={() => setShowFull(!showFull)}
      className="w-72 bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all"
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={event.main_image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-base font-semibold text-gray-800">{event.name}</h2>
          <span className="text-xs text-gray-500">📍 {event.location}</span>
        </div>

        <p className="text-xs text-gray-600 mb-2">
          🗓️ {formatDate(event.starting_date)} - {formatDate(event.ending_date)}
        </p>

        <div className="flex gap-2 flex-wrap mb-2">
          {event.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {!showFull ? (
          <p className="text-sm text-gray-500 italic">Click for more details...</p>
        ) : (
          <div className="mt-2 text-sm text-gray-700 space-y-2">
            <div>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Audience:</strong> {event.audience_type}</p>
            </div>

            {event.sub_events &&
              Object.values(event.sub_events).map((sub, idx) => (
                <div key={idx} className="pt-2 border-t border-gray-200">
                  <p><strong>🎤 {sub.name}</strong></p>
                  <p>{sub.description}</p>
                  <p><strong>Hosted by:</strong> {sub.hostedBy}</p>
                  <p><strong>Time:</strong> {sub.start_time} - {sub.end_time}</p>
                  <p><strong>Ticket:</strong> {sub.ticket_type} — ${sub.ticket_price}</p>
                  {sub.restrictions?.length > 0 && (
                    <div>
                      <strong>Restrictions:</strong>
                      <ul className="list-disc pl-5 text-xs text-gray-500">
                        {sub.restrictions.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
