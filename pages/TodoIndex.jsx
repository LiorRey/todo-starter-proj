import { todoService } from "../services/todo.service.js"
import {
  loadTodos,
  removeTodoOptimistic,
  saveTodo,
} from "../store/actions/todo.actions.js"
import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoIndex() {
  const todos = useSelector(storeState => storeState.todoModule.todos)

  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

  const [filterBy, setFilterBy] = useState(defaultFilter)

  useEffect(() => {
    setSearchParams(filterBy)
    loadTodos(filterBy).catch(() => {
      showErrorMsg("Error occurred while loading todos")
    })
  }, [filterBy])

  function onRemoveTodo(todoId) {
    removeTodoOptimistic(todoId)
      .then(() => showSuccessMsg("Todo removed successfully!"))
      .catch(() => showErrorMsg("Error occurred while removing todo"))
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone }

    saveTodo(todoToSave)
      .then(savedTodo => {
        showSuccessMsg(
          `Todo is ${savedTodo.isDone ? "done!" : "back on your list"}`
        )
      })
      .catch(() => showErrorMsg("Error occurred while toggling todo"))
  }

  if (!todos) return <div>Loading...</div>
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: "60%", margin: "auto" }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  )
}
