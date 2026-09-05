import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);
    console.log("REQUEST:", config.method, config.url);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("AUTH HEADER:", config.headers.Authorization);
    } else {
      console.log("NO TOKEN FOUND");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;