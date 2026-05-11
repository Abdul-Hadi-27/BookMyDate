// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://bookmydate-q93v.onrender.com/", // 🔁 apne backend ka URL daal
  withCredentials: true, // 🔥 cookies ke liye IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
