import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../infrastructure/http/httpClient";
import { TODO_KEY } from "../../shared/const";

const mutationFn = async (id: number) =>
  await httpClient.delete<any>(`/todo/${id}`);

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo } = useMutation<unknown, Error, number>({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TODO_KEY] }),
  });
  return deleteTodo;
};

export default useDeleteTodo;
