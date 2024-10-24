export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  note?: string;
};

export type User = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiError = {
  message: string;
  statusCode: number;
  errors?: unknown;
  stack?: string;
};

export type EditTodo = Partial<Pick<Todo, "completed" | "title" | "note">> & {
  _id: string;
};
export type AddTodo = Pick<Todo, "title" | "completed" | "note">;

export type ApiSucc<T> = {
  result: T;
};

export type ApiState = "idle" | "pending" | "success" | "error";
