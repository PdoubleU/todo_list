import { FormEvent, useState } from "react";
import { TodoCreate } from "../../types.ts";
import useCreateTodo from "../hooks/useCreateTodo.tsx";
import "../css/CreateTodo.css";

const defaultTodo: TodoCreate = {
  title: "",
  completed: false,
  comment: "",
  dueDate: "",
};

const CreateTodo = () => {
  const [formData, setFormData] = useState<TodoCreate>(defaultTodo);
  const createTodo = useCreateTodo();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo.mutate(formData);
    setFormData(defaultTodo);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleInputChange}
          value={formData["title"]}
          required
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="comment"
          placeholder="Comment"
          onChange={handleInputChange}
          value={formData["comment"]}
        />
      </div>
      <div className="input-container">
        <input
          type="date"
          name="dueDate"
          onChange={handleInputChange}
          value={formData["dueDate"]}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Add New Todo
      </button>
    </form>
  );
};

export default CreateTodo;
