// src/api/userAPI.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Change to your backend base URL

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
