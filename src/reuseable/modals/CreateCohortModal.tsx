import React from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts';
import {MdClose} from "react-icons/md";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {MdKeyboardArrowDown} from "react-icons/md";
import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const CreateCohortModal = () => {
    const [date, setDate] = React.useState<Date>()

    return (
        <div className={`${inter.className} fixed inset-0 flex items-center justify-center bg-MeedlDarkBlueGrey`}>
            <div className="bg-white h-[90vh]  p-5 gap-6 rounded-md w-[533px]">
                <div className="flex justify-between py-3 items-center">
                    <h2 className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Create
                        Cohort</h2>
                    <button className={'h-6 w-6'}>
                        <MdClose className="text-neutral950 h-6 w-6  cursor-pointer"/>
                    </button>
                </div>
                <form className="grid gap-5">
                    <div className={'grid gap-2'}>
                        <Label htmlFor="cohortName" className="block text-sm font-medium text-labelBlue">Cohort
                            Name</Label>
                        <Input type="text" id="cohortName" name="cohortName" placeholder="Cohort Name"
                               className={'p-4 rounded-md h-[3.375rem] border border-solid border-neutral650'}/></div>
                    <div className={'flex items-start gap-5 w-full'}>
                        <div  className={'grid gap-2 w-full'}>
                            <Label htmlFor="program"
                                   className="block text-[14px] font-medium leading-[22px] text-labelBlue">Program</Label>
                            <Select>
                                <SelectTrigger className={'mt-0 mb-0 h-[3.375rem] w-full'}>
                                    <SelectValue placeholder="Select Program">Select Program</SelectValue>
                                    <MdKeyboardArrowDown className="h-5 w-5"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"light"}>Program 1</SelectItem>
                                    <SelectItem value={"dark"}>Program 2</SelectItem>
                                    <SelectItem value={"light"}>Program 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div  className={'grid gap-2 w-full'}>
                            <Label htmlFor="date" className="block text-sm font-medium text-labelBlue">Start
                                Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "justify-start text-left font-normal  w-full h-[3.375rem]",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description"
                               className="block text-sm font-medium text-gray-700">Description</Label>
                        <Textarea id="description" name="description" placeholder="Description"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCohortModal;