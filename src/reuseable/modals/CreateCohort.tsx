import React from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {MdKeyboardArrowDown} from "react-icons/md";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {FiUploadCloud} from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";

const CreateCohort = () => {
    const [date, setDate] = React.useState<Date>();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        // Handle file drop logic here
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle file change logic here
        console.log(event.target.files);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-meedlBlue h-12 hover:bg-meedlBlue cursor-pointer'>
                    Create Cohort
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[533px]">
                <DialogHeader>
                    <DialogTitle
                        className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>
                        Create Cohort
                    </DialogTitle>
                </DialogHeader>
                <form className={`grid gap-5 ${inter.className}`}>
                    <div className={'grid gap-2'}>
                        <Label htmlFor="cohortName" className="block text-sm font-medium text-labelBlue">Cohort
                            Name</Label>
                        <Input type="text" id="cohortName" name="cohortName" placeholder="Cohort Name"
                               className={'p-4 rounded-md h-[3.375rem] border border-solid border-neutral650'}/>
                    </div>
                    <div className={'flex items-start gap-5 w-full'}>
                        <div className={'grid gap-2 w-full'}>
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
                        <div className={'grid gap-2 w-full'}>
                            <Label htmlFor="date" className="block text-sm font-medium text-labelBlue">Select date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "flex justify-between p-4  font-normal w-full h-[3.375rem]",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
                                        <MdOutlineDateRange className="text-navbarIconColor h-5 w-5"/>
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
                               className="block text-sm font-medium text-labelBlue">Description</Label>
                        <Textarea id="description" name="description" placeholder="Description"
                                  className={'resize-none'}/>
                    </div>
                    <div className={'grid gap-2 w-full'}>
                        <Label htmlFor="dragAndDrop" className="block text-sm font-medium text-labelBlue">Cohort image
                            (Optional)</Label>
                        <div
                            id="dragAndDrop"
                            className="grid gap-4 place-items-center border-dashed border border-neutral650 py-5 rounded-md bg-neutral100 cursor-pointer h-[147px]"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={handleClick}
                        >
                            <input
                                type="file"
                                accept=".svg,.png,.jpg,.jpeg,.gif"
                                style={{display: 'none'}}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className={'h-full w-full'}
                            />
                            <div className={'h-11 w-11 bg-meedlWhite flex justify-center items-center rounded-md'}>
                                <FiUploadCloud className={'w-6 h-[22px]'}/>
                            </div>
                            <div className={'grid gap-1 place-items-center'}>
                                <p className={'font-normal text-black400 text-[14px] leading-[150%]'}><span
                                    className={'underline text-meedlBlue'}>Click to upload</span> or drag and drop</p>
                                <p className={'text-grey250 leading-[150%] text-[14px] font-normal'}>SVG, PNG, JPG OR
                                    GIF (max. 800x400px) </p>
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCohort;