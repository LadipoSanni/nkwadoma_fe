import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface FormButtonsProps {
    isButtonDisabled: boolean;
    setIsFormSubmitted?: (submitted: boolean) => void;
    setClearField?:() => void;
    isSubmitType?: boolean;
    buttonName?: string
}

const FormButtons: React.FC<FormButtonsProps> = ({ isButtonDisabled, setIsFormSubmitted,setClearField,isSubmitType,buttonName }) => {
       const setFormSubmitted = () => {
         if(setIsFormSubmitted){
            setIsFormSubmitted(true)
         }
       }
    return (
    <div id="formButtonsContainer" className={'md:flex grid gap-5 mt-3 md:justify-end md:items-end sticky inset-0 bg-white py-3'}>
        <Button id="cancelButton" className={'border-meedlBlue font-bold text-meedlBlue w-full md:w-[8.75rem] h-[3.5625rem] border border-solid'} asChild>
            <DialogClose onClick={setClearField}>Cancel</DialogClose>
        </Button>
       {!isSubmitType? <Button
            id="continueButton"
            className={`text-meedlWhite font-bold ${isButtonDisabled ? 'bg-neutral650 hover:bg-neutral650' : 'bg-meedlBlue hover:bg-meedlBlue'} w-full md:w-[8.75rem] h-[3.5625rem]`}
            disabled={isButtonDisabled}
            onClick={setFormSubmitted}
        >
            Continue
        </Button> 
        : 
        <Button
        disabled={isButtonDisabled}
        className={`text-meedlWhite font-bold ${isButtonDisabled ? 'bg-neutral650 hover:bg-neutral650' : 'bg-meedlBlue hover:bg-meedlBlue'} w-full md:w-[8.75rem] h-[3.5625rem]`}
        id="submitButton"
        type='submit'
        >
         {buttonName }
        </Button>
        }
    </div>
    );
};

export default FormButtons;