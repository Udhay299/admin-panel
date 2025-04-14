// src/api/organizerAPI.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual backend base URL

export const fetchOrganizers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/organizers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizers:", error);
    throw error;
  }
};
