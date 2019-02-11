import React, { Component } from "react";

import Todos from "./components/Todos";

import Category from "./models/Category";
import Todo from "./models/Todo";

import "./App.css";

interface State {
  textFilter: string;
  categoryFilter?: Category;
  categories: Category[];
  todos: Todo[];
}

type AppAction =
  | { type: "setText"; payload: string }
  | { type: "setCategory"; payload: Category };

const appReducer = (state: State, action: AppAction) => {
  switch (action.type) {
    case "setText":
      return {
        ...state,
        textFilter: action.payload
      };
    default:
      return state;
  }
};

const cat1 = new Category("coding");
const cat2 = new Category("chores");

const initialState: State = {
  textFilter: "",
  categories: [cat1, cat2],
  todos: [
    new Todo("Learn typescript", cat1),
    new Todo("Rewrite the codebase", cat1),
    new Todo("Feed the cat", cat2)
  ]
};

const AppFC: React.FC = () => {
  const [state, dispatch] = React.useReducer<State, AppAction>(
    appReducer,
    initialState
  );
  const { todos, categories, textFilter, categoryFilter } = state;

  const onTextFilterChange = (e: React.FormEvent<HTMLInputElement>) =>
    dispatch({ type: "setText", payload: e.currentTarget.value });

  const onCategoryFilterChange = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todos</h1>
        <input type="search" onChange={onTextFilterChange} />
        <select onChange={onCategoryFilterChange}>
          {categories.map(c => (
            <option value={c.name}>{c.name.toUpperCase()}</option>
          ))}
        </select>
        <Todos todos={todos} textFilter={textFilter} />
        {/* <pre>{JSON.stringify(state, null, "\n")}</pre> */}
      </header>
    </div>
  );
};

export default AppFC;
