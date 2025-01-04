'use client'
import React from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from '@/components/ui/button';
import {inter} from '@/app/fonts'


interface props {
    id: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    handleButtonClick: ()=> void;
    buttonName: string;

}

function ButtonAndSearch({id,value,onChange,handleButtonClick,buttonName}:props) {
   
   
  return (
    <div  className={`${inter.className}`}>
    <div className={'md:flex  md:justify-between gap-5 grid'}>
    <SearchInput
         id={id} 
         value={value}
        onChange={onChange}
     />     
     <Button
     
      variant={"secondary"}
      size={"lg"}
      id={`buttonFor${id}`}
      className={` bg-meedlBlue text-meedlWhite  h-12 flex justify-center items-center md:max-w-36 w-full cursor-pointer`}
      onClick={handleButtonClick}
     >
      {buttonName}
     </Button>
    </div>
           </div>
     
  )
}

export default  ButtonAndSearch