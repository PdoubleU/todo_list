import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../infrastructure/http";
import { TODO_KEY } from "../../shared/const";
import { TodoDTO } from "../../types";

const getTodos = async (page: number) =>
  await httpClient.get<TodoDTO>(`/todo/?page=${page}`);

const useGetTodos = (page: number) => {
  const query = useQuery({
    queryKey: [TODO_KEY, page],
    queryFn: () => getTodos(page),
    staleTime: Infinity,
  });

  return query;
};

export default useGetTodos;
