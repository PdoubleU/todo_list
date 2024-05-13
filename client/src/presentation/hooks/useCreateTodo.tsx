import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoCreate, Todo } from "../../types";
import { httpClient } from "../../infrastructure/http/httpClient";
import { TODO_KEY } from "../../shared/const";

const mutationFn = async (todo: TodoCreate) =>
  await httpClient.post<Todo>("/todo/", todo);

const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const createTodo = useMutation<unknown, Error, TodoCreate>({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TODO_KEY] }),
  });
  return createTodo;
};

export default useCreateTodo;
