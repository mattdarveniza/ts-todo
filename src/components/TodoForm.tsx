import React from "react";

import Category from "../models/Category";

export interface FormTodo {
  title: string;
  category?: string;
}

interface Props {
  onAdd: ({ title, category }: FormTodo) => void;
  categories: Category[];
}

const TodoForm: React.FC<Props> = ({ onAdd, categories }) => {
  const [text, setText] = React.useState("");
  const [category, setCategory] = React.useState("");

  const onTextChange = (e: React.FormEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);

  const onCategoryChange = (e: React.FormEvent<HTMLSelectElement>) =>
    setCategory(e.currentTarget.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ title: text, category: category });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" onChange={onTextChange} />
      <select onChange={onCategoryChange}>
        <option value="">–</option>
        {categories.map(c => (
          <option>{c.name}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;
