export const TodoFilterValues = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
  Overdue: "Overdue",
} as const;

export type TodoFilter =
  (typeof TodoFilterValues)[keyof typeof TodoFilterValues];