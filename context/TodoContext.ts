import { createContext } from "react";
import { Todo } from "../types/todo/todo";

export const TodoContext = createContext<{
  todos: Todo[];
  getTodos: () => Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
}>({
  todos: [],

  getTodos: () => [],

  addTodo: () => { },

  deleteTodo: () => { },

  updateTodo: () => { },
});