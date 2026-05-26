import { useEffect, useRef, useState } from "react";
import type { Todo } from "../models/Todo";
import type { UpdateTodoDate } from "../models/UpdateTodoDate";

type Props = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onUpdateDate: (id: string, data: UpdateTodoDate) => void;
};

export default function TodoTable({
  todos,
  onDelete,
  onComplete,
  onUpdateDate,
}: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [editingDateId, setEditingDateId] = useState<string | null>(null);
  const [tempDate, setTempDate] = useState("");

  const editRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editRef.current &&
        !editRef.current.contains(event.target as Node)
      ) {
        // cancel edit
        setEditingDateId(null);
        setTempDate("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPastDate = (date?: string) => {
    if (!date) return false;

    const d = new Date(date);
    const normalized = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return normalized < today;
  };

  const handleConfirmUpdate = async (id: string) => {
    if (!tempDate) {
      setEditingDateId(null);
      return;
    }

    const ok = window.confirm("Do you want to update due date?");
    if (!ok) {
      setEditingDateId(null);
      setTempDate("");
      return;
    }

    await onUpdateDate(id, { dueDate: tempDate });

    setEditingDateId(null);
    setTempDate("");
  };

  return (
    <div className="space-y-2">
      {todos.map((todo) => {
        const hovered = hoveredId === todo.id;
        const editing = editingDateId === todo.id;

        return (
          <div
            key={todo.id}
            onMouseEnter={() => setHoveredId(todo.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition ${
              todo.isCompleted
                ? "bg-gray-100 text-gray-500 border-gray-200"
                : todo.isOverdue
                ? "bg-red-50 border-red-200"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {/* LEFT */}
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                disabled={todo.isCompleted}
                onChange={() => onComplete(todo.id)}
              />

              <div className="font-medium truncate max-w-[320px]">
                {todo.title}
              </div>
            </div>

            {/* DATE */}
            <div className="flex-1 text-center text-sm text-gray-600">
              {editing ? (
                <div ref={editRef}>
                  <input
                    type="date"
                    value={tempDate}
                    autoFocus
                    onChange={(e) => setTempDate(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (isPastDate(tempDate)) {
                          alert("Due date cannot be in the past");
                          return;
                        }
                        handleConfirmUpdate(todo.id);
                      }
                      if (e.key === "Escape") {
                        setEditingDateId(null);
                        setTempDate("");
                      }
                    }}
                    className="border rounded px-2 py-1"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>{todo.dueDate || "-"}</span>

                  {hovered && !todo.dueDate && (
                    <button
                      onClick={() => {
                        setEditingDateId(todo.id);
                        setTempDate(todo.dueDate || "");
                      }}
                      className="text-blue-500"
                    >
                      ✎
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* DELETE */}
            <div className="w-10 flex justify-end">
              {hovered && (
                <button
                  onClick={() => onDelete(todo.id)}
                  className="text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}