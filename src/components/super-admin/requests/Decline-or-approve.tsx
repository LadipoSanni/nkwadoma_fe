import React,{useState} from 'react'
import { Button } from '@/components/ui/button';
import { useApproveOrDeclineAdminMutation,useApproveOrDeclineOrganizationMutation } from '@/service/admin/organization';
import {useToast} from "@/hooks/use-toast";
import Isloading from '@/reuseable/display/Isloading';
import { setRequestStatusTab,setrequestOrganizationStatusTab } from '@/redux/slice/staff-and-request/request';
import { store } from '@/redux/store';
import { organizationApi } from '@/service/admin/organization';


interface Props{
    requestedBy: string;
    invitee: string,
    id: string
    role: string
    setOpen: (condition: boolean) => void
    requestType?: string
    status?:string
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

function DeclineOrApprove({requestedBy,invitee,role,setOpen,id,requestType,status}:Props) {
    const [approveAdmin, {isLoading}] = useApproveOrDeclineAdminMutation()
    const [approveOrDeclineOrg, {isLoading:isloading}] = useApproveOrDeclineOrganizationMutation()
     const { toast } = useToast();
      const [error, setError] = useState("")
      const [buttonType,setButtonType] = useState("")

    const handleClose =() => {
        setOpen(false)    
    }

    const handleApproveOrDecline = async (value: string) => {
      setButtonType(value)
      const param = {
        organizationEmployeeId: id,
        decision: value
      }

      const formData = {
        organizationId: id,
        activationStatus: value
      }
       try {
         if(requestType === "staff"){
          const approve = await approveAdmin(param).unwrap()
          if(approve){
            toast({
              description: approve?.message,
              status: "success",
              duration: 1000
            });
            if(requestType === "staff" && value === "DECLINED"){
              store.dispatch(setRequestStatusTab("declined"))
            }
            handleClose()
          }
          
         }else {
          const approveOrDecline = await approveOrDeclineOrg(formData).unwrap()
           if(approveOrDecline){
            toast({
              description: approveOrDecline?.message,
              status: "success",
              duration: 1000
            });
            store.dispatch(organizationApi.util.invalidateTags(['organization']))
            if(requestType === "organization" && value === "DECLINED"){
              store.dispatch(setrequestOrganizationStatusTab("declined"))
            }
            handleClose()
           }
         }
       } catch (err) {
        const error = err as ApiError;
        setError(error?.data?.message);
       }
    }


  return (
    <div className='mt-6'>
      <p className={`text-[14px] text-[#4D4E4D]`}>
       <span className='font-semibold'>{requestedBy}</span> has requested to invite  <span className='font-semibold'>{invitee}</span> to MEEDL as {requestType === "staff"? (role === "associate" || role === "admin"? `an ${role}` : `a ${role}`) : "an organization"}
      </p>
       <p className='mt-7 text-[14px]'>
       Do you want to approve this invitation?
       </p>
       <div className='mt-7 md:mb-1 mb-3 md:flex justify-end gap-6  text-[14px]'>
         <div className='mb-3'>
         <button
            className={`w-full md:w-24 h-[50px] ${status !== "DECLINED"? "border-meedlBlue text-meedlBlue hover:bg-[#E8EAEE] cursor-pointer" : "border-[#ECECEC] text-[#A8A8A8] hover:bg-white cursor-auto"} border-solid border-[1px] rounded-md `} 
            type='button'
            onClick={()=>status !== "DECLINED" && handleApproveOrDecline("DECLINED")}
         >
           { (isLoading || isloading) && buttonType === "DECLINED" ? <Isloading /> :
          "Decline"
          }
        </button>
         </div>
         <div>
         <Button
         variant={'secondary'} 
         className='w-full md:w-24 h-[50px] '
         type='button'
         onClick={()=>handleApproveOrDecline("APPROVED")}
         >
          { (isLoading || isloading) && buttonType === "APPROVED" ? <Isloading /> :
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
