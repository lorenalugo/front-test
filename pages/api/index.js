import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL,
  validateStatus() {
    return true;
  },
});

const API = {
  getPassengers: () => axiosInstance.get('/passengers'),
  getPassengerById: passengerId => axiosInstance.get('/passengers', { params: { passengerId } }),
  createPassenger: ({ names, flightNumber, packages }) => axiosInstance.post('/passengers', {
    names,
    flightNumber,
    packages,
  }),
  updatePackages: passengerId => axiosInstance.put('/passengers', {
    params: { passengerId },
  }),
};

export default API;
