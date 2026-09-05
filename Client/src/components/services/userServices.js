import api from "./api";

// Get currently logged-in user
export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
};

// Get user by ID - Admin only
export const getUserById = async (id) => {
  const response = await api.get(`/me/${id}`);
  return response.data;
};

// Get all users - Admin only
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Send newsletter to selected users
export const sendNewsletter = async (data) => {
  const response = await api.post("/users/newsletter", data);;
  return response.data;
};

