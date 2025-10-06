const { useSelector } = ReactRedux

export function TodoDoneProgress() {
  const todos = useSelector(storeState => storeState.todoModule.todos)

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
    <section className="todos-done-progress">
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
  )
}
