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
    disabled?: boolean;

}

function DatePickerInput({selectedDate, onDateChange,className, placeholder = "Select a date",calendarStyle,disabledDate,disabled = false}: Props) {
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
      className={cn("w-full flex justify-between  border rounded text-left text-black p-5 shadow-none ",className,disabled && "opacity-60 bg-gray-50 text-gray-500 cursor-not-allowed")} 
      onClick={() => setIsOpen(true)}
      disabled={disabled}  
      >
         {selectedDate ? (
            // format(selectedDate, 'dd-MM-yyyy') 
            !isNaN(selectedDate.getTime()) ? format(selectedDate, 'dd-MM-yyyy') : placeholder
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


// import React,{ useState} from 'react'
// import { Popover, PopoverContent, PopoverTrigger  } from '@/components/ui/popover';
// import { format, getMonth, getYear, setMonth, setYear } from "date-fns"
// import { Calendar } from '@/components/ui/calendar';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { MdOutlineDateRange } from 'react-icons/md';
// import { Select,SelectTrigger,SelectValue,SelectItem,SelectContent } from '@/components/ui/select';

// interface Props {
//     selectedDate: Date ;
//     onDateChange: (date: Date) => void;
//     className?: string;
//     placeholder?: string;
//     calendarStyle?: string;
//     disabledDate?: (date: Date) => boolean;
//     disabled?: boolean;
//     startYear?: number;
//     endYear?: number;

// }

// function DatePickerInput({selectedDate, 
//   onDateChange,className, 
//   placeholder = "Select a date",
//   calendarStyle,
//   disabledDate,
//   disabled = false,
//   startYear = getYear(new Date()) - 100,
//   endYear  = getYear(new Date()) + 100,
// }: Props) {
//     const [isOpen, setIsOpen] = useState(false);
//     // const [date,setDate] = useState<Date>(new Date());

//     const months = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);


//   function handleMonthChange(month: string): void {
//     const newDate = setMonth(selectedDate,months.indexOf(month))
//     onDateChange(newDate)
//   }

//   function handleYearChange(year: string): void {
//       const newDate = setYear(selectedDate,parseInt(year))
//       onDateChange(newDate)
//   }

//   const validDate = selectedDate instanceof Date && !isNaN(selectedDate.getTime()) ? selectedDate : undefined;
  
//   const selectedYear = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
//   ? getYear(selectedDate).toString()
//   : undefined;

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
//      className={cn(" bg-white w-auto p-1 ",calendarStyle)}
//       style={{zIndex:1000}}
//     >
//       <div className='flex items-center w-full relative left-5 gap-3'>
//         <Select 
//         onValueChange={handleMonthChange}
//         value={months[getMonth(selectedDate)]}
//         >
//        <SelectTrigger className='w-[50px] min-w-[6rem] mt-0 mb-0 h-10 shadow-none'>
//         <SelectValue placeholder='Month'/>
//        </SelectTrigger>
//        <SelectContent className='z-50 w-[280px] h-44 '  style={{zIndex:1500}}>
//         <div className='grid grid-cols-3 gap-2 p-1 px-2'>
//         {
//           months.map(month => (
//             <SelectItem 
//             value={month} key={month}
//              className='text-center py-1 px-2 rounded-full text-[14px] w-fit h-fit  text-[#6A6B6A] bg-[#F6F6F6]'
//             >
//               {month}
//             </SelectItem>
//           ))
//         }
//         </div>
//        </SelectContent>
//         </Select >
//         <Select 
//         onValueChange={handleYearChange}
//         value={selectedYear}
//         >
//        <SelectTrigger className='w-[50px] min-w-[6rem] mt-0 mb-0 h-10 shadow-none'>
//         <SelectValue placeholder='Year'/>
//        </SelectTrigger>
//        <SelectContent className='z-50 w-[260px] h-56'  style={{zIndex:1500}}>
//         <div className='grid grid-cols-4 gap-2 gap-x-1  px-2'>
//         {
//            years.map(year => (
//             <SelectItem value={String(year)} key={year}
//               className='text-center py-1 px-2 rounded-full text-[14px] w-fit h-fit  text-[#6A6B6A] bg-[#F6F6F6]'
//             >
//               {year}
//             </SelectItem>
//           ))
//         }
//         </div>
//        </SelectContent>
//         </Select>
//       </div>
//           <Calendar
//           mode="single"
//           selected={selectedDate ?? undefined}
//           onSelect={(date) => {
//             if (date) onDateChange(date); 
//             setIsOpen(false); 
//           }}
//           initialFocus
//           disabled={disabledDate}
//            month={validDate}
//         />

//         <div className='border-t-[1px] mt-1 py-2 justify-between flex px-2'>
//        <Button
//          variant={'outline'}
//          className='border-none bg-white hover:bg-white text-[#A8A8A8] shadow-none'
//        >
//         Clear
//        </Button>
//        <Button
//        variant={'secondary'}
//        >
//         Done
//        </Button>
//         </div>

//     </PopoverContent>
//     </Popover>
//     </>
//   )
// }

// export default DatePickerInput

// import React, { useState } from 'react';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { format, isValid, subYears, addYears } from "date-fns";
// import { Calendar } from '@/components/ui/calendar';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { MdOutlineDateRange } from 'react-icons/md';

// interface Props {
//     selectedDate: Date | null | undefined;
//     onDateChange: (date: Date | undefined) => void;
//     className?: string;
//     placeholder?: string;
//     calendarStyle?: string;
//     disabledDate?: (date: Date) => boolean;
//     disabled?: boolean;
// }

// function DatePickerInput({
//     selectedDate, 
//     onDateChange,
//     className, 
//     placeholder = "Select a date",
//     calendarStyle,
//     disabledDate,
//     disabled = false,
// }: Props) {
//     const [isOpen, setIsOpen] = useState(false);

//     const safeSelectedDate = selectedDate && isValid(selectedDate) ? selectedDate : undefined;

//     const startMonth = subYears(new Date(), 100); 
//     const endMonth = addYears(new Date(), 100);   

//     return (
//         <Popover open={isOpen} onOpenChange={setIsOpen}>
//             <PopoverTrigger asChild>
//                 <Button 
//                     data-testid="calenderButton"
//                     className={cn(
//                         "w-full flex justify-between border rounded text-left text-black p-5 shadow-none",
//                         className,
//                         disabled && "opacity-60 bg-gray-50 text-gray-500 cursor-not-allowed"
//                     )} 
//                     disabled={disabled}
//                 >
//                     {safeSelectedDate 
//                         ? format(safeSelectedDate, 'dd-MM-yyyy') 
//                         : <span className="text-grey400">{placeholder}</span>}
//                     <MdOutlineDateRange className="w-5 h-5 ml-2 text-neutral950"/>
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent 
//                 align="start" 
//                 className={cn("bg-white w-auto p-8 md:p-1", calendarStyle)}
//                 style={{ zIndex: 1000 }}
//             >
//                 <Calendar
//                     mode="single"
//                     selected={safeSelectedDate}
//                     onSelect={(date) => {
//                         onDateChange(date);
//                         setIsOpen(false);
//                     }}
//                     // captionLayout="dropdown"
//                     defaultMonth={safeSelectedDate || new Date()}
//                     disabled={disabledDate}
//                     numberOfMonths={1}
//                     startMonth={startMonth}
//                     endMonth={endMonth}
//                 />
//             </PopoverContent>
//         </Popover>
//     );
// }

// export default DatePickerInput;