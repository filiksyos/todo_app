import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type TodoType = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
};

export type TodoStore = {
  todos: TodoType[];
  status: string;
  addTodo: (title: string, description?: string, dueDate?: string) => void;
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setStatus: (status: string) => void;
  editTodo: (id: string, updatedTodo: TodoType) => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      status: "all",
      addTodo: (title, description = "", dueDate = "") =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: uuidv4(),
              title,
              description,
              dueDate,
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      completeTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      setStatus: (status) => set({ status }),
      editTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...updatedTodo } : todo
          ),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);
