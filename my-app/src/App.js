import React, {useState} from 'react';

import './App.css';
import {Todo} from './components/Todo'

 const init = [
   {id: 1, title: 'work hard', index: 1,},
   {id: 2, title: 'play hard', index: 2},
   {id: 3, title: 'resolve', index: 3,},
   {id: 4, title: 'reject', index: 4, //sublistId undef ok
   /*sublist: [
     {id: 100, title: 'sublist todo', index: 100, sublistId: 999, 
      sublist: [
        {id: 201, title: 'SUB-SUB!', index: 200, sublistId: 777, }, 
        {id: 301, title: 'SUB-SUB!', index: 200, sublistId: 771, },
        {id: 401, title: 'SUB-SUB!', index: 200, sublistId: 772, },
      ]},
    ]*/},
    
 ]


function App() {
  const [todos, setTodos] = useState(init);
 // console.log(todos);
  return (
    <div className="todo-list">
      <main>
        <Todo
            todos={todos}
            setTodos={setTodos}
          />
      </main>
      
    </div>
  );
}

export default App;
