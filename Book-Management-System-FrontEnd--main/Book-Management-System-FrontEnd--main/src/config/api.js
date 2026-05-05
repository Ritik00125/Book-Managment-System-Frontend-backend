import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:4000" : "");

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL must be set for production builds.");
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { API_BASE_URL };
