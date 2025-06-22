// src/utils/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // or your deployed backend
  withCredentials: true, // ✅ include cookies in all requests
});

export default instance;
