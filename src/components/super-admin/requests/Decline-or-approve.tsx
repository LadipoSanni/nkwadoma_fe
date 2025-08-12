import React,{useState} from 'react'
import { Button } from '@/components/ui/button';
import { useApproveAdminMutation } from '@/service/admin/organization';
import {useToast} from "@/hooks/use-toast";
import Isloading from '@/reuseable/display/Isloading';

interface Props{
    requestedBy: string;
    invitee: string,
    id: string
    role: string
    setOpen: (condition: boolean) => void
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

function DeclineOrApprove({requestedBy,invitee,role,setOpen,id}:Props) {
    const [approveAdmin, {isLoading}] = useApproveAdminMutation()
     const { toast } = useToast();
      const [error, setError] = useState("")

    const handleClose =() => {
        setOpen(false)    
    }

    const handleApprove = async () => {
      const param = {
        organizationEmployeeId: id
      }
       try {
        const approve = await approveAdmin(param).unwrap()
        if(approve){
          toast({
            description: approve?.message,
            status: "success",
            duration: 1000
          });
          handleClose()
        }
        
       } catch (err) {
        const error = err as ApiError;
        setError(error?.data?.message);
       }
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
            className='w-full md:w-24 h-[50px] border-neutral650 text-neutral650 border-solid border-[1px] rounded-md hover:bg-white cursor-auto' 
            type='button'
            // onClick={handleClose}
         >
            Decline
        </button>
         </div>
         <div>
         <Button
         variant={'secondary'} 
         className='w-full md:w-24 h-[50px] '
         type='button'
         onClick={handleApprove}
         >
          { isLoading ? <Isloading /> :
          "Approve"
          }
        </Button>
         </div>
       </div>
       <div>
                {
                <div className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>
                 }
                </div>
    </div>
  )
}

export default DeclineOrApprove
