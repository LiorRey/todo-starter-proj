import { TodoDoneProgress } from "./TodoDoneProgress.jsx"

export function AppFooter() {
  return (
    <footer className="app-footer full">
      <section className="footer-container">
        <TodoDoneProgress />
      </section>
    </footer>
  )
}
