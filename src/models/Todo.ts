import Category from "./Category";

export type Status = "todo" | "completed";

class Todo {
  constructor(
    public id: number,
    public title: string,
    public status: Status,
    public category?: Category
  ) {}

  get completed() {
    return this.status === "completed";
  }
}

export default Todo;
