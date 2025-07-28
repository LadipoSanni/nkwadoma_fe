
import React, { useState, useEffect } from 'react';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, getYear } from "date-fns";
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MdOutlineDateRange } from 'react-icons/md';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select';
import {ChevronDownIcon,ChevronUpIcon} from "lucide-react"

interface Props {
    selectedDate: Date | undefined;
    onDateChange: (date: Date | null) => void;
    className?: string;
    placeholder?: string;
    calendarStyle?: string;
    disabledDate?: (date: Date) => boolean;
    disabled?: boolean;
    startYear?: number;
    endYear?: number;
}

function DatePickerInput({
    selectedDate,
    onDateChange,
    className,
    placeholder = "Select a date",
    calendarStyle,
    disabledDate,
    disabled = false,
    startYear = getYear(new Date()) - 50,
    endYear = getYear(new Date()) + 50,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempDate, setTempDate] = useState<Date | undefined>(selectedDate);
    const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate || new Date());
    const [monthSelectOpen, setMonthSelectOpen] = useState(false);
    const [yearSelectOpen, setYearSelectOpen] = useState(false);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    useEffect(() => {
        if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
            setTempDate(selectedDate);
            setCurrentMonth(selectedDate);
        } else {
            setTempDate(undefined);
            setCurrentMonth(new Date());
        }
    }, [selectedDate]);

    const isDateComplete = tempDate && !isNaN(tempDate.getTime());

    const handleMonthChange = (monthName: string) => {
        const monthIndex = months.indexOf(monthName);
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(monthIndex);
        setCurrentMonth(newMonth);

        if (tempDate) {
            const newDate = new Date(tempDate);
            newDate.setMonth(monthIndex);
            setTempDate(newDate);
        }
    };

    const handleYearChange = (yearStr: string) => {
        const year = parseInt(yearStr);
        const newMonth = new Date(currentMonth);
        newMonth.setFullYear(year);
        setCurrentMonth(newMonth);

        if (tempDate) {
            const newDate = new Date(tempDate);
            newDate.setFullYear(year);
            setTempDate(newDate);
        }
    };

    const handleDateSelect = (date: Date | undefined) => {
        setTempDate(date || undefined);
    };

    const handleDone = () => {
        if (tempDate) {
            onDateChange(tempDate);
            setIsOpen(false);
        }
    };

    const handleClear = () => {
        setTempDate(undefined);
        onDateChange(null)
        setCurrentMonth(new Date());
    };

    return (
        <Select   open={isOpen} onOpenChange={setIsOpen}>
            <SelectTrigger
            data-testid="calenderButton"
            className={cn(
                "w-full flex justify-between border rounded text-left text-black p-5 shadow-none",
                className,
                disabled && "opacity-60 bg-gray-50 text-gray-500 cursor-not-allowed"
            )}
            onClick={() => setIsOpen(true)}
            disabled={disabled}
           
             >
                {/* <Button
                    data-testid="calenderButton"
                    className={cn(
                        "w-full flex justify-between border rounded text-left text-black p-5 shadow-none",
                        className,
                        disabled && "opacity-60 bg-gray-50 text-gray-500 cursor-not-allowed"
                    )}
                    onClick={() => setIsOpen(true)}
                    disabled={disabled}
                > */}
                    {tempDate && !isNaN(tempDate.getTime()) ? (
                       <span className='text-black'>{format(tempDate, 'dd-MM-yyyy')}</span> 
                    ) : (
                        <span className="text-grey400">{placeholder}</span>
                    )}
                    <MdOutlineDateRange className="w-5 h-5 ml-2 text-neutral950" />
                {/* </Button> */}
            </SelectTrigger>
            <SelectContent
                align="start"
                className={cn("bg-white max-w-72 lg:w-auto  p-1 ", calendarStyle)}
                style={{ zIndex: 1000 }}
            >
              <div className='relative bottom-6'>
                <div className='flex items-center  relative left-11 top-11 bg-white  gap-2 w-40'  style={{ zIndex: 2000 }}>
                    <Select
                        onValueChange={handleMonthChange}
                        value={months[currentMonth.getMonth()]}
                        onOpenChange={(open) => setMonthSelectOpen(open)}
                    >
                        <SelectTrigger className='w-[50px] min-w-[6.6rem] mt-0 mb-0 h-8 shadow-none'>
                            <SelectValue placeholder='Month' style={{ zIndex: 1000 }} />
                            {monthSelectOpen ? (
                                      <span className='relative left-1' ><ChevronUpIcon className="h-4 w-4 " /></span>  
                                    ) : (
                                      <span className='relative left-1' >    <ChevronDownIcon className="h-4 w-4 " /></span>  
                                    )}
                        </SelectTrigger>
                        <SelectContent className='z-50 w-[280px] h-44' style={{ zIndex: 1500 }}>
                            <div className='grid grid-cols-3 gap-2 p-1 px-2'>
                                {months.map(month => (
                                    <SelectItem
                                        value={month}
                                        key={month}
                                        className='text-center py-1 px-2 rounded-full text-[14px] w-fit h-fit text-[#6A6B6A] bg-[#F6F6F6]'
                                    >
                                        {month}
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={handleYearChange}
                        value={String(currentMonth.getFullYear())}
                        onOpenChange={(open) => setYearSelectOpen(open)}
                    >
                        <SelectTrigger className='w-[50px] min-w-[4.7rem] mt-0 mb-0 h-8 shadow-none'>
                            <SelectValue placeholder='Year' />
                            {yearSelectOpen ? (
                                      <span className='relative left-1' ><ChevronUpIcon className="h-4 w-4 " /></span>  
                                    ) : (
                                      <span className='relative left-1' >    <ChevronDownIcon className="h-4 w-4 " /></span>  
                                    )}
                        </SelectTrigger>
                        <SelectContent className='z-50 w-[260px] h-56' style={{ zIndex: 1500 }}>
                            <div className='grid grid-cols-4 gap-2 gap-x-1 px-2'>
                                {years.map(year => (
                                    <SelectItem
                                        value={String(year)}
                                        key={year}
                                        className='text-center py-1 px-2 rounded-full text-[14px] w-fit h-fit text-[#6A6B6A] bg-[#F6F6F6]'
                                    >
                                        {year}
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                </div>
                <div style={{ zIndex: 10000 }}>
                <Calendar
                    mode="single"
                    selected={tempDate}
                    onSelect={handleDateSelect}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    disabled={disabledDate}
                />
                </div>
               
                <div className='border-t-[1px] max-w-[270px] lg:w-auto relative top-2 py-2 justify-between flex px-2 h-8'>
                    <Button
                        variant={'outline'}
                        className={`${!isDateComplete? "text-[#A8A8A8]" : "text-meedlBlue"} border-none bg-white hover:bg-white focus:bg-white  shadow-none`}
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                    <Button
                        variant={'secondary'}
                        onClick={handleDone}
                        disabled={!isDateComplete}
                        className={!isDateComplete ? "bg-[#D7D7D7] hover:bg-[#D7D7D7]" : "bg-meedlBlue cursor-pointer"}
                    >
                        Done
                    </Button>
                </div>
                </div>
            </SelectContent>
        </Select>
    );
}

export default DatePickerInput;