export const TodoSortingValues = {
  Az: "Az",
  Za: "Za",
  DueDateEarliestFirst: "DueDateEarliestFirst",
  DueDateLatestFirst: "DueDateLatestFirst",
} as const;

export type TodoSorting =
  (typeof TodoSortingValues)[keyof typeof TodoSortingValues];