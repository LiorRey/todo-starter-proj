const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from "./LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"
import { TodoDoneProgress } from "./TodoDoneProgress.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"

export function AppHeader() {
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const loggedInUser = useSelector(
    storeState => storeState.userModule.loggedInUser
  )

  function onLogout() {
    logout().catch(err => showErrorMsg("Error occurred during logout"))
  }

  function onSetUser(user) {
    setUser(user)
    navigate("/")
  }

  function getDefaultOrUserStyle() {
    const style = {
      color: "",
      backgroundColor: "",
    }

    if (loggedInUser && loggedInUser.prefs) {
      style.color = loggedInUser.prefs.color
      style.backgroundColor = loggedInUser.prefs.bgColor
    }

    return style
  }

  return (
    <header
      className="app-header full main-layout"
      style={getDefaultOrUserStyle()}
    >
      <section className="header-container">
        <h1>React Todo App</h1>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>
              Hello <b>{user.fullname}</b>
            </Link>
            <button onClick={onLogout}>Logout</button>
            <div>
              <label>Your balance is: {user.balance}</label>
            </div>
          </section>
        ) : (
          <section>
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )}

        <TodoDoneProgress />

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
