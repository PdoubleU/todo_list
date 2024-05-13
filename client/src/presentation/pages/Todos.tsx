import { useState } from "react";
import TodoItem from "../components/TodoItem";
import useGetTodos from "../hooks/useGetTodos";
import "../css/Todos.css";

const Todos = () => {
  const [page, setPage] = useState(0);
  const query = useGetTodos(page);

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
      <button className="button" onClick={handlePrev}>
        Prev
      </button>
      <button className="button" onClick={handleNext}>
        Next
      </button>
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
