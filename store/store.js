import { todoReducer } from "./reducers/todo.reducer.js"

const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
  todoModule: todoReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())
window.gStore = store

store.subscribe(() => {
  console.log("Current state is:", store.getState())
})
