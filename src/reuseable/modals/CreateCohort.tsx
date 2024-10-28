import React, {useEffect, useRef, useState} from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {FiUploadCloud} from "react-icons/fi";
import {
    MdAdd,
    MdClose,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdOutlineDateRange,
    MdOutlineDelete
} from "react-icons/md";

const CreateCohort = () => {
    const [date, setDate] = useState<Date>();
    const [cohortName, setCohortName] = useState('');
    const [description, setDescription] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [items, setItems] = useState<{ name: string, amount: string }[]>([]);

    useEffect(() => {
        if (cohortName && selectedProgram && date && description) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [cohortName, selectedProgram, date, description]);

    const resetForm = () => {
        setDate(undefined);
        setCohortName('');
        setDescription('');
        setSelectedProgram(null);
        setIsSelectOpen(false);
        setIsButtonDisabled(true);
        setIsFormSubmitted(false);
        setItems([]);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        // Handle file drop logic here
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            console.log(event.target.files);
        }
    };

    const handleSelectClick = () => {
        setItems([{name: '', amount: ''}, ...items]);
    };

    const handleDeleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <Dialog onOpenChange={(open) => !open && resetForm()}>
            <DialogTrigger asChild>
                <Button
                    id="createCohortButton"
                    className='shadow-none bg-meedlBlue h-[2.8125rem] md:w-[8.375rem] w-full hover:bg-meedlBlue cursor-pointer'>
                    Create Cohort
                </Button>
            </DialogTrigger>
            <DialogContent id="createCohortDialogContent"
                           className="max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-8 py-5 pl-5 pr-2">
                <DialogHeader id="createCohortDialogHeader">
                    <DialogTitle
                        id="createCohortDialogTitle"
                        className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>
                        Create Cohort
                    </DialogTitle>
                    <DialogClose asChild>
                        <button id="createCohortDialogCloseButton" className="absolute right-5">
                            <MdClose id={'createCohortCloseIcon'} className="h-6 w-6 text-neutral950"/>
                        </button>
                    </DialogClose>
                </DialogHeader>
                <form id="cohortForm"
                      className={`grid gap-5 ${inter.className} pr-2 overflow-y-auto overflow-x-hidden max-h-[500px]`}
                      style={{scrollbarGutter: 'stable both-edge'}}>
                    {!isFormSubmitted ? (<>
                                <div id="cohortNameContainer" className={'grid gap-2'}>
                                    <Label htmlFor="cohortName" className="block text-sm font-medium text-labelBlue">Cohort
                                        Name</Label>
                                    <Input type="text" id="cohortName" name="cohortName" placeholder="Enter name"
                                           className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650'}
                                           value={cohortName}
                                           onChange={(e) => setCohortName(e.target.value)}/>
                                </div>
                                <div id="programDateContainer" className={'flex gap-5 w-full items-center'}>
                                    <div id="programContainer" className={'grid gap-2 w-full'}>
                                        <Label htmlFor="program"
                                               className="block text-[14px] font-medium leading-[22px] text-labelBlue">Program</Label>
                                        <Select onValueChange={(value) => setSelectedProgram(value)}
                                                onOpenChange={(open) => setIsSelectOpen(open)}>
                                            <SelectTrigger id="programSelectTrigger"
                                                           className={'mt-0 mb-0 h-[3.375rem] w-full border border-solid border-neutral650 '}>
                                                <SelectValue placeholder="Select Program"
                                                             className={selectedProgram ? "placeholder:text-[#6A6B6A] text-[#212221]" : "text-[#6A6B6A]"}>{selectedProgram || "Select Program"}</SelectValue>
                                                {isSelectOpen ?
                                                    <MdKeyboardArrowUp className="h-[22px] w-[22px] text-neutral950"/> :
                                                    <MdKeyboardArrowDown className="h-[22px] w-[22px] text-neutral950"/>}
                                            </SelectTrigger>
                                            <SelectContent id="programSelectContent">
                                                {["Design thinking", "Software engineering", "Product design", "Product marketing", "Product management"].map((program) => (
                                                    <SelectItem
                                                        className={' focus:bg-lightBlue200 focus:text-meedlBlue text-lightBlue950'}
                                                        key={program} value={program}>{program}</SelectItem>))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div id="dateContainer" className={'grid gap-2 w-full'}>
                                        <Label htmlFor="date" className="block text-sm font-medium text-labelBlue">Select
                                            date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button id="dateButton" variant={"outline"}
                                                        className={cn("flex justify-between p-4 border border-solid border-neutral650 font-normal w-full h-[3.375rem]", !date && "text-muted-foreground")}>
                                                    {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
                                                    <MdOutlineDateRange className="text-navbarIconColor h-5 w-5"/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent id="datePopoverContent" className="w-auto mr-3 p-0">
                                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus
                                                          disabled={(date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)}/>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div id="descriptionContainer">
                                    <Label htmlFor="description"
                                           className="block text-sm font-medium text-labelBlue">Description</Label>
                                    <Textarea id="description" name="description" placeholder="Enter description"
                                              className={'resize-none placeholder:text-grey150 focus-visible:outline-0 ring-transparent focus-visible:ring-transparent'}
                                              value={description}
                                              onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                                <div id="dragAndDropContainer" className={'grid gap-2 w-full'}>
                                    <Label htmlFor="dragAndDrop" className="block text-sm font-medium text-labelBlue">Cohort
                                        image (Optional)</Label>
                                    <div id="dragAndDrop"
                                         className="grid gap-4 place-items-center border-dashed border border-neutral650 py-5 rounded-md bg-neutral100 cursor-pointer h-[147px]"
                                         onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleClick}>
                                        <input type="file" accept=".svg,.png,.jpg,.jpeg,.gif" style={{display: 'none'}}
                                               ref={fileInputRef} onChange={handleFileChange} className={'h-full w-full'}/>
                                        <div id="uploadIconContainer"
                                             className={'h-11 w-11 bg-meedlWhite flex justify-center items-center rounded-md'}>
                                            <FiUploadCloud className={'w-6 h-[22px]'}/>
                                        </div>
                                        <div id="uploadTextContainer" className={'grid gap-1 place-items-center'}>
                                            <p className={'font-normal text-black400 text-[14px] leading-[150%]'}><span
                                                className={'underline text-meedlBlue'}>Click to upload</span> or drag and
                                                drop</p>
                                            <p className={'text-grey250 leading-[150%] text-[14px] font-normal'}>SVG, PNG,
                                                JPG OR GIF (max. 800x400px) </p>
                                        </div>
                                    </div>
                                </div>
                                <div id="formButtonsContainer"
                                     className={'flex gap-5 mt-3 justify-end items-end sticky inset-0 bg-white'}>
                                    <Button id="cancelButton"
                                            className={'border-meedlBlue font-bold text-meedlBlue w-[8.75rem] h-[3.5625rem] border border-solid'}
                                            asChild>
                                        <DialogClose>Cancel</DialogClose>
                                    </Button>
                                    <Button id="continueButton"
                                            className={`text-meedlWhite font-bold ${isButtonDisabled ? 'bg-neutral650' : 'bg-meedlBlue hover:bg-meedlBlue'} w-[8.75rem] h-[3.5625rem]`}
                                            disabled={isButtonDisabled} onClick={() => setIsFormSubmitted(true)}>
                                        Continue
                                    </Button>
                                </div>
                            </>
                        )
                        : (
                            <main id="feeBreakdownContainer" className={'grid gap-5'}>
                                <div id="setupCohortFeeBreakdown"
                                     className={'flex justify-center items-center rounded-md bg-lightBlue500 w-[207px] h-[29px] text-meedlBlue px-1 py-2'}>
                                    <h1 className={'font-medium text-[14px] leading-[21px]'}>Setup cohort fee
                                        breakdown</h1>
                                </div>
                                <div id="initialItemContainer" className="flex gap-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor={`itemName`}
                                               className="block text-sm font-medium text-labelBlue">Item
                                            Name</Label>
                                        <Input type="text" id={`itemName`} name={`itemName`} placeholder="Item Name"
                                               value="Tuition" readOnly
                                               className="bg-grey105 p-4 focus-visible:outline-0 w-[231px] shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650"/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor={`itemAmount`}
                                               className="block text-sm font-medium text-labelBlue">Item
                                            Amount</Label>
                                        <div className="flex gap-2">
                                            <Select>
                                                <SelectTrigger id="initialItemSelectTrigger"
                                                               className={'bg-grey105 mt-0 mb-0 min-w-[78px]'}>
                                                    <SelectValue placeholder="NGN">NGN</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent id="initialItemSelectContent">
                                                    <SelectItem value="NGN">NGN</SelectItem>
                                                    {/*<SelectItem value="USD">USD</SelectItem>*/}
                                                    {/*<SelectItem value="EUR">EUR</SelectItem>*/}
                                                </SelectContent>
                                            </Select>
                                            <Input type="text" id={`itemAmount-`} name={`itemAmount`}
                                                   placeholder="Amount" value="2,000,000" readOnly
                                                   className="bg-grey105 p-4 focus-visible:outline-0 w-[132px] shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                                        </div>
                                    </div>
                                </div>
                                {items.map((item, index) => (
                                    <div key={index} id={`itemContainer${index}`} className="flex gap-5">
                                        <div className="grid gap-2 w-full">
                                            <Label htmlFor={`itemName${index}`}
                                                   className="block text-sm font-medium text-labelBlue">Item
                                                Name</Label>
                                            <Input type="text" id={`itemInputField${index}`} name={`itemName-${index}`}
                                                   placeholder="Item Name"
                                                   className="p-4 focus-visible:outline-0 w-[231px] shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650"
                                                   value={item.name} onChange={(e) => {
                                                const newItems = [...items];
                                                newItems[index].name = e.target.value;
                                                setItems(newItems);
                                            }}/>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`itemAmount${index}`}
                                                   className="block text-sm font-medium text-labelBlue">Item
                                                Amount</Label>
                                            <div className="flex gap-2">
                                                <Select>
                                                    <SelectTrigger id={`itemSelectTrigger${index}`}
                                                                   className={'mt-0 mb-0 min-w-[78px]'}>
                                                        <SelectValue placeholder="NGN">NGN</SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent id={`itemSelectContent${index}`}>
                                                        <SelectItem value="NGN">NGN</SelectItem>
                                                        {/*<SelectItem value="USD">USD</SelectItem>*/}
                                                        {/*<SelectItem value="EUR">EUR</SelectItem>*/}
                                                    </SelectContent>
                                                </Select>
                                                <div className={'flex justify-between gap-2 items-center'}>
                                                    <Input type="number" id={`itemAmount${index}`}
                                                           name={`itemAmount-${index}`} placeholder="0.00"
                                                           className="p-4 focus-visible:outline-0 w-[132px] shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey150 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                           value={item.amount} onChange={(e) => {
                                                        const newItems = [...items];
                                                        newItems[index].amount = e.target.value;
                                                        setItems(newItems);
                                                    }}/>
                                                    <MdOutlineDelete id={`deleteItemButton${index}`}
                                                                     className={'text-blue200 h-4 w-4 cursor-pointer'}
                                                                     onClick={() => handleDeleteItem(index)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>))}
                                <div id={'Step2stickyContainer'} className={'sticky bottom-0 bg-meedlWhite'}>
                                    <section id="Step2addItemSection" onClick={handleSelectClick}
                                             className={'cursor-pointer flex gap-1 bg-white'}>
                                        <MdAdd className={'text-meedlBlue h-5 w-5'}/>
                                        <span>
                                    <h1 className={'text-meedlBlue font-normal text-[14px]'}>Add item</h1>
                                    </span>
                                    </section>
                                    <section id="Step2formButtonsContainer"
                                             className={'flex gap-5 mt-3 justify-end items-end bg-meedlWhite'}>
                                        <Button id="Step2cancelButton"
                                                className={'border-meedlBlue font-bold text-meedlBlue w-[8.75rem] h-[3.5625rem] border border-solid'}
                                                asChild>
                                            <DialogClose>Cancel</DialogClose>
                                        </Button>
                                        <Button id="CreateCohortButton"
                                                className={`text-meedlWhite font-bold ${isButtonDisabled ? 'bg-neutral650' : 'bg-meedlBlue hover:bg-meedlBlue'} w-[8.75rem] h-[3.5625rem]`}
                                                disabled={isButtonDisabled} onClick={() => setIsFormSubmitted(true)}>
                                            Create cohort
                                        </Button>
                                    </section>
                                </div>

                            </main>)}
                </form>


            </DialogContent>
        </Dialog>);
};

export default CreateCohort;