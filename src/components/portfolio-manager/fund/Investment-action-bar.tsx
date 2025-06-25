"use client";
import React from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from '../../ui/button';


interface props {
    id: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    handleDraftClick: ()=> void;
    handleCreateInvestmentVehicleClick: ()=> void;
    buttonName: string

}

function InvestmentActionBar({id,value,onChange,handleDraftClick,handleCreateInvestmentVehicleClick,buttonName}:props) {
   
   
  return (
    <div className='md:flex justify-between items-center'>
       <SearchInput 
        id={id} 
        value={value}
        onChange={onChange}
        />
        <div>
            <div className='md:flex gap-4'>
            <div>
                <Button
           variant={`outline`}
           id='draftButton'
           className='border-solid border-[#142854] cursor-pointer h-[45px] md:w-[105px] font-semibold text-[#142854] w-full  md:mt-0 mt-3'
           onClick={handleDraftClick}
           >
            Drafts
           </Button>    
           </div>
           <div className='md:mt-0 mt-3'>
           <Button
           variant={`secondary`}
           className='h-[45px] w-full font-semibold md:w-[200px]'
           onClick={handleCreateInvestmentVehicleClick}
           >
            {buttonName}
           </Button>
           </div>
           </div>
        </div>
    </div>
  )
}

export default InvestmentActionBar