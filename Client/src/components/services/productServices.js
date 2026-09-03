// productServices.js
import api from "./api";

export const getProducts = () => api.get("/products");
export const getBestSellers = () => api.get("/products/best-sellers");
export const getProductById = (id) => api.get(`/products/${id}`);

// For creating product with images (FormData)
export const createProduct = (formData) =>
  api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (id, payload) =>
  api.put(`/products/${id}`, payload);

export const deleteProduct = (id) => api.delete(`/products/${id}`);