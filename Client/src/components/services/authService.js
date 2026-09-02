import api from "./api.js";

export const login = async (payload) => {
  return api.post("/auth/login", payload);
};

export const registerUser = async (payload) => {
  return api.post("/auth/register", payload);
};

export const adminLogin = async (payload) => {
  return api.post("/admin/login", payload);
};