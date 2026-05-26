import { useState } from "react";
import { addTodo } from "../services/todoServices";
import { getErrorMessage } from "../errors/apiError";

type Props = {
  onCreated: () => Promise<void>;
};

export default function TodoForm({
  onCreated,
}: Props) {
  const [title, setTitle] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      const trimmed = title.trim();

      if (trimmed.length < 10) {
        setError("Title must be at least 10 characters");
        return;
      }

      setLoading(true);
      setError("");

      await addTodo({ title: trimmed });

      setTitle("");

      await onCreated();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);

            if (error) {
              setError("");
            }
          }}
          placeholder="Enter todo title..."
          className="
            flex-1
            rounded-xl
            border border-indigo-200
            bg-indigo-50/40
            px-4 py-3
            text-sm
            text-gray-800
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
          "
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="
            rounded-xl
            bg-gradient-to-r
            from-indigo-500
            to-violet-500
            px-5 py-3
            text-sm font-medium
            text-white
            shadow-md
            transition
            hover:scale-[1.02]
            hover:shadow-lg
            active:scale-[0.98]
            disabled:opacity-50
          "
        >
          {loading ? "Creating..." : "New"}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-500 pl-1">
          {error}
        </div>
      )}
    </div>
  );
}