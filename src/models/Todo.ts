export interface Todo {
  id: string;
  title: string;
  dueDate?: string;
  isCompleted: boolean;
  isOverdue: boolean;
}