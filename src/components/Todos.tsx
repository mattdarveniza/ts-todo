import React from "react";
import Todo from "../models/Todo";
import Category from "../models/Category";

interface Props {
  textFilter?: string;
  todos: Todo[];
}

const filterTodos = (todos: Todo[], filter?: string) =>
  todos.filter(
    todo => !filter || todo.title.toLowerCase().includes(filter.toLowerCase())
  );

const Todos: React.FC<Props> = ({ textFilter, todos }) => {
  const filteredTodos = React.useMemo(() => filterTodos(todos, textFilter), [
    todos,
    textFilter
  ]);

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li>
          {todo.title} {todo.category && `#${todo.category.name}`}
        </li>
      ))}
    </ul>
  );
};

export default Todos;
