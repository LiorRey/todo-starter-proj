import { Chart } from "../cmps/Chart.jsx"
import { todoService } from "../services/todo.service.js"
import { loadTodos } from "../store/actions/todo.actions.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { useSelector } = ReactRedux

export function Dashboard() {
  const todosLength = useSelector(
    storeState => storeState.todoModule.todos.length
  )
  const [importanceStats, setImportanceStats] = useState([])

  useEffect(() => {
    loadTodos().catch(() => {
      showErrorMsg("Error occurred while loading todos")
    })

    todoService.getImportanceStats().then(setImportanceStats)
  }, [])

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <h2>Statistics for {todosLength} Todos</h2>
      <hr />
      <h4>By Importance</h4>
      <Chart data={importanceStats} />
    </section>
  )
}
