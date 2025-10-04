import { TodoPreview } from "./TodoPreview.jsx"

const { useState } = React
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  const [confirmingTodoId, setConfirmingTodoId] = useState(null)

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} style={{ backgroundColor: todo.color }}>
          <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
          <section className="todo-actions">
            <button onClick={() => setConfirmingTodoId(todo._id)}>
              Remove
            </button>
            <button>
              <Link to={`/todo/${todo._id}`}>Details</Link>
            </button>
            <button>
              <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
            </button>

            <div
              className={`confirm-remove-container ${
                confirmingTodoId === todo._id ? "show" : ""
              }`}
            >
              <h4>Remove todo?</h4>
              <button onClick={() => setConfirmingTodoId(null)}>No</button>
              <button
                onClick={() => {
                  onRemoveTodo(todo._id)
                  setConfirmingTodoId(null)
                }}
              >
                Yes
              </button>
            </div>
          </section>
        </li>
      ))}
    </ul>
  )
}
