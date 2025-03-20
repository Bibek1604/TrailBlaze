const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000, // Increase to 10 seconds
    headers: { 'Content-Type': 'application/json' },
  });

module.exports = axiosInstance;
