import axios from 'axios';

const restAPI = axios.create({
  baseURL: 'http://localhost:3001/api',
});

restAPI.interceptors.request.use((config) => {
  console.log('Request sent!');
  return config;
});

export { restAPI };
