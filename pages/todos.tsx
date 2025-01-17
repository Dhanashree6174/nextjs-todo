import { useState, useEffect, FormEventHandler } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Link from "next/link";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // need to specify type of array
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTodos(data);
  //       console.log(data);
  //     });
  // }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

    if (todos) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    setTodos((prev) => [
      { id: todos.length + 1, text: newTodo, completed: false },
      ...prev,
    ]);
    setNewTodo("");
  };

  const add: FormEventHandler<HTMLFormElement> = (e) => {
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

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const updateTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );

    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="m-auto text-center py-10">
      <h1 className="text-2xl text-bold pb-5">My To-Dos</h1>
      <form onSubmit={add} className="flex m-auto justify-center">
        <input
          type="text"
          value={newTodo}
          className="w-full max-w-2xl m-5 p-1 border border-black-500 rounded-lg text-black"
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new to-do..."
        />
        <button className="m-6 p-2 bg-blue-500 text-white rounded-xl">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex m-auto my-2 justify-between items-center max-w-xl pb-3"
            style={{ height: "35px" }}
          >
            <div className="flex">
              <input
                type="checkbox"
                className="cursor-pointer mr-5"
                checked={todo.completed}
                onChange={() => toggleCompleteButton(todo.id)}
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  className="border border-gray-400 rounded-lg p-1 text-black"
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span>{todo.text}</span>
              )}
            </div>
            <div className="flex items-center">
              <span className="ml-5">
                {todo.completed ? "Completed" : "Not Completed"}
              </span>
              <Link href={`/todos/${todo.id}`} className="ml-5 mr-2 underline">
                View Details
              </Link>
              <button className="mx-2 mb-1" onClick={() => deleteTodo(todo.id)}>
                <MdDeleteOutline />
              </button>
              <div style={{ width: "50px", textAlign: "center" }}>
                {editingId === todo.id ? (
                  <button
                    className="ml-2 mb-1 text-green-500"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="ml-2 mb-1"
                    onClick={() =>
                      !todo.completed && startEditing(todo.id, todo.text)
                    }
                  >
                    <MdEdit />
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
