
import React, {useState} from 'react'
import classNames from 'classnames'

export const Todo = ({todos, setTodos, callCommonTodos}) => {
  console.log('start',todos);
  function useForceUpdate(){
    const [value, setValue] = useState(0); 
   // console.log('force update - value', value);
    return () => setValue(value => value + 1); 
  }
  const forceUpdate = useForceUpdate();


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
    /*setTodos(currentState => ([
      ...currentState,
      newTodo,
    ]))*/
    setTodoTitle('');
  }

  const removeTodoHandler = (id, subId) => {
    setTodos(todos=> todos.filter(item=> item.id !== id));
  }

  const handleSort = () => {
    setTodos(todos=> todos.sort((a, b) => a.index - b.index))
    console.log('ola')
  }

  const increaseIndex = (id) => {
    
    const newTodos = [...todos].map((item, i, arr) => {
      if(item.id === id){ 
         item.index-- //!!!!
         if(arr[i-1]) {
          arr[i-1].index++
         }
      }
      return item
    })
    //setTodos(newTodos);
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
    //setTodos(newTodos)
    handleSort();
    forceUpdate();
  }

  const addSublist = (id) => {
    const newTodos = [...todos].map(item=> {
      if(item.id === id) {
        item.sublist = [{sublist: [], sublistId: +(new Date())/2, id: +(new Date())*2, index: 0, /*notStarter: true,*/}, ];
        item.sublistId =  +(new Date());
        item.notStarter = true;
        
       // console.log(item);
       // console.log(todos);
      }
      return item
    })
    //setTodos(newTodos) //означает сделать todo этого вложенного компонента общим для всех=(
      forceUpdate();
  }

  const getAllTodos = () => {
    forceUpdate();
    console.log(todos);
  }
  const handleListRemoving = (id, subId) => {
    console.log(id)
    //console.log(todos);
    getAllTodos()
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
            onClick={()=>removeTodoHandler(todo.id, todo.sublistId)}
          >
            Remove
          </button>
          <button
            onClick={()=>{
              handleListRemoving(todo.id, todo.sublistId);
              callCommonTodos(todo.sublistId);
            }}
          >Remove sublist
          </button>

          {todo.sublist && todo.sublist.length
            ? <div> 
              <Todo 
                todos={todo.sublist}
                setTodos={setTodos}
                callCommonTodos={callCommonTodos}
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

