import axios from "axios";

// Mock base URL (you can point to jsonplaceholder for testing)
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" },
});

export default api;
