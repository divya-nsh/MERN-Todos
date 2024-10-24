import { EditTodo, Todo } from "../types";
import { apiRq } from "@/utils/apiRq";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation<Todo, AxiosError, string>({
    async mutationFn(title: string) {
      const res = await apiRq.post("/todos", {
        title,
      });
      return res.data.result as Todo;
    },
    onSuccess(newTodo) {
      queryClient.setQueryData(["todos"], (prev: Todo[] = []) => [
        ...prev,
        newTodo,
      ]);
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation<Todo, AxiosError, EditTodo>({
    async mutationFn(body) {
      const res = await apiRq.put(`/todos/${body._id}`, body);
      return res.data.result;
    },
    onSuccess(updatedTodo) {
      queryClient.setQueryData(["todos"], (prev: Todo[] = []) =>
        prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)),
      );
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    async mutationFn(todoId: string) {
      await apiRq.delete(`/todos/${todoId}`);
    },
    onSuccess(_, todoId) {
      queryClient.setQueryData(["todos"], (prev: Todo[] = []) =>
        prev.filter((todo) => todo._id !== todoId),
      );
    },
  });
}
