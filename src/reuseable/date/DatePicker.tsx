import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { MdOutlineDateRange } from "react-icons/md";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectTrigger, SelectContent } from "@/components/ui/select";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };



  return (

    <div id="dateContainer" className={"grid gap-2 w-full"}>
      <Label
        htmlFor="date"
        className="block text-sm font-medium text-labelBlue"
      >
        Start date
      </Label>
      <Select>
        <SelectTrigger
            id="dateButton"
            className={cn(
                "flex justify-between text-black500 p-4 border border-solid border-neutral650 font-normal w-full h-[3.375rem]",
                !date && "text-muted-foreground"
            )}
        >
          {date ? format(date, "MM/dd/yyyy") : <span className="text-black300">Select date</span>}
          <MdOutlineDateRange className="text-navbarIconColor h-5 w-5" />
        </SelectTrigger>
        <SelectContent id="dateSelectContent" className="w-auto mr-3 p-0">
          <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
          />
        </SelectContent>
      </Select>
    </div>
  );
};

export default DatePicker;
