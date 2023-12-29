import { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
    const [todo, setTodo] = useState([])

    //now the addTodo function is present in App.jsx so we use useTodo(our hook in TodoContext file) to get it here
    const {addTodo} = useTodo()

    const add = (e) => {
       e.preventDefault()
       if(!todo)  return     //if nothing in todo just return 

       addTodo({id:Date.now(), todo:todo, check: false})
       setTodo("")               //after writing todo we want to empty the form field  
    }


    return (
        <form onSubmit={add}  className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}
export default TodoForm;

