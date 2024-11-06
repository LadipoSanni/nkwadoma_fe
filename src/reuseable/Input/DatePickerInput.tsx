import React,{ useState} from 'react'
import { Popover, PopoverContent, PopoverTrigger  } from '@/components/ui/popover';
import { format } from "date-fns"
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MdOutlineDateRange } from 'react-icons/md';


interface Props {
    selectedDate: Date | null;
    onDateChange: (date: Date) => void;
    className?: string;
    placeholder?: string;
    calendarStyle?: string;
    disabledDate?: (date: Date) => boolean;

}

function DatePickerInput({selectedDate, onDateChange,className, placeholder = "Select a date",calendarStyle,disabledDate}: Props) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <Popover
    open={isOpen}
    onOpenChange={setIsOpen}
    >
    <PopoverTrigger asChild>
      <Button 
      data-testid="calenderButton"
      className={cn("w-full flex justify-between  border rounded text-left text-black p-5 shadow-none ",className)} 
      onClick={() => setIsOpen(true)}
      >
         {selectedDate ? (
            format(selectedDate, 'dd-MM-yyyy') 
          ) : (
            <span className="text-grey400">{placeholder}</span> 
          )}
           
            <MdOutlineDateRange data-testid="MdOutlineDateRange" className="w-5 h-5 ml-2 text-neutral950"/>
      
      </Button>
    </PopoverTrigger>
    <PopoverContent
     align="start" 
     className={cn(" bg-white w-auto p-8 md:p-1 ",calendarStyle)}
     style={{zIndex:1000}}
    >
          <Calendar
          mode="single"
          selected={selectedDate ?? undefined}
          onSelect={(date) => {
            if (date) onDateChange(date); 
            setIsOpen(false); 
          }}
          initialFocus
          disabled={disabledDate}
          
        />

    </PopoverContent>
    </Popover>
    </>
  )
}

export default DatePickerInput