import axios from 'axios';
import { AuthResponse } from '../models/responses/authResponse';
import { io } from 'socket.io-client';

export const API_URL = 'http://localhost:8000/api/';
export const SOCKET_API_URL = 'http://localhost:3001/';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});


$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await $api.post<AuthResponse>(`${API_URL}auth/access-token`, { refreshToken });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    } catch (e) {
      console.log('not auth');
    }
  }
  throw error;
});

export const $socket = io(SOCKET_API_URL, {
  withCredentials: true,
  extraHeaders: {
    authorization: `${localStorage.getItem('accessToken')}`,
  },
});

export default $api;