import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api';
const AUTH_STORAGE_KEY = 'car-management-auth';

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export function readStoredAuth() {
  return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
}

export function storeAuth(auth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getApiError(error) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.data?.details) {
    return Object.values(error.response.data.details).join('. ');
  }

  if (error?.message === 'Network Error') {
    return 'No se pudo conectar con el backend';
  }

  return 'Ocurrio un error inesperado';
}
