// import React,{ useState} from 'react'
// import { Popover, PopoverContent, PopoverTrigger  } from '@/components/ui/popover';
// import { format } from "date-fns"
// import { Calendar } from '@/components/ui/calendar';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { MdOutlineDateRange } from 'react-icons/md';


// interface Props {
//     selectedDate: Date | null;
//     onDateChange: (date: Date) => void;
//     className?: string;
//     placeholder?: string;
//     calendarStyle?: string;
//     disabledDate?: (date: Date) => boolean;
//     disabled?: boolean;

// }

// function DatePickerInput({selectedDate, onDateChange,className, placeholder = "Select a date",calendarStyle,disabledDate,disabled = false}: Props) {
//     const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//     <Popover
//     open={isOpen}
//     onOpenChange={setIsOpen}
//     >
//     <PopoverTrigger asChild>
//       <Button 
//       data-testid="calenderButton"
//       className={cn("w-full flex justify-between  border rounded text-left text-black p-5 shadow-none ",className,disabled && "opacity-60 bg-gray-50 text-gray-500 cursor-not-allowed")} 
//       onClick={() => setIsOpen(true)}
//       disabled={disabled}  
//       >
//          {selectedDate ? (
//             // format(selectedDate, 'dd-MM-yyyy') 
//             !isNaN(selectedDate.getTime()) ? format(selectedDate, 'dd-MM-yyyy') : placeholder
//           ) : (
//             <span className="text-grey400">{placeholder}</span> 
//           )}
           
//             <MdOutlineDateRange data-testid="MdOutlineDateRange" className="w-5 h-5 ml-2 text-neutral950"/>
      
//       </Button>
//     </PopoverTrigger>
//     <PopoverContent
//      align="start" 
//      className={cn(" bg-white w-auto p-8 md:p-1 ",calendarStyle)}
//      style={{zIndex:1000}}
//     >
//           <Calendar
//           mode="single"
//           selected={selectedDate ?? undefined}
//           onSelect={(date) => {
//             if (date) onDateChange(date); 
//             setIsOpen(false); 
//           }}
//           initialFocus
//           disabled={disabledDate}
          
//         />

//     </PopoverContent>
//     </Popover>
//     </>
//   )
// }

// export default DatePickerInput

import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isValid, subYears, addYears } from "date-fns";
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MdOutlineDateRange } from 'react-icons/md';

interface Props {
    selectedDate: Date | null | undefined;
    onDateChange: (date: Date | undefined) => void;
    className?: string;
    placeholder?: string;
    calendarStyle?: string;
    disabledDate?: (date: Date) => boolean;
    disabled?: boolean;
}

function DatePickerInput({
    selectedDate, 
    onDateChange,
    className, 
    placeholder = "Select a date",
    calendarStyle,
    disabledDate,
    disabled = false,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const safeSelectedDate = selectedDate && isValid(selectedDate) ? selectedDate : undefined;

    const startMonth = subYears(new Date(), 100); 
    const endMonth = addYears(new Date(), 100);   

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                    data-testid="calenderButton"
                    className={cn(
                        "w-full flex justify-between border rounded text-left text-black p-5 shadow-none",
                        className,
                        disabled && "opacity-60 bg-gray-50 text-gray-500 cursor-not-allowed"
                    )} 
                    disabled={disabled}
                >
                    {safeSelectedDate 
                        ? format(safeSelectedDate, 'dd-MM-yyyy') 
                        : <span className="text-grey400">{placeholder}</span>}
                    <MdOutlineDateRange className="w-5 h-5 ml-2 text-neutral950"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                align="start" 
                className={cn("bg-white w-auto p-8 md:p-1", calendarStyle)}
                style={{ zIndex: 1000 }}
            >
                <Calendar
                    mode="single"
                    selected={safeSelectedDate}
                    onSelect={(date) => {
                        onDateChange(date);
                        setIsOpen(false);
                    }}
                    // captionLayout="dropdown"
                    defaultMonth={safeSelectedDate || new Date()}
                    disabled={disabledDate}
                    numberOfMonths={1}
                    startMonth={startMonth}
                    endMonth={endMonth}
                />
            </PopoverContent>
        </Popover>
    );
}

export default DatePickerInput;