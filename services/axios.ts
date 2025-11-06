// services/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // send cookies / auth credentials
});
console.log(axiosInstance.defaults.baseURL);

export default axiosInstance;
