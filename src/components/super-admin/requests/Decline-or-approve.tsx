import React,{useState,useEffect} from 'react'
import { Button } from '@/components/ui/button';
import { useApproveOrDeclineAdminMutation,useApproveOrDeclineOrganizationMutation } from '@/service/admin/organization';
import {useToast} from "@/hooks/use-toast";
import Isloading from '@/reuseable/display/Isloading';
import { store, useAppSelector } from '@/redux/store';
import { organizationApi } from '@/service/admin/organization';
import { setIsRequestedStaffOpen,setIsRequestedOrganizationOpen,setRequestStatusTab,setrequestOrganizationStatusTab,setRequestFinancierStatusTab,setIsRequestedFinancierOpen,resetRequestedStaffId,resetRequestedOrganizationId,resetRequestedFinancierId} from '@/redux/slice/staff-and-request/request';
import { useViewStaffDetailsQuery } from '@/service/admin/organization';
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SkeletonForModal from '@/reuseable/Skeleton-loading-state/Skeleton-for-modal';
import {useGetOrganizationDetailsQuery} from "@/service/admin/organization";
import { useApproveOrDeclineFinancierRequestMutation } from '@/service/admin/financier';
import { useViewFinancierDetailQuery } from '@/service/admin/financier';

interface Props{
    requestedBy: string;
    invitee: string,
    id: string
    role: string
    requestType?: string
    status?:string
    refetches?: () => void
    user_role?: string
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

function DeclineOrApprove({requestedBy,invitee,role,id,requestType,status,refetches,user_role}:Props) {
     const requestedStaffId = useAppSelector(state => state?.request?.requestedStaffId)
     const requestedOrganizationId = useAppSelector(state => state?.request?.requestedOrganizationId)
     const requestedFinancierId = useAppSelector(state => state?.request?.requestedFinancierId)

    const [approveAdmin, {isLoading}] = useApproveOrDeclineAdminMutation()
    const [approveOrDeclineOrg, {isLoading:isloading}] = useApproveOrDeclineOrganizationMutation()
    const [approveOrDeclineInvitedFinancier,{isLoading:isFinancierloading}] = useApproveOrDeclineFinancierRequestMutation()

    const {data, error:errormessage, isLoading: detailLoading,refetch} = useViewStaffDetailsQuery({employeeId: requestedStaffId},{skip: !requestedStaffId})
     const {data:orgData,error:orgErrormessage, isLoading: isOrgLoading, refetch:reFetch} = useGetOrganizationDetailsQuery({organizationId: requestedOrganizationId},{skip: !requestedOrganizationId})
     const  {data: financierData,error:financierErrormessage,isLoading: isFinancierLoading, refetch:refetchFinancier} = useViewFinancierDetailQuery({financierId: requestedFinancierId},{skip : !requestedFinancierId})

     const { toast } = useToast();
      const [error, setError] = useState("")
      const [buttonType,setButtonType] = useState("")   

      const errorMessage = (errormessage || financierErrormessage || orgErrormessage) as ApiError


    useEffect(() => {
      if(requestedStaffId){
        refetch()
      }else if(requestedOrganizationId){
        reFetch()
      }
      else if(requestedFinancierId){
        refetchFinancier()
      }
    },[refetch,requestedStaffId,reFetch,requestedOrganizationId,requestedFinancierId,refetchFinancier])


    useEffect(() =>{
      if(requestedStaffId){
         if(data?.data?.activationStatus === "DECLINED" ){
          store.dispatch(setRequestStatusTab("declined"))
         }
      }else if(requestedOrganizationId){
        if(orgData?.data?.activationStatus  === "DECLINED"){
          store.dispatch(setrequestOrganizationStatusTab("declined"))  
        }
      }
      else if(requestedFinancierId){
        if(financierData?.data?.activationStatus  === "DECLINED"){
          store.dispatch(setRequestFinancierStatusTab("declined"))  
        }
      }
    },[requestedStaffId, requestedOrganizationId,requestedFinancierId, data?.data?.activationStatus, orgData?.data?.activationStatus,financierData?.data?.activationStatus])

       
     const requestedby = data? data?.data?.requestedBy : orgData? orgData?.data?.requestedBy : financierData? financierData?.data?.invitedBy : requestedBy
     const userInvited = data? capitalizeFirstLetters(data?.data?.firstName) + " " +  capitalizeFirstLetters( data?.data?.lastName) : orgData? capitalizeFirstLetters(orgData.data?.name) : financierData? capitalizeFirstLetters(financierData?.data?.name) : invitee
     
     const getUserRole = () => {
      const roleData = data?.data?.role;
      const orgRole = orgData?.data?.meedlUser?.role;
      const financierType = financierData?.data?.financierType;
      
      if (roleData === "PORTFOLIO_MANAGER") return "Portfolio manager";
      if (["MEEDL_ADMIN", "ORGANIZATION_ADMIN", "ORGANIZATION_ASSOCIATE"].includes(roleData)) return "Admin";
      if (roleData === "MEEDL_ASSOCIATE") return "Associate";
      if (roleData === "COOPERATE_FINANCIER_ADMIN") return "Admin";
      if (orgRole === "ORGANIZATION_ADMIN") return "Admin";
      if (financierType === "COOPERATE") return "Financier super admin";
      if (financierType === "INDIVIDUAL") return "Individual financier";
      return "";
  };
  
      const userRole = getUserRole() || role;
     const userStatus = data? data?.data?.activationStatus : orgData? orgData?.data?.activationStatus : financierData? financierData?.data?.activationStatus :  status

     console.log(userRole)

    const handleClose =() => {
        store.dispatch(setIsRequestedStaffOpen(false)) 
        store.dispatch(setIsRequestedOrganizationOpen(false))
        store.dispatch(setIsRequestedFinancierOpen(false))
        store.dispatch(resetRequestedStaffId())  
        store.dispatch(resetRequestedOrganizationId())
        store.dispatch(resetRequestedFinancierId())
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
        financierId: requestedFinancierId || id,
        activationStatus:value
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
          
         } else if (requestType === "financier") {
            const approve = await approveOrDeclineInvitedFinancier(financierParam).unwrap()
            if(approve){
              toast({
                description: approve?.message,
                status: "success",
                duration: 1000
              });
              if(requestType === "financier" && value === "DECLINED"){
                store.dispatch(setRequestFinancierStatusTab("declined"))
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
    { detailLoading || isOrgLoading || isFinancierLoading? <SkeletonForModal/>  :
     errorMessage?  <p className='mb-4 flex items-center justify-center text-error500'>{errorMessage?.data?.message }</p> 
    : ["INVITED","ACTIVE"].includes(userStatus || '') ? <div className={`text-[14px] text-[#4D4E4D] mb-8`}>
      <span className='font-semibold'>{userInvited}</span> requested by   <span className='font-semibold'>{requestedby}</span> has already being approved as {requestType === "staff"? (userRole === "Associate" || userRole === "Admin"? `an ${userRole}` : `a ${userRole}`) : requestType === "financier" ? (userRole === "Individual financier"? `an ${userRole}` : `a ${userRole}`) : "an organization super admin"}
    </div> : <div>
      <p className={`text-[14px] text-[#4D4E4D]`}>
       <span className='font-semibold'>{requestedby}</span> has requested to invite  <span className='font-semibold'>{userInvited}</span> to MEEDL as {requestType === "staff"? (userRole === "Associate" || userRole === "Admin"? `an ${userRole}` : `a ${userRole}`) : requestType === "financier" ? (userRole === "Individual financier"? `an ${userRole}` : `a ${userRole}`) : "an organization super admin"}
      </p>
       <p className='mt-7 text-[14px]'>
       Do you want to approve this invitation?
       </p>
     {  user_role === "MEEDL_ADMIN"? "" :
       <div className='mt-7 md:mb-1 mb-3 md:flex justify-end gap-6  text-[14px]'>
         <div className='mb-3'>
         <button
            className={`w-full md:w-24 h-[50px] ${userStatus !== "DECLINED"? "border-[#D42620] text-[#D42620] hover:bg-[#E8EAEE] cursor-pointer" : "border-[#ECECEC] text-[#A8A8A8] hover:bg-white cursor-auto"} border-solid border-[1px] rounded-md `} 
            type='button'
            onClick={()=>userStatus !== "DECLINED" && handleApproveOrDecline("DECLINED")}
         >
           { (isLoading || isloading || isFinancierloading) && buttonType === "DECLINED" ? <Isloading /> :
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
          { (isLoading || isloading || isFinancierloading) && buttonType === "APPROVED" ? <Isloading /> :
          "Approve"
          }
        </Button>
         </div>
       </div>
       }
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
