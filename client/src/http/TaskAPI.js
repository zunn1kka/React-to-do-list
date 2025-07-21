import { $authHost } from "./Index";

export const fetchTask = async () => {
  const { data } = await $authHost.get("/api/tasks");
  return data;
};

export const createTask = async (taskData) => {
  const { data } = await $authHost.post("/api/tasks", taskData);
  return data;
};

export const updateTask = async (id, taskData) => {
  const { data } = await $authHost.put(`/api/tasks/${id}`, taskData);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await $authHost.delete(`/api/tasks/${id}`);
  return data;
};

export const toggleTaskComplete = async (id) => {
  const { data } = await $authHost.patch(`/api/tasks/${id}/toggle`);
  return data;
};
