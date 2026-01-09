import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/budget",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getOverview = () => api.get("/overview");

export const addCategory = (name) =>
  api.post("/categories", { name });

export const addItem = (categoryId, title) =>
  api.post("/items", { categoryId, title });

export const updateItem = (itemId, payload) =>
  api.patch(`/items/${itemId}`, payload);
