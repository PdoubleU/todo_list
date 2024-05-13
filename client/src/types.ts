export type Todo = {
  id: number;
  dueDate: string;
  title: string;
  completed: boolean;
  comment?: string;
};

export type TodoCreate = Omit<Todo, "id">;

export type TodoPatch = Partial<TodoCreate> & Pick<Todo, "id">;

export type TodoDTO = Todo[];
