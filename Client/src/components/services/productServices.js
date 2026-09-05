import api from "./api";

export const getProducts = () =>
  api.get("/products");

export const getBestSellers = () =>
  api.get("/products/best-sellers");

export const getProductById = (id) =>
  api.get(`/products/${id}`);

export const createProduct = (formData) =>
  api.post("/products", formData);

export const updateProduct = (id, formData) =>
  api.put(`/products/${id}`, formData);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);
