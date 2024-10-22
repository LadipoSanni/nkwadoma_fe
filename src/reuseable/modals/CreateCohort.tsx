import React, {useRef, useState, useEffect} from 'react';
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
    DialogClose,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {FiUploadCloud} from "react-icons/fi";
import {MdOutlineDateRange} from "react-icons/md";
import {MdKeyboardArrowUp} from "react-icons/md";
import {MdClose} from "react-icons/md";

const CreateCohort = () => {
    const [date, setDate] = useState<Date>();
    const [cohortName, setCohortName] = useState('');
    const [description, setDescription] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (cohortName && selectedProgram && date && description) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [cohortName, selectedProgram, date, description]);

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
                <Button className='bg-meedlBlue h-[2.8125rem] w-[8.375rem] hover:bg-meedlBlue cursor-pointer'>
                    Create Cohort
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[533px] [&>button]:hidden gap-8 p-5">
                <DialogHeader>
                    <DialogTitle
                        className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>
                        Create Cohort
                    </DialogTitle>
                    <DialogClose asChild>
                        <button className="absolute right-5">
                            <MdClose className="h-6 w-6 text-neutral950"/>
                        </button>
                    </DialogClose>
                </DialogHeader>
                <form className={`grid gap-5 ${inter.className}`}>
                    <div className={'grid gap-2'}>
                        <Label htmlFor="cohortName" className="block text-sm font-medium text-labelBlue">Cohort
                            Name</Label>
                        <Input type="text" id="cohortName" name="cohortName" placeholder="Cohort Name"
                               className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650'}
                               value={cohortName}
                               onChange={(e) => setCohortName(e.target.value)}/>
                    </div>
                    <div className={'flex gap-5 w-full items-center'}>
                        <div className={'grid gap-2 w-full'}>
                            <Label htmlFor="program"
                                   className="block text-[14px] font-medium leading-[22px] text-labelBlue">Program</Label>
                            <Select onValueChange={(value) => setSelectedProgram(value)}
                                    onOpenChange={(open) => setIsSelectOpen(open)}>
                                <SelectTrigger
                                    className={'mt-0 mb-0 h-[3.375rem] w-full border border-solid border-neutral650 '}>
                                    <SelectValue
                                        placeholder="Select Program">{selectedProgram || "Select Program"}</SelectValue>
                                    {isSelectOpen ? <MdKeyboardArrowUp className="h-[22px] w-[22px] text-neutral950"/> :
                                        <MdKeyboardArrowDown className="h-[22px] w-[22px] text-neutral950"/>}
                                </SelectTrigger>
                                <SelectContent>
                                    {["Design thinking", "Software engineering", "Product design", "Product marketing", "Product management"].map((program) => (
                                        <SelectItem className={' focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950'} key={program} value={program}>{program}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={'grid gap-2 w-full'}>
                            <Label htmlFor="date" className="block text-sm font-medium text-labelBlue">Select
                                date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "flex justify-between p-4 border border-solid border-neutral650 font-normal w-full h-[3.375rem]",
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
                                        disabled={(date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description"
                               className="block text-sm font-medium text-labelBlue">Description</Label>
                        <Textarea id="description" name="description" placeholder="Description"
                                  className={'resize-none placeholder:text-grey150 focus-visible:outline-0 ring-transparent focus-visible:ring-transparent'}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
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
                    <div className={'flex gap-5 mt-3 justify-end items-end'}>
                        <Button
                            className={'border-meedlBlue font-bold  text-meedlBlue w-[8.75rem] h-[3.5625rem] border border-solid'}
                            asChild>
                            <DialogClose>Cancel</DialogClose>
                        </Button>
                        <Button
                            className={`text-meedlWhite font-bold ${isButtonDisabled ? 'bg-neutral650' : 'bg-meedlBlue hover:bg-meedlBlue'} w-[8.75rem] h-[3.5625rem]`}
                            disabled={isButtonDisabled}>Create Cohort</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCohort;