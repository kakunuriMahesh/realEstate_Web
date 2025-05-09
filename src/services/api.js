import axios from "axios";

const API_URL = "https://realtor-backend-2f8y.onrender.com";

export const getHouses = async () => {
  try {
    const response = await axios.get(`${API_URL}/houses`);
    console.log(response.data, "response.data houses");
    return response;
  } catch (error) {
    console.error("Error fetching houses:", error);
    throw error;
  }
};

export const getHouseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/houses/${id}`);
    console.log(response.data, "response.data house by id");
    return response;
  } catch (error) {
    console.error(`Error fetching house ${id}:`, error);
    throw error;
  }
};

export const searchHouses = async (filters) => {
  try {
    const response = await axios.post(`${API_URL}/houses/search`, filters, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data, "response.data search houses");
    return response;
  } catch (error) {
    console.error("Error searching houses:", error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await axios.post(`${API_URL}/services`, serviceData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data, "response.data create service");
    return response;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

// REVIEW
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/reviews`, reviewData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data, "response.data create review");
    return response;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const getReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/reviews`, {
      headers: { "Content-Type": "application/json" },
    });
    return response
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

// CONTACT
export const createContact = async (contactData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, contactData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data, "response.data create contact");
    return response;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

// TODO: updating subscriptions api

export const subscribe = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/subscribe`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data, "response.data subscribe");
    return response;
  } catch (error) {
    console.error("Error subscribing:", error);
    throw error;
  }
};

export const unsubscribe = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/unsubscribe`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data, "response.data unsubscribe");
    return response;
  } catch (error) {
    console.error("Error unsubscribing:", error);
    throw error;
  }
};

// FIXME: testmonials, newsLetters, Stats 

// TODO: testmonials:
export const getTestimonials = async () => {
  try {
    const response = await axios.get(`${API_URL}/testimonials`, {
      headers: { "Content-Type": "application/json" },
    });
    return response
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const getStats = async () => {
  const response = await axios.get(`${API_URL}/stats`);
  return response.data;
};


// TODO: updating services api

// import axios from 'axios';

// const API_URL = 'https://realtor-backend-2f8y.onrender.com';

// export const getHouses = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/houses`);
//     console.log(response.data, 'response.data houses');
//     return response;
//   } catch (error) {
//     console.error('Error fetching houses:', error);
//     throw error;
//   }
// };

// export const getHouseById = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/houses/${id}`);
//     console.log(response.data, 'response.data house by id');
//     return response;
//   } catch (error) {
//     console.error(`Error fetching house ${id}:`, error);
//     throw error;
//   }
// };

// export const searchHouses = async (filters) => {
//   try {
//     const response = await axios.post(`${API_URL}/houses/search`, filters, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     console.log(response.data, 'response.data search houses');
//     return response;
//   } catch (error) {
//     console.error('Error searching houses:', error);
//     throw error;
//   }
// };
