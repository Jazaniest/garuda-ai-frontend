import axios from 'axios';

const api = axios.create({
  baseURL: 'garuda-ai-backend-production.up.railway.app',
  withCredentials: true,
});

export default api;