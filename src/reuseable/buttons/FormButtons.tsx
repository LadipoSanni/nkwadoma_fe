import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface FormButtonsProps {
    isButtonDisabled: boolean;
    setIsFormSubmitted: (submitted: boolean) => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({ isButtonDisabled, setIsFormSubmitted }) => (
    <div id="formButtonsContainer" className={'md:flex grid gap-5 mt-3 md:justify-end md:items-end sticky inset-0 bg-white'}>
        <Button id="cancelButton" className={'border-meedlBlue font-bold text-meedlBlue w-full md:w-[8.75rem] h-[3.5625rem] border border-solid'} asChild>
            <DialogClose>Cancel</DialogClose>
        </Button>
        <Button
            id="continueButton"
            className={`text-meedlWhite font-bold ${isButtonDisabled ? 'bg-neutral650 hover:bg-neutral650' : 'bg-meedlBlue hover:bg-meedlBlue'} w-full md:w-[8.75rem] h-[3.5625rem]`}
            disabled={isButtonDisabled}
            onClick={() => setIsFormSubmitted(true)}
        >
            Continue
        </Button>
    </div>
);

export default FormButtons;