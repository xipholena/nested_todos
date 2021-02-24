import React, {useState} from 'react'
import './App.css';
//import {Todo} from './components/Todo'

 const init = [
   {id: 1, title: 'work hard', index: 1,},
   {id: 2, title: 'play hard', index: 2},
   {id: 3, title: 'resolve', index: 3,},
   {id: 4, title: 'reject', index: 4,},
 ]

function App() {
  const [todos, setTodos] = useState(init);
  const [todoTitle, setTodoTitle] = useState('');
  console.log(todos);

  const changeHandler = ({target}) => {
    setTodoTitle(target.value)
  }
  
  const addTodoHandler = ({target}) => {
    const newTodo = {
      id: +(new Date()),
      title: target.previousElementSibling.value,
      index: todos.length + 1,
    }
    setTodos(currentState => ([
      ...currentState,
      newTodo,
    ]))
    setTodoTitle('');
  }

  const removeListHandler = ({target}) => {
    const targetTodoId = +target.closest('.todo-list__item').id;
    setTodos(todos.filter(item=> item.id !== targetTodoId));
  }

  const handleSort = () => {
    setTodos(todos.sort((a, b) => a.index - b.index))
  }

  const increaseIndex = ({target}) => {
    const targetTodoId = +target.closest('.todo-list__item').id;
    
    setTodos(() => {
     //todos.find(item=> item.id === targetTodoId).index -= 1
     // todos.find(item=> item.id === targetTodoId-1).index += 1
    });
    console.log('targetTodoId', targetTodoId);
    console.log( '.index', todos.find(item=>item.id === targetTodoId).index);
    console.log(todos);
  }

  const decreaseIndex = ({target}) => {}

  const addSublist = ({target}) => {
    const targetTodoId = +target.closest('.todo-list__item').id;
    console.log(targetTodoId)
    const hauntedTodo = todos.find(item=> item.id === targetTodoId) 
    console.log(hauntedTodo)
    setTodos(() => {
     // 
      
    });
  }

  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li 
            key={todo.id}
            id={todo.id}
            className="todo-list__item"
          >
          <p className="todo-list__todo">{todo.title}</p>
          <button
            onClick={increaseIndex}
          >up</button>
          <button

          >down</button>
          <button 
            type="submit"
            onClick={addSublist}
          >Add Sublist</button>
          <button 
            onClick={removeListHandler}
          >
            Remove
          </button>
          <button>Remove sublist</button>
          </li>
        ))}
        <input
            type="text"
            placeholder="type a todo here..."
            className="todo-list__input"
            value={todoTitle}
            onChange={changeHandler}
          ></input>
          <button 
            type="submit"
            onClick={addTodoHandler}
          >
            Add
          </button>
          
      </ul>
    </div>
  );
}

export default App;
