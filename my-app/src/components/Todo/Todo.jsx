import React, {useState} from 'react'
import classNames from 'classnames'
export const Todo = ({todosProps, increaseIndex,
  decreaseIndex, addSublist, removeListHandler}) => {

  const [todos, setTodos] = useState(todosProps);
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
  console.log(todos);
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
            onClick={()=>removeListHandler(todo.id)}
          >
            Remove
          </button>
          <button>Remove sublist</button>
          
          {todo.sublist /*&& todo.sublist.length */
            ? <div><main><article>
              <Todo 
                todo={todo.sublist}
               // i={i}
                increaseIndex={increaseIndex}
                decreaseIndex={decreaseIndex}
                addSublist={addSublist}
                removeListHandler={removeListHandler}
            /> 
            </article>
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
            : null
          }
          </article>
        ))}
    </>
  )
}
