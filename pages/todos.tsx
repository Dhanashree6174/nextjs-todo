import { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // need to specify type of array
  const [newTodo, setNewTodo] = useState("");

  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTodos(data);
  //       console.log(data);
  //     });
  // }, []);

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: todos.length + 1, text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  return (
    <div>
      <h1>My To-Dos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <span className="ml-5">
              {todo.completed ? "Completed" : "Not Completed"}{" "}
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new to-do..."
      />
      <button onClick={addTodo}>Add To-Do</button>
    </div>
  );
};

export default Todos;
