// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth", // 🔁 apne backend ka URL daal
  withCredentials: true, // 🔥 cookies ke liye IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;