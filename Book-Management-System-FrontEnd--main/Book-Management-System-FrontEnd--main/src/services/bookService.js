import { apiClient } from "../config/api";

export const getBooks = async (params = {}) => {
  const response = await apiClient.get("/get-book-details", { params });
  return response.data;
};

export const getBookById = async (id) => {
  const response = await apiClient.get(`/get-book-by-id/${id}`);
  return response.data;
};

export const createBook = async (payload) => {
  const response = await apiClient.post("/books", payload);
  return response.data;
};

export const updateBook = async (id, payload) => {
  const response = await apiClient.put(`/update-book-detail/${id}`, payload);
  return response.data;
};

export const deleteBookById = async (id) => {
  const response = await apiClient.delete(`/delete-book/${id}`);
  return response.data;
};

export const issueBook = async (id, payload) => {
  const response = await apiClient.patch(`/books/${id}/issue`, payload);
  return response.data;
};

export const returnBook = async (id) => {
  const response = await apiClient.patch(`/books/${id}/return`);
  return response.data;
};

export const getCirculationOverview = async () => {
  const response = await apiClient.get("/books/circulation/overview");
  return response.data;
};
