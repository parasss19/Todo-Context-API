import { useEffect, useState } from "react";
import { TodoProvider } from "./context/index";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  // //Creating functionality
  // const addTodo = (todo) => {
  //   //setTodos(todo)    //if we do this then our new value is added in list but all the previous todos will be removed
  //     setTodos((prev) =>{  
  //       return [{id:Date.now(), ...todo} ,...prev]
  //     })
  // }

  // //Here we use loop to find which id todo we have to edit
  // //1 first we have to call setTodos
  // //2 now prev return us all the todos
  // //3 we use map on prev and inside call back we use eachTodo which basically get each single todo
  // //4 if a particular todo id match with the updateTodo id just add the new todo if not just simply add the previously todo as it is
  
  // const updateTodo = (id, todo) => {
  //   setTodos((prev) => {
  //      return prev.map((eachTodo) => {
  //            return eachTodo.id === id ? todo : eachTodo
  //           })
  //   })
  // }

  // //Here we use filter
  // //idea = filter just filter all todos
  // //it put all the todos with id diff then the one we provided in new array
  // //and the todo which match with the id we provided remain in old array (deleted)
  // const deleteTodo = (id) => {
  //   setTodos((prev) => {
  //     return prev.filter((eachTodo) => {
  //          return eachTodo.id !== id
  //       })
  //   })
  // }

  // //Here we just match the id of eachTodo(every single todo) with the
  // //provided and if it matches then we just take all key:value of the matched object(which is a todo)
  // //using spread operator and just changed the check value to true
  // const toggleTodo = (id) => {
  //   setTodos((prev) => {
  //     return prev.map((eachTodo) => {
  //         //  return eachTodo.id === id ? {...eachTodo, check:'true'} : eachTodo
  //          return eachTodo.id === id ? { ...eachTodo, check: !eachTodo.check } : eachTodo
  //         })
  //   })
  // }

  // Above code is for revision

  //Creating functionality
  const addTodo = (todo) => {
    // console.log(todo)    //todo is the complete obejct
    setTodos((prev) =>  [{ ...todo }, ...prev]
  )};
  const updateTodo = (id, todo) => {
    setTodos((prev) => {
      return prev.map((eachTodo) => (eachTodo.id === id ? todo : eachTodo));
    });
  };
  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((eachTodo) => eachTodo.id !== id);
    });
  };
  const toggleTodo = (id) => {
    setTodos((prev) => {
      return prev.map((eachTodo) =>
        eachTodo.id === id ? { ...eachTodo, check: !eachTodo.check } : eachTodo
      );
    });
  };

  //Local storage
  // Load todos from local storage when the component mounts
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));     //we get data in string so we convert them into json

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
     localStorage.setItem("todos", JSON.stringify(todos) );        //to set item we have to provide key and value in form of string
  }, [todos]);


  return (
    <TodoProvider value = {{ todos, addTodo, toggleTodo, updateTodo, deleteTodo }} >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>

          {/*Todo form*/}
          <div className="mb-4">
            <TodoForm />
          </div>

          {/*TodoItem*/}
          <div className="flex flex-wrap gap-y-3">

            {todos.map((todo) => {
              // console.log(todo)  //here todo is the complete object
              return (
                <div key={todo.id} className="w-full">
                  <TodoItem  todo={todo}/>
                </div>
              );
            })}
            
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
