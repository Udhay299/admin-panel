import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ setIsLoggedIn }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/login', {
        email,
        password,
      });

      console.log('✅ Login Response:', response.data);

      // ✅ Extract token from response
      const token = response.data.token;
      if (token) {
        // ✅ Store token in localStorage
        localStorage.setItem('authToken', token);
        console.log('🔐 Token saved to localStorage:', token);
      } else {
        console.warn('⚠️ No token received in login response.');
      }

      setResponseMessage(`Success: ${response.data.message || 'Logged in successfully'}`);
      setIsLoggedIn(true);  // Show admin dashboard
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      console.error('❌ Login Error:', message);
      setResponseMessage(`Error: ${message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {responseMessage && (
          <div className="mt-4 text-center text-sm text-gray-700">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
