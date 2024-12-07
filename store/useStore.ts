import { format } from "date-fns";
import { create } from "zustand";

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

const useTodoStore = create<TodoStore>((set) => ({
  todos: JSON.parse(localStorage.getItem("todos") || "{}"),

  addTodo: (data, date) =>
    set((state) => {
      const dateKey = format(date, "yyyy-MM-dd");
      const newTodo: Todo = {
        id: Date.now(),
        text: data.text,
        subtext: data.subtext,
        completed: false,
        date: date,
      };
      const updatedTodos = {
        ...state.todos,
        [dateKey]: [...(state.todos[dateKey] || []), newTodo],
      };
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),

  getTodosByDate: (date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    return JSON.parse(localStorage.getItem("todos") || "{}")[dateKey] || [];
  },

  toggleCompletion: (id, date) =>
    set((state) => {
      const dateKey = format(date, "yyyy-MM-dd");
      const updatedTodos = {
        ...state.todos,
        [dateKey]: state.todos[dateKey]?.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),

  editTodo: (id, data, date) =>
    set((state) => {
      const dateKey = format(date, "yyyy-MM-dd");
      const updatedTodos = {
        ...state.todos,
        [dateKey]: state.todos[dateKey]?.map((todo) =>
          todo.id === id ? { ...todo, ...data } : todo
        ),
      };
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),

  deleteTodo: (id, date) =>
    set((state) => {
      const dateKey = format(date, "yyyy-MM-dd");
      const updatedTodos = {
        ...state.todos,
        [dateKey]: state.todos[dateKey]?.filter((todo) => todo.id !== id),
      };
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),

  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  addEditOpen: false,
  setAddEditOpen: (addEditOpen) => set({ addEditOpen }),
  selectedTask: null,
  setSelectedTask: (selectedTask) => set({ selectedTask }),
}));

export default useTodoStore;
