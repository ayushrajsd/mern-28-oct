import axios from "axios";

const token = localStorage.getItem("token");
// console.log("token in api", token);

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    baseURL: "http://localhost:3000/",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
