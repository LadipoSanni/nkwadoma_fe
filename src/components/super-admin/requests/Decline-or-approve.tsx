import React from 'react'
import { Button } from '@/components/ui/button';

interface Props{
    requestedBy: string;
    invitee: string,
    id: string
    role: string
    setOpen: (condition: boolean) => void
}

function DeclineOrApprove({requestedBy,invitee,id,role,setOpen}:Props) {

    const handleClose =() => {
        setOpen(false)
        id
    }
  return (
    <div className='mt-6'>
      <p className={`text-[14px] text-[#4D4E4D]`}>
       <span className='font-semibold'>{requestedBy}</span> has requested to invite  <span className='font-semibold'>{invitee}</span> to MEEDL as {role === "associate" || role === "admin"? `an ${role}` : `a ${role}`}
      </p>
       <p className='mt-7 text-[14px]'>
       Do you want to approve this invitation?
       </p>
       <div className='mt-7 md:mb-1 mb-3 md:flex justify-end gap-6  text-[14px]'>
         <div className='mb-3'>
         <button
            className='w-full md:w-24 h-[50px] border-[#142854] text-[#142854] border-solid border-[1px] rounded-md hover:bg-[#E8EAEE]' 
            type='button'
            onClick={handleClose}
         >
            Decline
        </button>
         </div>
         <div>
         <Button
         variant={'secondary'} 
         className='w-full md:w-24 h-[50px] '
         type='button'
         onClick={handleClose}
         >
           Approve
        </Button>
         </div>
       </div>
    </div>
  )
}

export default DeclineOrApprove
