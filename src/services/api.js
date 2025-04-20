import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getHouses = async () => {
  try {
    const response = await axios.get(`${API_URL}/houses`);
    return response;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  } 
};