import React, {useEffect, useRef, useState} from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts';
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {MdClose} from "react-icons/md";
import ProgramSelect from "@/reuseable/select/ProgramSelect";
import DatePicker from "@/reuseable/date/DatePicker";
import DescriptionTextarea from "@/reuseable/textArea/DescriptionTextarea";
import FormButtons from "@/reuseable/buttons/FormButtons";
import {FeeBreakdownHeader, InitialItem, ItemList, AddItemSection} from "@/reuseable/feeBreakdown";
import {CohortNameInput, FileUpload} from "@/reuseable/Input";

interface createCohortProps {
    triggerButtonStyle: string
}
const CreateCohort: React.FC<createCohortProps> = ({triggerButtonStyle}) => {
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
                    size={'lg'}
                    className={`${triggerButtonStyle} h-12 shadow-none bg-meedlBlue hover:bg-meedlBlue cursor-pointer text-meedlWhite md:mt-0 mt-3 text-sm font-semibold leading-5`}>
                    Create Cohort
                </Button>
            </DialogTrigger>
            <DialogContent id="createCohortDialogContent"
                           className="max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-8 py-5 pl-5 pr-2">
                <DialogHeader id="createCohortDialogHeader">
                    <DialogTitle
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
                    {!isFormSubmitted ? (
                            <>
                                <CohortNameInput cohortName={cohortName} setCohortName={setCohortName}/>
                                <div id="programDateContainer" className={'flex gap-5 w-full items-center'}>
                                    <ProgramSelect selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram}
                                                   isSelectOpen={isSelectOpen} setIsSelectOpen={setIsSelectOpen}/>
                                    <DatePicker date={date} setDate={setDate}/>
                                </div>
                                <DescriptionTextarea description={description} setDescription={setDescription}/>
                                <FileUpload handleDrop={handleDrop} handleDragOver={handleDragOver}
                                            handleClick={handleClick} handleFileChange={handleFileChange}/>
                                <FormButtons isButtonDisabled={isButtonDisabled} setIsFormSubmitted={setIsFormSubmitted}/>
                            </>
                        ) : (
                            <main id="feeBreakdownContainer" className={'grid gap-5'}>
                                <FeeBreakdownHeader/>
                                <InitialItem/>
                                <ItemList items={items} setItems={setItems} handleDeleteItem={handleDeleteItem}/>
                                <div id={'Step2stickyContainer'} className={'sticky bottom-0 bg-meedlWhite'}>
                                    <AddItemSection handleSelectClick={handleSelectClick}/>
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
                            </main>
                        )}
                </form>
            </DialogContent>
        </Dialog>
    )};
export default CreateCohort;