import React,{useState} from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { MdOutlineDateRange } from "react-icons/md";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectTrigger, SelectContent } from "@/components/ui/select";

interface DatePickerProps {
  date?: Date | undefined;
  setDate?: (date: Date | undefined) => void;
  className?: string
  disabledDate?: (date: Date) => boolean ;
  disabled?: boolean;
  placeholderName?: string;
  styleLabel?: string
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate,className,disabledDate,disabled,placeholderName,styleLabel }) => {
   const [isOpen, setIsOpen] = useState(false);
  

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if(setDate){
    setDate(selectedDate);
    setIsOpen(false); 
    }
  };



  return (

    <div id="dateContainer" className={"grid gap-2 w-full"}>
      <Label
        htmlFor="date"
        className={`block text-sm font-medium text-labelBlue ${styleLabel}`}
      >
        Start date
      </Label>
      <Select  open={isOpen}
    onOpenChange={setIsOpen}>
        <SelectTrigger
            disabled={disabled} 
            onClick={() => setIsOpen(true)}
            id="dateButton"
            className={cn(
                "flex justify-between shadow-none text-black500 mt-0 mb-0 p-4 border border-solid border-neutral650 font-normal w-full h-[3.375rem]",
                !date && "text-muted-foreground",className
            )}
        >
          {date ? format(date, "MM/dd/yyyy") : <span className="text-black300">{placeholderName? placeholderName : "Select date"}</span>}
          <MdOutlineDateRange className="text-navbarIconColor h-5 w-5" />
        </SelectTrigger>
        <SelectContent id="dateSelectContent" className="w-auto mr-3 p-0">
          <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={disabledDate ? disabledDate : undefined}
          />
        </SelectContent>
      </Select>
    </div>
  );
};

export default DatePicker;
