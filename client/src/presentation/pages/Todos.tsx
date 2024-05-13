import { useReducer, useState } from "react";
import TodoItem from "../components/TodoItem";
import useGetTodos from "../hooks/useGetTodos";
import "../css/Todos.css";

const Todos = () => {
  const [page, setPage] = useState(0);
  const [sortByDueDate, setSortByDueDate] = useReducer((prev) => !prev, false);
  const query = useGetTodos(page, sortByDueDate);

  const handleNext = () => {
    if (query?.data && query.data.data.length < 10) return;
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };

  return (
    <div className="App">
      <div className="buttons-wrapper">
        <button className="button" onClick={handlePrev}>
          Prev
        </button>
        <button className="button" onClick={setSortByDueDate}>
          {sortByDueDate ? "Let's use default sort" : "Let's sort by due date"}
        </button>
        <button className="button" onClick={handleNext}>
          Next
        </button>
      </div>
      {query.isLoading ? (
        <div>Loading...</div>
      ) : query.isError ? (
        <div>Error: {query.error.message}</div>
      ) : (
        <div>
          {query.data?.data.map((item) => (
            <TodoItem item={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Todos;
