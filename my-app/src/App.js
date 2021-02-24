import React, {useState} from 'react';

import './App.css';
import {Todo} from './components/Todo'

 const init = [
   {id: 1, title: 'work hard', index: 1,},
   {id: 2, title: 'play hard', index: 2},
   {id: 3, title: 'resolve', index: 3,},
   {id: 4, title: 'reject', index: 4, 
   sublist: [
     {id: 100, title: 'sublist todo', index: 100, 
      sublist: [
        {id: 200, title: 'sublist todo', index: 200}
      ]},
    ]},
 ]


function App() {
  const [todos, setTodos] = useState(init);
  const [todoTitle, setTodoTitle] = useState('');

  const changeHandler = ({target}) => {
    setTodoTitle(target.value)
  }
  
  const addTodoHandler = () => {
    const newTodo = {
      id: +(new Date()),
      title: todoTitle, 
      index: todos.length + 1,
    }
    setTodos(currentState => ([
      ...currentState,
      newTodo,
    ]))
    setTodoTitle('');
  }

  const removeListHandler = (id) => {
    setTodos(todos.filter(item=> item.id !== id));
  }

  const handleSort = () => {
    setTodos(todos=> todos.sort((a, b) => a.index - b.index))
  }

  const increaseIndex = (id) => {
    
    const newTodos = [...todos].map((item, i, arr) => {
      if(item.id === id){
         item.index--
         if(arr[i-1]) {
          arr[i-1].index++
         }
      }
      return item
    })
    setTodos(newTodos);
    handleSort();
  }

  const decreaseIndex = (id) => {
    const newTodos = [...todos].map((item, i, arr) => {
      if(item.id === id){
         item.index++
         if(arr[i+1]) {
          arr[i+1].index--
         }
      }
      return item
    })
    setTodos(newTodos)
    handleSort();
  }

  const addSublist = (id) => {
    let targetTodo = todos.find(item=> item.id === id) 
    
    targetTodo = {
      ...targetTodo,
      sublist: {},
    }
    console.log(targetTodo);

    let newTodos = [...todos].map(item=> {
      if(item.id === id) {
        item.sublist = []
      }
      return item;
    })
    setTodos(newTodos)
  }

  return (
    <div className="todo-list">
      <main>
         <Todo
            todosProps={todos}
           // todo={todo}
            //i={i}
            increaseIndex={increaseIndex}
            decreaseIndex={decreaseIndex}
            addSublist={addSublist}
            removeListHandler={removeListHandler}
            todoTitle={todoTitle}
            changeHandler={changeHandler}
            addTodoHandler={addTodoHandler}
          />
      </main>
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
    </div>
  );
}

export default App;
