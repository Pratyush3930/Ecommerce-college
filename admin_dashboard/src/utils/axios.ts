import axios from "axios";

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:5140", // Replace with your backend URL
  timeout: 10000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// // Add a request interceptor (optional)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add logic before request is sent, e.g., attaching a token
//     const token = localStorage.getItem("token"); // Example: Get token from localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor (optional)
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle errors globally
//     if (error.response && error.response.status === 401) {
//       console.error("Unauthorized! Redirecting to login...");
//       // Add redirect to login logic if needed
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
