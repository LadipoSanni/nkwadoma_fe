"use client";

import { useDayPicker } from 'react-day-picker';
import { useState } from 'react';

export function CustomCaption() {
  const { displayMonths, goToMonth } = useDayPicker() as unknown as {
    displayMonths: Date[];
    goToMonth: (date: Date) => void;
  };

  const month = displayMonths[0];
  const [showMonthGrid, setShowMonthGrid] = useState(false);
  const [showYearGrid, setShowYearGrid] = useState(false);

  const currentYear = month.getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 50 }, (_, i) => currentYear - 25 + i);

  const handleMonthSelect = (index: number) => {
    const newMonth = new Date(month);
    newMonth.setMonth(index);
    goToMonth(newMonth);
    setShowMonthGrid(false);
  };

  const handleYearSelect = (year: number) => {
    const newMonth = new Date(month);
    newMonth.setFullYear(year);
    goToMonth(newMonth);
    setShowYearGrid(false);
  };

  return (
    <div className="flex justify-between items-center gap-2 px-2 relative z-[1]">
      <button
        onClick={() => {
          setShowMonthGrid(!showMonthGrid);
          setShowYearGrid(false);
        }}
        className="text-sm font-medium border px-3 py-1 rounded"
      >
        {months[month.getMonth()]}
      </button>

      <button
        onClick={() => {
          setShowYearGrid(!showYearGrid);
          setShowMonthGrid(false);
        }}
        className="text-sm font-medium border px-3 py-1 rounded"
      >
        {currentYear}
      </button>

      {showMonthGrid && (
        <div className="absolute top-full left-0 right-0 mt-2 z-10 grid grid-cols-3 gap-2 p-3 bg-white shadow-lg border rounded-lg w-[280px]">
          {months.map((monthName, i) => (
            <button
              key={monthName}
              onClick={() => handleMonthSelect(i)}
              className="px-2 py-1 rounded-md hover:bg-gray-100 text-sm text-center"
            >
              {monthName}
            </button>
          ))}
        </div>
      )}

      {showYearGrid && (
        <div className="absolute top-full left-0 right-0 mt-2 z-10 grid grid-cols-4 gap-2 p-3 bg-white shadow-lg border rounded-lg w-[280px] max-h-60 overflow-y-auto">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className="px-2 py-1 rounded-md hover:bg-gray-100 text-sm text-center"
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
