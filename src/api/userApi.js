import api from './axiosConfig';

export const registerUser = async (name, email, password) => {
  return api.post('/auth/register', { name, email, password });
};

export const loginUser = async (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const logoutUser = async () => {
  return api.post('/auth/logout');
};

export const refreshToken = async () => {
  return api.post('/auth/refresh');
};