import { http } from './http';

export async function getCars(params = {}) {
  const { data } = await http.get('/cars', { params: cleanParams(params) });
  return data;
}

export async function getCar(id) {
  const { data } = await http.get(`/cars/${id}`);
  return data;
}

export async function createCar(payload) {
  const { data } = await http.post('/cars', payload);
  return data;
}

export async function updateCar(id, payload) {
  const { data } = await http.put(`/cars/${id}`, payload);
  return data;
}

export async function deleteCar(id) {
  await http.delete(`/cars/${id}`);
}

function cleanParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}
