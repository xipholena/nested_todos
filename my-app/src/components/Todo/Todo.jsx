
import React, {useState} from 'react'
import classNames from 'classnames'

export const Todo = ({todos, setTodos}) => {
  console.log(todos);
  function useForceUpdate(){
    const [value, setValue] = useState(0); 
    return () => setValue(value => value + 1); 
  }
  const forceUpdate = useForceUpdate();

  const [localTodos, setLocalTodos] = useState(todos);

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
    todos.push(newTodo);
    setTodoTitle('');
  }

  const removeListHandler = (id, subId) => {
    setLocalTodos(localTodos=> localTodos.filter(item=> item.id !== id));
  }

  const handleSort = () => {
    setTodos(todos=> todos.sort((a, b) => a.index - b.index))
    console.log('ola')
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
    handleSort();
    forceUpdate();
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
    handleSort();
    forceUpdate();
  }

  const addSublist = (id) => {
   
    const newTodos = [...todos].map(item=> {
      if(item.id === id) {
        item.sublist = [{sublist: [], sublistId: +(new Date()), id: +(new Date())*2, index: 0}];
        item.sublistId =  +(new Date());
        
      }
      return item
    })
    
      forceUpdate();
  }

  return (
    <>
    {todos?.map((todo, i) => (
          <article 
            key={todo.id}
            className="todo-list__item"
          >
          <p className="todo-list__todo">{todo.title}</p>
          <button
            className={classNames('todo-list__button-up', {'todo-list__button-up--hidden': i === 0})}
            onClick={() => increaseIndex(todo.id)}
          > up </button>
          <button
            onClick={() => decreaseIndex(todo.id)}
            className={classNames('todo-list__button-down', {'todo-list__button-down--hidden': i === todos.length - 1})}
          > down </button>
          <button 
            type="submit"
            onClick={()=>{addSublist(todo.id)}}
            
          > Add Sublist </button>
          <button 
            onClick={()=>removeListHandler(todo.id, todo.sublistId)}
          >
            Remove
          </button>
          <button>Remove sublist</button>

          {todo.sublist && todo.sublist.length
            ? <div> 
              <Todo 
                todos={todo.sublist}
                setTodos={setTodos}
            /> 
            </div>
            : null
          }

          </article>
         
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
    </>
  )
}

