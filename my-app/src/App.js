import React, {useState} from 'react';

import './App.css';
import {Todo} from './components/Todo'

 const init = [
   {id: 1, title: 'Task 1', index: 1,},
   {id: 2, title: 'Task 2', index: 2,},
   {id: 3, title: 'Task 3', index: 3,},
   {id: 4, title: 'Task 4', index: 4, //sublistId undef ok
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
 const callCommonTodos = (sublistId) => {
   console.log('Common todos:', todos);
   console.log('SublistId:', sublistId);
   function handleRecursion(arrayToIterate) {
      let temporary;
      arrayToIterate.forEach((element, i) => {
        if(element.sublist?.length !==0 && element.sublistId === sublistId ) {
          console.log('got', element.sublistId);
          console.log('iteration', i);
        }
        if(element.sublist) {
          temporary = handleRecursion(element.sublist);
          console.log('sublistId', element.sublistId)
        }
      })
      return temporary;
   }
   handleRecursion(todos);
   
 }
  return (
    <div className="todo-list">
      <ul>
        <Todo
            todos={todos}
            setTodos={setTodos}
            callCommonTodos={callCommonTodos}
          />
      </ul>
      
    </div>
  );
}

export default App;
