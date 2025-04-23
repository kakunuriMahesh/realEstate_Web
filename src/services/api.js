import axios from 'axios';

const API_URL = 'https://realtor-backend-2f8y.onrender.com';

export const getHouses = async () => {
  try {
    const response = await axios.get(`${API_URL}/houses`);
    console.log(response.data, 'response.data houses');
    return response;
  } catch (error) {
    console.error('Error fetching houses:', error);
    throw error;
  }
};

export const getHouseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/houses/${id}`);
    console.log(response.data, 'response.data house by id');
    return response;
  } catch (error) {
    console.error(`Error fetching house ${id}:`, error);
    throw error;
  }
};


// import axios from "axios";

// // const API_URL = import.meta.env.VITE_API_URL;

// export const getHouses = async () => {
//   try {
//     // const response = await axios.get(`${API_URL}/houses`);
//     const response = await axios.get(`https://realtor-backend-2f8y.onrender.com/houses`);
//     console.log(response.data, "response.data houses");
//     return response;
//   } catch (error) {
//     console.error("Error fetching houses:", error);
//     throw error;
//   } 
// };