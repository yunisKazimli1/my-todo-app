import axios from "axios";
import type { Todo } from "../models/Todo";
import type { NewTodo } from "../models/NewTodo";
import type { PagedResult } from "../models/PagedResult";
import type { UpdateTodoDate } from "../models/UpdateTodoDate";

const api = axios.create({
  baseURL: "https://localhost:7176/api",
});

// centralized error handler
const handleApiError = (error: any): never => {
  const apiError = {
    message: !error?.response
      ? "Backend is not reachable"
      : error.response?.data?.message || "Unexpected server error",
    status: error?.response?.status ?? 0,
  };

  throw apiError;
};

// -------------------- GET TODOS --------------------
export const getTodos = async (
  query: any
): Promise<PagedResult<Todo>> => {
  try {
    const res = await api.get("/todo", { params: query });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// -------------------- GET BY ID --------------------
export const getTodoById = async (id: string): Promise<Todo> => {
  try {
    const res = await api.get(`/todo/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// -------------------- ADD --------------------
export const addTodo = async (newTodo: NewTodo): Promise<Todo> => {
  try {
    const res = await api.post("/todo", newTodo);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// -------------------- DELETE --------------------
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await api.delete(`/todo/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

// -------------------- COMPLETE --------------------
export const completeTodo = async (id: string): Promise<void> => {
  try {
    await api.patch(`/todo/${id}/complete`);
  } catch (error) {
    handleApiError(error);
  }
};

// -------------------- UPDATE TODO DATE --------------------
export const updateTodoDate = async (id: string, updateData: UpdateTodoDate): Promise<void> => {
  try {
    await api.patch(`/todo/${id}/updateDate`, updateData);
  } catch (error) {
    handleApiError(error);
  }
};