import { getWindowPages } from "../utils/pagination";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  const pages = getWindowPages(page, totalPages);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-100"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`
            px-3 py-1 rounded-lg border
            transition
            ${
              p === page
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }
          `}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        className="px-3 py-1 rounded-lg border bg-white hover:bg-gray-100"
      >
        ›
      </button>
    </div>
  );
}