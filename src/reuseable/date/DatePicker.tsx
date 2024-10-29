import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { MdOutlineDateRange } from "react-icons/md";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => (
    <div id="dateContainer" className={'grid gap-2 w-full'}>
        <Label htmlFor="date" className="block text-sm font-medium text-labelBlue">Select date</Label>
        <Popover>
            <PopoverTrigger asChild>
                <Button id="dateButton" variant={"outline"} className={cn("flex justify-between p-4 border border-solid border-neutral650 font-normal w-full h-[3.375rem]", !date && "text-muted-foreground")}>
                    {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
                    <MdOutlineDateRange className="text-navbarIconColor h-5 w-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent id="datePopoverContent" className="w-auto mr-3 p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus disabled={(date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)}/>
            </PopoverContent>
        </Popover>
    </div>
);

export default DatePicker;