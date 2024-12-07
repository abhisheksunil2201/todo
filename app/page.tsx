"use client";

import DateSelector from "@/components/Dates";
import List from "@/components/List";
import AddTodo from "@/components/AddTodo";
import useTodoStore from "@/store/useStore";
import { useEffect } from "react";

export default function Home() {
  const { setSelectedDate } = useTodoStore();

  useEffect(() => {
    setSelectedDate(new Date());
  }, [setSelectedDate]);

  return (
    <div className="bg-gray-100 grid grid-rows-[20px_1fr_20px] text-black items-center justify-items-center min-h-screen sm:p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center h-full lg:w-4/12">
        <DateSelector />
        <List />
        <AddTodo />
      </main>
    </div>
  );
}
