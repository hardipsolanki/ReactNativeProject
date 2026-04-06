import { useEffect, useMemo, useState } from "react";
import { UserContext } from "./UserContext";
import { TodoContext } from "./TodoContext";
import { Todo } from "../types/todo/todo";
import { getTodos as fetchTodos } from "../utils/todo";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 👤 USER STATE
  const [user, setUser] = useState<{
    id: string;
    fullName: string;
    email: string;
  } | null>(null);

  // TODOS STATE (FIXED → ARRAY)
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const initialTodos = await fetchTodos();
      setTodos(initialTodos);
    };

    loadTodos();
  }, []);

  //  USER CONTEXT
  const userValue = useMemo(() => ({ user, setUser }), [user]);

  const getTodos = () => todos;

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
    );
  };

  const todoValue = useMemo(
    () => ({
      todos,
      getTodos,
      addTodo,
      deleteTodo,
      updateTodo,
    }),
    [todos],
  );

  return (
    <UserContext.Provider value={userValue}>
      <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>
    </UserContext.Provider>
  );
};

export default AppProvider;
