const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from "./LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function AppHeader() {
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const todos = useSelector(storeState => storeState.todoModule.todos)

  function onLogout() {
    logout().catch(err => showErrorMsg("Error occurred during logout"))
  }

  function onSetUser(user) {
    setUser(user)
    navigate("/")
  }

  function calculateTodosDonePercentage() {
    const totalTodos = todos.length
    if (totalTodos === 0) return 0

    const totalTodosDone = todos.filter(todo => todo.isDone).length
    const todosDonePercentage = (totalTodosDone / totalTodos) * 100

    if (Number.isInteger(todosDonePercentage)) return todosDonePercentage

    return +todosDonePercentage.toFixed(2)
  }

  const donePercent = calculateTodosDonePercentage()

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Todo App</h1>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )}
        <section className="todos-done-progress-container">
          <div>
            <label htmlFor="done-progress">Todos done:</label>
            <h3>{donePercent}%</h3>
          </div>
          <progress
            value={donePercent}
            max="100"
            id="done-progress"
            name="doneProgress"
          />
        </section>

        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todos</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
