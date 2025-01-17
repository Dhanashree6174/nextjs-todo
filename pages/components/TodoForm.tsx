// import { useState } from "react";
// import {useTodo} from "../contexts/TodoContext"

// const TodoForm = () => {

//     const [todo, setTodo] = useState("");
//     const {addTodo} = useTodo();

//     const add = (e: any) =>{
//         e.preventDefault();

//         if(!todo) return;
//         addTodo({todo, completed:false});
//         setTodo("");
//     }
//   return (
//     <form onSubmit={add} className="flex  m-auto justify-center">
//         <input
//           type="text"
//           value={todo}
//           className="w-full max-w-2xl m-5 p-1 border border-black-500 rounded-lg"
//           onChange={(e) => setTodo(e.target.value)}
//           placeholder="Enter new to-do..."
//         />
//         <button type = "submit" className="m-6 p-2 bg-blue-500 text-white rounded-xl">
//           Add
//         </button>
//       </form>
//   )
// }

// export default TodoForm