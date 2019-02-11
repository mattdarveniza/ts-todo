import Category from "./Category";

type Status = "todo" | "completed";

class Todo {
  public id: number;
  public status: Status;

  constructor(public title: string, public category?: Category) {
    this.id = Math.floor(Math.random() * 1000000);
    this.status = "todo";
  }
}

export default Todo;
