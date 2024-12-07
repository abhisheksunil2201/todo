import { format } from "date-fns";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the shape of a single to-do item
export interface Todo {
  id: number;
  text: string;
  subtext: string;
  date: Date;
  completed: boolean;
}

// Define the state and actions of the store
interface TodoStore {
  todos: Record<string, Todo[]>; // Todos grouped by date
  addTodo: (
    data: {
      text: string;
      subtext: string;
    },
    date: Date
  ) => void;
  getTodosByDate: (date: Date) => Todo[];
  toggleCompletion: (id: number, date: Date) => void;
  editTodo: (
    id: number,
    data: {
      text: string;
      subtext: string;
    },
    date: Date
  ) => void;
  deleteTodo: (id: number, date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addEditOpen: boolean;
  setAddEditOpen: (addEditOpen: boolean) => void;
  selectedTask: Todo | null;
  setSelectedTask: (selectedTask: Todo | null) => void;
}

// Create the Zustand store with persistence
const useTodoStore = create(
  persist<TodoStore>(
    (set, get) => ({
      todos: {},

      addTodo: (data, date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        const newTodo: Todo = {
          id: Date.now(),
          text: data.text,
          subtext: data.subtext,
          completed: false,
          date: date,
        };

        const updatedTodos = {
          ...get().todos,
          [dateKey]: [...(get().todos[dateKey] || []), newTodo],
        };

        set({ todos: updatedTodos });
      },

      getTodosByDate: (date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        return get().todos[dateKey] || [];
      },

      toggleCompletion: (id, date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        const updatedTodos = {
          ...get().todos,
          [dateKey]: get().todos[dateKey]?.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        };

        set({ todos: updatedTodos });
      },

      editTodo: (id, data, date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        const updatedTodos = {
          ...get().todos,
          [dateKey]: get().todos[dateKey]?.map((todo) =>
            todo.id === id ? { ...todo, ...data } : todo
          ),
        };

        set({ todos: updatedTodos });
      },

      deleteTodo: (id, date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        const updatedTodos = {
          ...get().todos,
          [dateKey]: get().todos[dateKey]?.filter((todo) => todo.id !== id),
        };

        set({ todos: updatedTodos });
      },

      selectedDate: new Date(),
      setSelectedDate: (date) => set({ selectedDate: date }),

      addEditOpen: false,
      setAddEditOpen: (addEditOpen) => set({ addEditOpen }),

      selectedTask: null,
      setSelectedTask: (selectedTask) => set({ selectedTask }),
    }),
    {
      name: "todo-store", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
      version: 1, // Version for state migrations
    }
  )
);

export default useTodoStore;
