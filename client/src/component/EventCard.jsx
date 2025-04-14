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
      className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all"
      onClick={() => setShowFull(!showFull)}
    >
      <img
        src={event.main_image}
        alt={event.name}
        className="rounded-xl w-full h-64 object-cover mb-6 border border-white/20"
      />

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-white">{event.name}</h2>
        <span className="text-xs text-blue-300">📍 {event.location}</span>
      </div>

      <div className="text-sm text-slate-300 mb-3">
        🗓️ {formatDate(event.starting_date)} - {formatDate(event.ending_date)}
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {event.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-800/40 text-sm text-white px-3 py-1 rounded-full border border-blue-500/30"
          >
            #{tag}
          </span>
        ))}
      </div>

      {!showFull ? (
        <p className="text-sm text-gray-300 italic">Click to view full event details...</p>
      ) : (
        <div className="mt-4 text-gray-200 space-y-4 transition-all duration-500">
          <div className="border-t border-white/20 pt-3">
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Category:</strong> {event.category}
            </p>
            <p>
              <strong>Audience:</strong> {event.audience_type}
            </p>
          </div>

          {event.sub_events &&
            Object.values(event.sub_events).map((sub, idx) => (
              <div key={idx} className="border-t border-white/20 pt-4">
                <h4 className="text-lg font-semibold text-blue-300">
                  🎤 Sub Event: {sub.name}
                </h4>
                <p className="text-gray-300">{sub.description}</p>
                <p>
                  <strong>Hosted by:</strong> {sub.hostedBy}
                </p>
                <p>
                  <strong>Time:</strong> {sub.start_time} - {sub.end_time}
                </p>
                <p>
                  <strong>Ticket:</strong> {sub.ticket_type} — ${sub.ticket_price}
                </p>
                <div>
                  <strong>Restrictions:</strong>
                  <ul className="list-disc pl-5 text-sm mt-1 text-gray-400">
                    {sub.restrictions.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;
