import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import IsLoading from "@/reuseable/display/Isloading";

interface FormButtonsProps {
    isButtonDisabled: boolean;
    setIsFormSubmitted?: (submitted: boolean) => void;
    setClearField?:() => void;
    isSubmitType?: boolean;
    buttonName?: string
    isloading?: boolean
}

const FormButtons: React.FC<FormButtonsProps> = ({ isButtonDisabled, setIsFormSubmitted,setClearField,isSubmitType,buttonName,isloading }) => {
       const setFormSubmitted = () => {
         if(setIsFormSubmitted){
            setIsFormSubmitted(true)
         }
       }
    return (
    <div id="formButtonsContainer" className={'md:flex grid gap-5 mt-3 md:justify-end md:items-end sticky inset-0 bg-white py-3'}>
        <Button id="cancelButton" className={'border-meedlBlue font-bold text-meedlBlue w-full md:w-[8.75rem] h-[3.5625rem] border border-solid'} asChild>
            <DialogClose onClick={setClearField} className='hover:bg-[#E8EAEE] focus:bg-[#E8EAEE]'>Cancel</DialogClose>
        </Button>
       {!isSubmitType? <Button
            id="continueButton"
            variant={"secondary"}
            className={`text-meedlWhite font-bold ${isButtonDisabled ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7]' : 'bg-meedlBlue'} w-full md:w-[8.75rem] h-[3.5625rem]`}
            disabled={isButtonDisabled}
            onClick={setFormSubmitted}
        >
            Continue
        </Button> 
        : 
        <Button
        disabled={isButtonDisabled}
        className={`text-meedlWhite font-bold ${isButtonDisabled ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7]' : 'bg-meedlBlue hover:bg-[#435376]'} w-full md:w-[8.75rem] h-[3.5625rem]`}
        id="submitButton"
        type='submit'
        >
         {isloading? <IsLoading/> : buttonName }
        </Button>
        }
    </div>
    );
};

export default FormButtons;