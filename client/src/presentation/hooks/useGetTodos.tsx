import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../infrastructure/http";
import { TODO_KEY } from "../../shared/const";
import { TodoDTO } from "../../types";

const getTodos = async (page: number, sortByDueDate?: boolean) =>
  await httpClient.get<TodoDTO>(
    `/todo/?page=${page}${sortByDueDate ? "&sortByDueDate=true" : ""}`
  );

const useGetTodos = (page: number, sortByDueDate?: boolean) => {
  const query = useQuery({
    queryKey: [TODO_KEY, page, sortByDueDate],
    queryFn: () => getTodos(page, sortByDueDate),
    staleTime: Infinity,
  });

  return query;
};

export default useGetTodos;
