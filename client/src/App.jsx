import React, { useState } from "react";
import Navigation from "./Side-Bar/Navigation";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Events_Page from "./Pages/Events_Page";
import User_Page from "./Pages/User_Page";
import Organizer_Page from "./Pages/Organizer/Organizer_Page";
import Organizer_New from "./Pages/Organizer/Organizer_New";

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", email: "alice.j@example.com", phone: "456-789-0123" },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-600 text-white shadow-lg flex flex-col">
        <div className="p-6 text-center border-b border-blue-400">
          <h1 className="text-2xl font-bold tracking-wide">EventSphere</h1>
        </div>
        <Navigation />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Routes>
          <Route path="/Dashboard" element={<Dashboard users={users} />} />

            <Route path="/Events_Page" element={<Events_Page />} />
            <Route path="/Organizer_Page" element={<Organizer_Page />} />
            <Route path="/User_Page" element={<User_Page users={users} setUsers={setUsers} />} />
            <Route path="/Organizer_New" element={<Organizer_New />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
