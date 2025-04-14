import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Organizer_Page = () => {
  const [organizers, setOrganizers] = useState([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyOrganizers = Array.from({ length: 20 }, (_, i) => ({
      _id: `org${i + 1}`,
      name: ["Ram", "Rahul", "Anjali", "Sita", "Vikram", "Aisha", "Ravi", "Priya", "Karan", "Neha", "Aarav", "Divya", "Sahil", "Meera", "Nikhil", "Pooja", "Ishaan", "Tina", "Yash", "Simran"][i],
      email: `organizer${i + 1}@example.com`,
      c_code: "+91",
      mobile: `98765432${String(i).padStart(2, "0")}`,
      location: ["Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Patna", "Ludhiana", "Agra", "Nashik"][i],
      role: "Organizer",
      status: i % 2 === 0 ? "active" : "inactive",
      proof: [
        `https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        `https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
      ],
      organizationData: [
        {
          name: `OrgName${i + 1}`,
          code: `ORG00${i + 1}`,
          total_earnings: Math.floor(Math.random() * 100000),
        },
      ],
    }));

    setOrganizers(dummyOrganizers);
    setLoading(false);
  }, []);

  const handleViewClick = (organizer) => {
    setSelectedOrganizer(organizer);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedOrganizer(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="p-10 min-h-screen">
      
      {loading ? (
        <div className="flex justify-center items-center h-screen">

          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (<>
        <h1 className="text-center font-bold text-xl pb-4 text-blue-400">Organizer Data</h1>
        <div className="overflow-x-auto w-full max-w-4xl mx-auto">
          
          
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <tr>
              <th className="p-3 text-left">User id</th>
                <th className="p-3 text-left">User Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone Number</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-center">View</th>
              </tr>
            </thead>
            <tbody>
              {organizers.map((org) => (
                <tr key={org._id} className="hover:bg-gray-100 transition duration-300">
                  <td className="p-3 text-left">{org._id}</td>
                  <td className="p-3 text-left">{org.name}</td>
                  <td className="p-3 text-left">{org.email}</td>
                  <td className="p-3 text-left">{org.c_code} {org.mobile}</td>
                  <td className="p-3 text-left">{org.status}</td>
                  <td className="p-3 text-left">{org.location}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleViewClick(org)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      {isViewModalOpen && selectedOrganizer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-[900px] h-[85vh] flex overflow-hidden">
            <div className="w-1/2 h-full">
              <Slider {...sliderSettings} className="w-full h-full">
                {selectedOrganizer.proof.map((image, index) => (
                  <div key={index} className="w-full h-full">
                    <img
                      src={image}
                      alt={`Proof ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="w-1/2 p-6 flex flex-col justify-between bg-gray-50">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Organizer Details</h2>
                <div className="text-gray-700 space-y-2">
                  <p><strong>Name:</strong> {selectedOrganizer.name}</p>
                  <p><strong>Email:</strong> {selectedOrganizer.email}</p>
                  <p><strong>Phone:</strong> {selectedOrganizer.c_code} {selectedOrganizer.mobile}</p>
                  <p><strong>Role:</strong> {selectedOrganizer.role}</p>
                  <p><strong>Location:</strong> {selectedOrganizer.location}</p>
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <span className={`px-3 py-1 text-white rounded-full ${selectedOrganizer.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                      {selectedOrganizer.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-semibold text-gray-700">Organization Details</h3>
                  {selectedOrganizer.organizationData.map((orgData, idx) => (
                    <div key={idx} className="space-y-1">
                      <p><strong>Name:</strong> {orgData.name}</p>
                      <p><strong>Code:</strong> {orgData.code}</p>
                      <p><strong>Total Earnings:</strong> ₹{orgData.total_earnings}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organizer_Page;
