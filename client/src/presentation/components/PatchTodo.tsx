import { FormEvent, useState } from "react";
import { Todo, TodoPatch } from "../../types.ts";
import useEditTodo from "../hooks/useEditTodo.tsx";
import "../css/PatchTodo.css";

type Props = {
  item: Todo;
  onClose: () => void;
};

const PatchTodo = ({ item, onClose }: Props) => {
  const [formData, setFormData] = useState<TodoPatch>(item);
  const editTodo = useEditTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;
    editTodo(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleInputChange}
              value={formData?.["title"] || ""}
            />
            <input
              type="text"
              name="comment"
              placeholder="Comment"
              onChange={handleInputChange}
              value={formData?.["comment"] || ""}
            />
          </div>
          <div className="input-container">
            <input
              type="date"
              name="dueDate"
              onChange={handleInputChange}
              value={formData?.["dueDate"] || ""}
            />
          </div>
          <button type="submit" className="submit-button">
            Update
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatchTodo;
