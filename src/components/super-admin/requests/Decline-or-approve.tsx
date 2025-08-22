import React,{useState,useEffect} from 'react'
import { Button } from '@/components/ui/button';
import { useApproveOrDeclineAdminMutation,useApproveOrDeclineOrganizationMutation } from '@/service/admin/organization';
import {useToast} from "@/hooks/use-toast";
import Isloading from '@/reuseable/display/Isloading';
import { setRequestStatusTab,setrequestOrganizationStatusTab } from '@/redux/slice/staff-and-request/request';
import { store, useAppSelector } from '@/redux/store';
import { organizationApi } from '@/service/admin/organization';
import { setIsRequestedStaffOpen,setIsRequestedOrganizationOpen } from '@/redux/slice/staff-and-request/request';
import { useViewStaffDetailsQuery } from '@/service/admin/organization';
import { resetRequestedStaffId,resetRequestedOrganizationId } from '@/redux/slice/staff-and-request/request';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SkeletonForModal from '@/reuseable/Skeleton-loading-state/Skeleton-for-modal';
import {useGetOrganizationDetailsQuery} from "@/service/admin/organization";

interface Props{
    requestedBy: string;
    invitee: string,
    id: string
    role: string
    requestType?: string
    status?:string
    refetches?: () => void
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

function DeclineOrApprove({requestedBy,invitee,role,id,requestType,status,refetches}:Props) {
     const requestedStaffId = useAppSelector(state => state?.request?.requestedStaffId)
     const requestedOrganizationId = useAppSelector(state => state?.request?.requestedOrganizationId)
    const [approveAdmin, {isLoading}] = useApproveOrDeclineAdminMutation()
    const [approveOrDeclineOrg, {isLoading:isloading}] = useApproveOrDeclineOrganizationMutation()
    const {data, isLoading: detailLoading,refetch} = useViewStaffDetailsQuery({employeeId: requestedStaffId},{skip: !requestedStaffId})
     const {data:orgData, isLoading: isOrgLoading, refetch:reFetch} = useGetOrganizationDetailsQuery({organizationId: requestedOrganizationId},{skip: !requestedOrganizationId})
     const { toast } = useToast();
      const [error, setError] = useState("")
      const [buttonType,setButtonType] = useState("")   

    useEffect(() => {
      if(requestedStaffId){
        refetch()
      }else if(requestedOrganizationId){
        reFetch()
      }
    },[refetch,requestedStaffId,reFetch,requestedOrganizationId])

       
     const requestedby = data? data?.data?.requestedBy : orgData? orgData?.data?.requestedBy : requestedBy
     const userInvited = data? capitalizeFirstLetters(data?.data?.firstName) + " " +  capitalizeFirstLetters( data?.data?.lastName) : orgData? capitalizeFirstLetters(orgData.data?.name) : invitee
     const roles =  data?.data?.role === "PORTFOLIO_MANAGER"? "Portfolio manager" : data?.data?.role === "MEEDL_ADMIN"? "Admin" : data?.data?.role === "MEEDL_ASSOCIATE"? "Associate" : orgData?.data?.meedlUser?.role === "SUPER_ORGANIZATION_ADMIN" && "Super organization admin" 
     const userRole = roles? roles : role
     const userStatus = data? data?.data?.activationStatus : orgData? orgData?.data?.activationStatus : status


    const handleClose =() => {
        store.dispatch(setIsRequestedStaffOpen(false)) 
        store.dispatch(setIsRequestedOrganizationOpen(false))
        store.dispatch(resetRequestedStaffId())  
        store.dispatch(resetRequestedOrganizationId())
    }

    const handleApproveOrDecline = async (value: string) => {
      setButtonType(value)
      const param = {
        organizationEmployeeId: requestedStaffId ||  id,
        decision: value
      }

      const formData = {
        organizationId:requestedOrganizationId || id,
        activationStatus: value
      }

      const financierParam = {
        cooperateFinancierId: id,
        decision: value
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
          
         }
         else {
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
            if(refetches){
              refetches()
            }
           }
         }
       } catch (err) {
        const error = err as ApiError;
        setError(error?.data?.message);
       }
    }


  return (
    <div className='mt-6'>
    { detailLoading || isOrgLoading ? <SkeletonForModal/> 
    : userStatus === "INVITED"? <div className={`text-[14px] text-[#4D4E4D] mb-8`}>
      <span className='font-semibold'>{userInvited}</span> requested by   <span className='font-semibold'>{requestedby}</span> has already being approved as {requestType === "staff"? (userRole === "associate" || userRole === "admin"? `an ${userRole}` : `a ${userRole}`) : "an organization super admin"}
    </div> : <div>
      <p className={`text-[14px] text-[#4D4E4D]`}>
       <span className='font-semibold'>{requestedby}</span> has requested to invite  <span className='font-semibold'>{userInvited}</span> to MEEDL as {requestType === "staff"? (userRole === "associate" || userRole === "admin"? `an ${userRole}` : `a ${userRole}`) : "an super organization admin"}
      </p>
       <p className='mt-7 text-[14px]'>
       Do you want to approve this invitation?
       </p>
       <div className='mt-7 md:mb-1 mb-3 md:flex justify-end gap-6  text-[14px]'>
         <div className='mb-3'>
         <button
            className={`w-full md:w-24 h-[50px] ${userStatus !== "DECLINED"? "border-meedlBlue text-meedlBlue hover:bg-[#E8EAEE] cursor-pointer" : "border-[#ECECEC] text-[#A8A8A8] hover:bg-white cursor-auto"} border-solid border-[1px] rounded-md `} 
            type='button'
            onClick={()=>userStatus !== "DECLINED" && handleApproveOrDecline("DECLINED")}
         >
           { (isLoading || isloading ) && buttonType === "DECLINED" ? <Isloading /> :
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
       </div>
       }
       <div>
                {
                <div className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>
                 }
                </div>
    </div>
  )
}

export default DeclineOrApprove
