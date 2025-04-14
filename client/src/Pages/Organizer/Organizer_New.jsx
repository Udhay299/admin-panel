import React, { useState, useEffect } from "react";

const Organizer_New = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    registration_start: "",
    registration_end: "",
    longitude: "",
    latitude: "",
    category: "",
    tags: [],
    audience_type: "",
    currency: "",
    is_main: 1,
    starting_date: "",
    ending_date: "",
  });

  const [subEvent, setSubEvent] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    starting_date: "",
    hostedBy: "",
    host_email: "",
    host_mobile: "",
    c_code: "",
    ticket_quantity: "",
    ticket_type: "",
    ticket_price: "",
    restrictions: [],
  });

  const [subEvents, setSubEvents] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubChange = (e) => {
    const { name, value } = e.target;
    setSubEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleRestrictionsChange = (e) => {
    setSubEvent((prev) => ({
      ...prev,
      restrictions: e.target.value.split(",").map((item) => item.trim()),
    }));
  };

  const handleAddSubEvent = () => {
    setSubEvents((prev) => [...prev, subEvent]);
    setSubEvent({
      name: "",
      description: "",
      start_time: "",
      end_time: "",
      starting_date: "",
      hostedBy: "",
      host_email: "",
      host_mobile: "",
      c_code: "",
      ticket_quantity: "",
      ticket_type: "",
      ticket_price: "",
      restrictions: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { ...formData, sub_events: subEvents };
    console.log("Submitted Data:", eventData);
    // Send to backend
  };

  const inputClass =
    "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto space-y-10 bg-white shadow-md rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Create New Event
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.keys(formData).map((key) =>
              key === "tags" ? (
                <div key={key}>
                  <label className="block text-gray-700 font-medium mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    name="tags"
                    type="text"
                    value={formData.tags.join(", ")}
                    onChange={handleTagsChange}
                    className={inputClass}
                  />
                </div>
              ) : (
                <div key={key}>
                  <label className="block text-gray-700 font-medium mb-1 capitalize">
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    name={key}
                    type={key.includes("date") ? "date" : "text"}
                    value={formData[key]}
                    onChange={handleMainChange}
                    className={inputClass}
                  />
                </div>
              )
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Sub Event Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.keys(subEvent).map((key) =>
                key === "restrictions" ? (
                  <div key={key}>
                    <label className="block text-gray-700 font-medium mb-1">
                      Restrictions (comma separated)
                    </label>
                    <input
                      name="restrictions"
                      type="text"
                      value={subEvent.restrictions.join(", ")}
                      onChange={handleRestrictionsChange}
                      className={inputClass}
                    />
                  </div>
                ) : (
                  <div key={key}>
                    <label className="block text-gray-700 font-medium mb-1 capitalize">
                      {key.replace(/_/g, " ")}
                    </label>
                    <input
                      name={key}
                      type={
                        key.includes("time")
                          ? "time"
                          : key.includes("date")
                          ? "date"
                          : "text"
                      }
                      value={subEvent[key]}
                      onChange={handleSubChange}
                      className={inputClass}
                    />
                  </div>
                )
              )}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleAddSubEvent}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Add Sub Event
              </button>
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Submit Event
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Organizer_New;
