"use client";

import React from "react";
import TodoItem from "./TodoItem";
import useTodoStore from "@/store/useStore";
import { format, isToday } from "date-fns";

const List: React.FC = () => {
  const { getTodosByDate, selectedDate } = useTodoStore();
  const todos = getTodosByDate(selectedDate);

  return (
    <>
      <div className="self-start flex flex-col gap-4 items-center w-full p-8 sm:p-0">
        <p className="font-bold py-4 text-2xl self-start">
          {isToday(selectedDate)
            ? "Today"
            : format(selectedDate, "dd MMM yyyy")}
        </p>
        <ul className="self-start w-full flex flex-col gap-4">
          {todos.length > 0 ? (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <p className="py-4 font-medium text-gray-500 text-xl">
              Add tasks and they will show up here
            </p>
          )}
        </ul>
      </div>
    </>
  );
};

export default List;
