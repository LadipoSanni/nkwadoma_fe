import React from 'react'
import Isloading from '@/reuseable/display/Isloading';
import { Button } from '@/components/ui/button';

interface ButtonGroupProps { 
    isValid: boolean; 
    isLoading: boolean; 
    handleCloseModal?: () => void; 
    submitButtonName?: string
    handleContinueOrBack?: () => void; 
    hasContinue?: boolean
    id?: string
    hasBack?: boolean
}

function SubmitAndCancelButton({ isValid, isLoading, handleCloseModal,submitButtonName,handleContinueOrBack,hasContinue,id,hasBack }: ButtonGroupProps) {
    
  return (
    <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0 text-[14px]'>
    {!hasBack? <button
        type='reset' 
        className='w-full md:w-36 h-[57px] mb-4 bg-white border-solid border-meedlBlue border-[1px] rounded-md hover:bg-[#E8EAEE] ' 
        onClick={handleCloseModal} 
        id={`cancel${id}`}
        >
        Cancel
        </button> : 
        <Button
        variant={'outline'} 
        className='w-full md:w-36 h-[57px] mb-4' 
        id={`back${id}`}
        onClick={handleContinueOrBack}
        type='button'
        >
          Back
          </Button>
}
      { !hasContinue? <Button 
        variant={'default'} 
        className={`w-full md:w-36 h-[57px] ${!isValid ? "bg-neutral650 cursor-auto hover:bg-neutral650" : "hover:bg-[#435376] focus:bg-meedlBlue bg-meedlBlue cursor-pointer"}`} 
        type='submit'
         disabled={!isValid}
         id={`submit${id}`} 
         > 
         {
         isLoading ? <Isloading /> : submitButtonName
         } 
         </Button> :
         <Button
         variant={'default'} 
         className={`w-full md:w-36 h-[57px] ${!isValid ? "bg-[#D7D7D7] cursor-auto hover:bg-[#D7D7D7]" : "hover:bg-[#435376] focus:bg-meedlBlue bg-meedlBlue cursor-pointer"}`} 
         disabled={!isValid} 
         onClick={handleContinueOrBack}
         id={`continue${id}`}
         type='button'
         >
          Continue
         </Button>

}

    </div>
  )
}

export default SubmitAndCancelButton