import api from "./api.js";

export const loginUser = async (payload) => {
  return api.post("/auth/login", payload);
};

export const registerUser = async (payload) => {
  return api.post("/auth/register", payload);
};