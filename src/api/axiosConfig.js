import axios from 'axios';

const api = axios.create({
  baseURL: 'https://intelligent-youthfulness-production.up.railway.app',
  withCredentials: true,
});

export default api;
