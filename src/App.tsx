import React, { Component } from "react";

import Todos from "./components/Todos";
import TodoForm, { FormTodo } from "./components/TodoForm";

import Category from "./models/Category";
import Todo, { Status } from "./models/Todo";
import { id } from "./utils";

import "./App.css";

interface PlainTodo {
  id: number;
  title: string;
  status: Status;
  category?: string;
}

interface State {
  textFilter: string;
  categoryFilter?: string;
  categories: string[];
  todos: PlainTodo[];
}

type AppAction =
  | { type: "setTextFilter"; payload: string }
  | { type: "setCategoryFilter"; payload: string }
  | { type: "clearCategoryFilter" }
  | { type: "addTodo"; payload: PlainTodo }
  | { type: "toggleTodo"; payload: number };

const appReducer = (state: State, action: AppAction) => {
  switch (action.type) {
    case "setTextFilter":
      return {
        ...state,
        textFilter: action.payload
      };
    case "setCategoryFilter":
      return {
        ...state,
        categoryFilter: action.payload
      };
    case "clearCategoryFilter":
      return {
        ...state,
        categoryFilter: undefined
      };
    case "addTodo":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "toggleTodo": {
      const index = state.todos.findIndex(todo => todo.id === action.payload);
      if (index >= 0) {
        let todo = state.todos[index];
        todo = {
          ...todo,
          status: todo.status === "completed" ? "todo" : "completed"
        };
        return {
          ...state,
          todos: [
            ...state.todos.slice(0, index),
            todo,
            ...state.todos.slice(index + 1)
          ]
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

const initialState: State = {
  textFilter: "",
  categories: ["coding", "chores"],
  todos: [
    { id: id(), title: "Learn typescript", status: "todo", category: "coding" },
    {
      id: id(),
      title: "Rewrite the codebase",
      status: "todo",
      category: "coding"
    },
    { id: id(), title: "Feed the cat", status: "todo", category: "chores" }
  ]
};

const AppFC: React.FC = () => {
  const [state, dispatch] = React.useReducer<State, AppAction>(
    appReducer,
    initialState
  );
  const { textFilter, categoryFilter } = state;

  /* selectors */
  const categoryMap = React.useMemo(
    () =>
      state.categories.reduce<{ [x: string]: Category }>(
        (map, c) => ({ ...map, [c]: new Category(c) }),
        {}
      ),
    [state.categories]
  );

  const todos = React.useMemo(
    () =>
      state.todos.map(
        ({ id, title, status, category }) =>
          new Todo(
            id,
            title,
            status,
            category ? categoryMap[category] : undefined
          )
      ),
    [state.todos]
  );

  const categories = [...Object.values<Category>(categoryMap)];
  const selectedCategory = React.useMemo(
    () => categories.find(c => c.name === categoryFilter),
    [categories, categoryFilter]
  );

  /* actions */
  const onTextFilterChange = (e: React.FormEvent<HTMLInputElement>) =>
    dispatch({ type: "setTextFilter", payload: e.currentTarget.value });

  const setCategory = (categoryName: string) =>
    dispatch({
      type: "setCategoryFilter",
      payload: categoryName
    });

  const onCategoryFilterChange = (e: React.FormEvent<HTMLSelectElement>) =>
    setCategory(e.currentTarget.value);

  const onTodoAdd = ({ title, category }: FormTodo) =>
    dispatch({
      type: "addTodo",
      payload: { id: id(), status: "todo", title, category }
    });

  const toggleTodo = (todoId: number) =>
    dispatch({
      type: "toggleTodo",
      payload: todoId
    });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todos</h1>
        <input type="search" onChange={onTextFilterChange} />
        <select onChange={onCategoryFilterChange}>
          <option value="">–</option>
          {categories.map(c => (
            <option
              key={c.name}
              value={c.name}
              selected={selectedCategory && selectedCategory === c}
            >
              {c.name}
            </option>
          ))}
        </select>
        <Todos
          todos={todos}
          textFilter={textFilter}
          categoryFilter={selectedCategory}
          onTodoToggle={toggleTodo}
          onCategoryClick={setCategory}
        />
        <TodoForm onAdd={onTodoAdd} categories={categories} />
        {/* <pre>{JSON.stringify(state, null, "\n")}</pre> */}
      </header>
    </div>
  );
};

export default AppFC;
