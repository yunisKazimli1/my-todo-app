import TodoForm from "../components/TodoForm";
import TodoTable from "../components/TodoTable";
import Pagination from "../components/Pagination";
import { useTodos } from "../hooks/useTodos";

import {
  TodoFilterValues,
  type TodoFilter,
} from "../models/TodoFilter";

import {
  TodoSortingValues,
  type TodoSorting,
} from "../models/TodoSorting";

export default function TodoPage() {
  const {
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
    handleUpdateDate,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-5xl px-6 py-10">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Todo Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your tasks efficiently
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {/* FORM CARD */}
        <div className="bg-white shadow-sm border rounded-xl p-4 mb-4">
          <TodoForm onCreated={loadTodos} />
        </div>

        {/* CONTROLS CARD */}
        <div className="bg-white shadow-sm border rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={filterBy}
            onChange={(e) =>
              setFilterBy(e.target.value as TodoFilter)
            }
          >
            <option value={TodoFilterValues.All}>All</option>
            <option value={TodoFilterValues.Active}>Active</option>
            <option value={TodoFilterValues.Completed}>Completed</option>
            <option value={TodoFilterValues.Overdue}>Overdue</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as TodoSorting)
            }
          >
            <option value={TodoSortingValues.Az}>A-Z</option>
            <option value={TodoSortingValues.Za}>Z-A</option>
            <option value={TodoSortingValues.DueDateEarliestFirst}>
              Due ↑
            </option>
            <option value={TodoSortingValues.DueDateLatestFirst}>
              Due ↓
            </option>
          </select>

          <button
            onClick={loadTodos}
            className="ml-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Refresh
          </button>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white border rounded-xl shadow-sm p-2">
          <TodoTable
            todos={todos}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onUpdateDate={handleUpdateDate}
          />
        </div>

        {/* PAGINATION + PAGE SIZE ROW */}
        <div className="mt-6 flex items-center">
          
          {/* LEFT: PAGE SIZE */}
          <div className="flex items-center gap-3 w-1/3">
            <span className="text-sm text-gray-600">
              Page size
            </span>

            <select
              className="border rounded-lg px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => {
                setPage(1);
                setPageSize(Number(e.target.value));
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* CENTER: PAGINATION */}
          <div className="flex justify-center w-1/3">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>

          {/* RIGHT: EMPTY SPACER (keeps center truly centered) */}
          <div className="w-1/3" />
        </div>

      </div>
    </div>
  );
}