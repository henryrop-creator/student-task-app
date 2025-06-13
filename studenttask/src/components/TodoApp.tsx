import  { useState } from 'react'
import todosData from '../data/data.json'



type Todo = {
  id: number
  text: string
  completed: boolean
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(todosData)
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTodo = () => {
    const trimmed = newTodo.trim()
    if (!trimmed) return
    const newTask: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false
    }
    setTodos([newTask, ...todos])
    setNewTodo('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const itemsLeft = todos.filter(todo => !todo.completed).length

  return (
    <div className="todo-container">
      <h1 className="title">TODO</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
      </div>

      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            onClick={() => toggleTodo(todo.id)}
          >
            <input type="checkbox" checked={todo.completed} readOnly />
            <span>{todo.text}</span>
          </div>
        ))}
        <div className="todo-footer">
          <span>{itemsLeft} items left</span>
          <div className="filters">
            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
            <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
            <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
          </div>
          <button className="clear" onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  )
}

export default TodoApp
