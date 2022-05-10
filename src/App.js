import React, { useEffect, useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);

  // Load data from https://jsonplaceholder.typicode.com/todos?userId=3
  useEffect(()=>{
    setToDos([]);
    const abortController = new AbortController();
    
    async function loadToDos(){
      try{
        const response =await fetch(
        "https://jsonplaceholder.typicode.com/todos?userId=3",
          {signal: abortController.signal}
        );
        const toDoFromAPI = await response.json();
        setToDos(toDoFromAPI);
      }catch(error){
        if (error.name === "AbortError"){
          console.log("Aborted", toDos.id);
        }else{
          throw error
        }
      }
    }  
    loadToDos();
    
    return()=> abortController.abort();
  },[toDos.id]);
  
  return (
    <div className="App">
      <h1>To Do List</h1>
      <ul className="todo-list">
        {toDos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "",
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
