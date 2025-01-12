import { useState, useEffect } from "react";
import Link from "next/link";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // need to specify type of array
  const [newTodo, setNewTodo] = useState("");
  const [toggleComplete, setToggleComplete] = useState(false);

  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTodos(data);
  //       console.log(data);
  //     });
  // }, []);

  const addTodo = () => {
    setTodos((prev) => [
      { id: todos.length + 1, text: newTodo, completed: false },
      ...prev,
    ]);
    setNewTodo("");
  };

  const add = (e: any) => {
    e.preventDefault();
    if (!newTodo) return;
    return addTodo();
  }; // to prevent default submit in form

  const toggleCompleteButton = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="m-auto text-center py-5">
      <h1 className="text-2xl text-bold">My To-Dos</h1>
      <form onSubmit={add} className="flex  m-auto justify-center">
        <input
          type="text"
          value={newTodo}
          className="w-full max-w-2xl m-5 p-1 border border-black-500 rounded-lg"
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new to-do..."
        />
        <button className="m-6 p-2 bg-blue-500 text-white rounded-xl">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-center space-x-60">
            <div className="flex">
              <input
                type="checkbox"
                className="cursor-pointer mr-5"
                checked={todo.completed}
                onChange={() => toggleCompleteButton(todo.id)}
              />
              {todo.text}
            </div>
            <div>
              <span className="ml-5">
                {todo.completed ? "Completed" : "Not Completed"}
              </span>
              <Link href={`/todos/${todo.id}`} className="ml-5 underline">
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
