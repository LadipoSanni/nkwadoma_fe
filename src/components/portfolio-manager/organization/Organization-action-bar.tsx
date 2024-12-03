"use client";
import React from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from '../../ui/button';

interface props {
    id: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    handleInviteOrganizationClick: ()=> void;
    inviteButton?: string
   

}


function OrganizationActionBar({id,value,onChange,handleInviteOrganizationClick,inviteButton}: props) {
  return (
    <div className='md:flex justify-between items-center'>
      <SearchInput 
        id={id} 
        value={value}
        onChange={onChange}
        />
        <div className='mt-4 md:mt-0'>
            <Button
             variant={`secondary`}
             className='h-[45px] w-full font-semibold md:w-[166px]'
             onClick={handleInviteOrganizationClick}
             id={`${inviteButton}-buttonId`}
            >
                Invite organization
            </Button>
        </div>
    </div>
  )
}

export default OrganizationActionBar