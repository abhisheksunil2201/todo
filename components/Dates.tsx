"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, addDays, subDays, isAfter } from "date-fns";
import { Button } from "@/components/ui/button";
import useTodoStore from "@/store/useStore";

const DateSelector: React.FC = () => {
  const today = new Date();

  const { setSelectedDate } = useTodoStore();

  const getDateRange = () => {
    return Array.from({ length: 7 }, (_, i) => addDays(subDays(today, 3), i));
  };

  return (
    <div className="bg-white px-3 sm:px-6 py-8 rounded-3xl w-full overflow-hidden shadow-xl">
      <p className="text-4xl font-bold self-start justify-self-start mb-4">
        onday
      </p>
      <div className="flex items-center w-full">
        <div className="flex gap-1 sm:gap-4 flex-wrap sm:justify-normal justify-around w-full">
          {getDateRange().map((date) => {
            const isDisabled = isAfter(date, today);
            return (
              <Button
                key={date.toString()}
                disabled={isDisabled}
                onClick={() => setSelectedDate(date)}
                className="w-10 h-12 sm:w-12 sm:h-16 flex flex-col items-center bg-white"
                variant="ghost"
              >
                <p className="font-bold text-sm">{format(date, "EEEEE")}</p>
                <p className="font-bold text-2xl">{format(date, "d")}</p>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
