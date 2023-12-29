import { useState } from "react";
import { useTodo } from "../context";

function TodoItem({ todo }) {
  // console.log(todo)         //it is the each todo object(having id,check,todomsg) we have in the todo app
  
  const { toggleTodo, updateTodo, deleteTodo } = useTodo();    //using all these function which is defined in app.jsx

  const [isTodoEditable, setIsTodoEditable] = useState(false); //this state is used to edit the todo
  const [todoMsg, setTodoMsg] = useState(todo.todo);           //this state is used to get the todo msg

  const toggle = () => {
    toggleTodo(todo.id);
  };

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });         //our updateTodo method is defined in app.jsx and it req id and todo params
    setIsTodoEditable(false);                                //as it is updated (now its not editable)
  };

  //deleteTodo directly called in the the button

  return (
    <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.check ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}  >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.check}
        onChange={toggle}
      />

      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg 
        ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} 
        ${todo.check ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}              //when our todo is no longer editable set it to read only again
      />

      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (isTodoEditable) {
            editTodo();
          } 
          else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.check}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

    {/* Delete Todo Button */}
      <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
       onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
