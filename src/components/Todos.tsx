import React from "react";
import Todo from "../models/Todo";
import Category from "../models/Category";

interface Props {
  textFilter?: string;
  categoryFilter?: Category;
  todos: Todo[];
  onTodoToggle: (id: number) => void;
  onCategoryClick: (category: string) => void;
}

const filterTodos = (
  todos: Todo[],
  textFilter?: string,
  categoryFilter?: Category
) =>
  todos.filter(
    todo =>
      (!textFilter ||
        todo.title.toLowerCase().includes(textFilter.toLowerCase())) &&
      (!categoryFilter || todo.category === categoryFilter)
  );

const Todos: React.FC<Props> = ({
  textFilter,
  categoryFilter,
  todos,
  onTodoToggle,
  onCategoryClick
}) => {
  const filteredTodos = React.useMemo(
    () => filterTodos(todos, textFilter, categoryFilter),
    [todos, textFilter, categoryFilter]
  );

  return (
    <ul>
      {filteredTodos.map(todo => {
        const styles: React.CSSProperties = {};
        if (todo.completed) {
          styles.textDecoration = "line-through";
        }

        return (
          <li key={todo.id} style={styles}>
            {todo.title}{" "}
            {todo.category && (
              <a
                href="#"
                onClick={() =>
                  todo.category && onCategoryClick(todo.category.name)
                }
              >
                #{todo.category.name}
              </a>
            )}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onTodoToggle(todo.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
