import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchEventsApi = () => API.get("/events");
export const createEventApi = (data) => API.post("/events", data);
export const deleteEventApi = (id) => API.delete(`/events/${id}`);
