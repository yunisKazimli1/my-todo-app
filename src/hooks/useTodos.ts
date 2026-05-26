import { useEffect, useState } from "react";
import type { Todo } from "../models/Todo";

import type { UpdateTodoDate } from "../models/UpdateTodoDate";

import {
  getTodos,
  deleteTodo,
  completeTodo,
  updateTodoDate,
} from "../services/todoServices";

import {
  TodoFilterValues,
  type TodoFilter,
} from "../models/TodoFilter";

import {
  TodoSortingValues,
  type TodoSorting,
} from "../models/TodoSorting";

import { getErrorMessage } from "../errors/apiError";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [filterBy, setFilterBy] = useState<TodoFilter>(
    TodoFilterValues.All
  );

  const [sortBy, setSortBy] = useState<TodoSorting>(
    TodoSortingValues.Az
  );

  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / pageSize)
  );

  const loadTodos = async () => {
    try {
      setError(null);

      const response = await getTodos({
        page,
        pageSize,
        filterBy,
        sortBy,
      });

      setTodos(response.items);
      setTotalCount(response.totalCount);

      const maxPage = Math.max(
        1,
        Math.ceil(response.totalCount / pageSize)
      );

      if (page > maxPage) {
        setPage(maxPage);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  useEffect(() => {
    loadTodos();
  }, [page, pageSize, filterBy, sortBy]);

  const handleDelete = async (id: string) => {
    try {
      const ok = window.confirm("Are you sure?");
      if (!ok) return;

      await deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await completeTodo(id);
      await loadTodos();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleUpdateDate = async (id: string, data: UpdateTodoDate) => {
    try {
        await updateTodoDate(id, data);
        await loadTodos();
    } catch (err: any) {
        setError(err.message);
    }
    };

  return {
    todos,
    error,

    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,

    filterBy,
    setFilterBy,
    sortBy,
    setSortBy,

    loadTodos,
    handleDelete,
    handleComplete,
    handleUpdateDate
  };
}