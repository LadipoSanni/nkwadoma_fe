import React from 'react'
import Isloading from '@/reuseable/display/Isloading';
import { Button } from '@/components/ui/button';

interface ButtonGroupProps { 
    isValid: boolean; 
    isLoading: boolean; 
    handleCloseModal: () => void; 
    submitButtonName: string
}

function SubmitAndCancelButton({ isValid, isLoading, handleCloseModal,submitButtonName }: ButtonGroupProps) {
    
  return (
    <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0'>
        <Button 
        variant={'outline'} 
        type='reset' 
        className='w-full md:w-36 h-[57px] mb-4' 
        onClick={handleCloseModal} 
        >
        Cancel 
        </Button>
        <Button 
        variant={'default'} 
        className={`w-full md:w-36 h-[57px] ${!isValid ? "bg-neutral650 cursor-not-allowed" : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"}`} 
        type='submit'
         disabled={!isValid} 
         > 
         {
         isLoading ? <Isloading /> : submitButtonName
         } 
         </Button>

    </div>
  )
}

export default SubmitAndCancelButton