import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const User_Page = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const users = [
    {
      _id: 40,
      name: "Suriya Sivakumar",
      email: "suriyas@gmail.com",
      c_code: "+91",
      mobile: "1234267897",
      role: "User",
      location: "Chennai",
      status: "inactive",
      proof: [
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      bookingData: [
        {
          _id: 1741933177787,
          event_id: 3,
          payment_method: "GPay",
          amount: 50,
          status: "Confirmed",
        },
      ],
    },
  ];

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleActivateUser = () => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, status: "active" });
    }
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
      ) : (
        <div className="overflow-x-auto w-full max-w-4xl mx-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <tr>
                <th className="p-3 text-left">User Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone Number</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-center">View</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <td className="p-3 text-left">{user.name}</td>
                  <td className="p-3 text-left">{user.email}</td>
                  <td className="p-3 text-left">
                    {user.c_code} {user.mobile}
                  </td>
                  <td className="p-3 text-left">{user.location}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleViewClick(user)}
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
      )}

      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-[900px] h-[85vh] flex overflow-hidden">
            <div className="w-1/2 h-full relative">
              <Slider {...sliderSettings} className="w-full h-full">
                {selectedUser.proof.map((image, index) => (
                  <div key={index} className="w-full h-full">
                    <img src={image} alt={`Proof ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="w-1/2 p-6 flex flex-col justify-between bg-gray-50">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                <div className="text-gray-700 space-y-2">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Phone:</strong> {selectedUser.c_code} {selectedUser.mobile}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p><strong>Location:</strong> {selectedUser.location}</p>
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <span className={`px-3 py-1 text-white rounded-full ${selectedUser.status === "active" ? "bg-green-500" : "bg-red-500"}`}>{selectedUser.status}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-semibold text-gray-700">Booking Details</h3>
                  <table className="w-full border border-gray-300 text-sm mt-2">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr>
                        <th className="p-2 border">Event ID</th>
                        <th className="p-2 border">Payment</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedUser.bookingData.map((booking) => (
                        <tr key={booking._id} className="text-center border">
                          <td className="p-2 border">{booking.event_id}</td>
                          <td className="p-2 border">{booking.payment_method}</td>
                          <td className="p-2 border">₹{booking.amount}</td>
                          <td className="p-2 border">{booking.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                {selectedUser.status !== "active" && (
                  <button onClick={handleActivateUser} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Activate User</button>
                )}
                <button onClick={handleCloseModal} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User_Page;