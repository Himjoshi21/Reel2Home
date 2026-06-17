import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json'
  }
});

export default apiClient;
