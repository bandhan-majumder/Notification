import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState("");
  const [added, isAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-todos");
        console.log(response.data);
        setTodos(Array.isArray(response.data.todos) ? response.data.todos : []);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setTodos([]); // Set to an empty array in case of an error
      }
    };
    fetchData();
  }, [added]);

  async function handleAddTodo() {
    console.log("Coming")
    const response = await axios.post('http://localhost:3000/add-todo', { todo: addTodo });
    console.log(response.data);
    isAdded(true);
  }

  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            //@ts-ignore
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : (
        <p>No todos available..</p>
      )}

      <input width={400} height={400} value={addTodo} onChange={(e) => setAddTodo(e.target.value)} />
      <button onClick={() => {
        alert('cmong')
        handleAddTodo();
      }}> Add todo</button>
    </>
  )
}

export default App
