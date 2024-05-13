import { Todo } from "../../types";
import { useReducer } from "react";
import PatchTodo from "./PatchTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useEditTodo from "../hooks/useEditTodo";
import "../css/TodoItem.css";

type Props = {
  item: Todo;
};

const TodoItem = ({ item }: Props) => {
  const deleteTodo = useDeleteTodo();
  const editTodo = useEditTodo();
  const [isFormVisible, setIsFormVisible] = useReducer(
    (state) => !state,
    false
  );

  const handleEdit = setIsFormVisible;

  const handleDelete = () => deleteTodo(item.id);

  const handleMarkDone = () =>
    editTodo({
      id: item.id,
      completed: !item.completed,
    });

  return (
    <div className="tile">
      <div className="title">Title: {item.title}</div>
      {item.comment && (
        <div className="description">Details: {item.comment}</div>
      )}
      {item.dueDate && <div className="due-date">Due date: {item.dueDate}</div>}
      <div className="status">
        Status: {item.completed ? "Completed" : "Not completed"}
      </div>
      <div className="actions">
        <button type="button" onClick={handleMarkDone}>
          {item.completed ? "Unmark done" : "Mark done"}
        </button>
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {isFormVisible && <PatchTodo item={item} onClose={setIsFormVisible} />}
    </div>
  );
};

export default TodoItem;
