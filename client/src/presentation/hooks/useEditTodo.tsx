import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoPatch } from "../../types";
import { httpClient } from "../../infrastructure/http/httpClient";
import { TODO_KEY } from "../../shared/const";

const mutationFn = async ({ id, ...updatedItem }: TodoPatch) =>
  await httpClient.patch<any>(`/todo/${id}`, updatedItem);

const useEditTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: editTodo } = useMutation<unknown, Error, TodoPatch>({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [TODO_KEY] }),
  });

  return editTodo;
};

export default useEditTodo;
