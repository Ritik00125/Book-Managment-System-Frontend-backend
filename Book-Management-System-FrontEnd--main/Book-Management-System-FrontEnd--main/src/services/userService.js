import { apiClient } from "../config/api";

export const getUsers = async () => {
  const response = await apiClient.get("/get-all-user");
  return response.data;
};
