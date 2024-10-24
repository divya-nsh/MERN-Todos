import { Todo, User } from "@/types";
import { apiRq } from "@/utils/apiRq";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useUserQ() {
  return useQuery<User, AxiosError>({
    queryKey: ["user"],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async () => {
      const res = await apiRq.get("/user");
      return res.data.result as User;
    },
  });
}

export const todoQOptions = queryOptions<Todo[], AxiosError>({
  queryKey: ["todos"],
  staleTime: Infinity,
  gcTime: Infinity,
  queryFn: async () => {
    const res = await apiRq.get("/todos");
    return res.data.result as Todo[];
  },
});
export function useTodosQ() {
  return useQuery(todoQOptions);
}
