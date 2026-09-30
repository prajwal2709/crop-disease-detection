import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Predict disease from uploaded image
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Object>} API response with disease information
 */
export const predictDisease = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await api.post('/predict', formData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      throw new Error(
        error.response.data.message || 
        'Unable to analyze the image. Please try again.'
      );
    } else if (error.request) {
      // Request made but no response received
      throw new Error(
        'Cannot connect to the server. Please check your internet connection.'
      );
    } else {
      // Something else happened
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

/**
 * Health check endpoint
 * @returns {Promise<boolean>} Server health status
 */
export const checkServerHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data.status === 'ok';
  } catch (error) {
    return false;
  }
};

export default api;
