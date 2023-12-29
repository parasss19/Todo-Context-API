import { useContext, createContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "todo title",
      check: false,
    },
  ],

  //methods for functionality for our todo (we write functionality in other files)
  addTodo: (todo) => {},                //to add todo in list
  updateTodo : (id, todo) => {},        //to edit our todo
  toggleTodo : (id) => {},              //to check/uncheck
  deleteTodo : (id) => {}               // to delete
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
