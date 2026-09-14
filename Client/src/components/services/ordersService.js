// orders.js
import api from "./api";

export const getMyOrders = () => api.get("/orders/my-orders");
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`);
export const placeOrder = (payload) => api.post("/orders", payload);
export const getAllOrdersAdmin = async () => { const response = await api.get("/orders"); return response.data; };
export const updateOrderStatus = (orderId, payload) =>
  api.put(`/orders/${orderId}/status`, payload);