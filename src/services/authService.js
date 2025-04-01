import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error en la autenticación:', error);
    throw error;
  }
};
