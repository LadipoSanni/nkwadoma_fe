'use client'
import {cabinetGroteskBold, inter, inter700} from '@/app/fonts';
import React from 'react';
import { Circle } from "lucide-react"
// import Modal from "@/reuseable/modals/Modal";
import {getItemSessionStorage} from "@/utils/storage";
import {capitalizeFirstLetters, getFirstLetterOfWord} from "@/utils/GlobalMethods";
// import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from '../back-button';
import {useRouter, useSearchParams} from "next/navigation";
import {store, useAppSelector} from '@/redux/store';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {setUnderlineTabCurrentTab} from "@/redux/slice/layout/adminLayout";
import {setMakePaymentFrom} from "@/redux/slice/wallet";


interface Props {
    cohort: string,
    program: string,
    institutionName?: string,
    userName?: string,
    isLoading: boolean,
    loanStatus?: string,
}

const LoaneeProfileHeader = ({cohort ,userName,institutionName,loanStatus, program, isLoading}: Props) => {

    // const [openModal, setOpenModal] = React.useState(false);
    // const [modalId, setModalId] = React.useState('');
    // const [modalButtonText, setModalButtonText] = React.useState('');
    // const [modalTitle, setModalTitle] = React.useState('');
    const userRole  = getItemSessionStorage("user_role")
    const searchParams = useSearchParams()
     const organizationTabStatus = useAppSelector(store => store?.organization?.organizationDetailTabStatus)
    const organizationAdminView = useAppSelector(store => store?.adminLayout?.organizationFrom)

    const router = useRouter()
     

    // const handleOpenModal = (id: string, title: string, buttonText: string) => {
    //     setModalId(id);
    //     setModalTitle(title);
    //     setModalButtonText(buttonText);
    //     setOpenModal(true);
    // }
    const handleBack = () => {
        if(['PORTFOLIO_MANAGER','MEEDL_SUPER_ADMIN','PORTFOLIO_MANAGER_ASSOCIATE'].includes(userRole || "")){
            if (searchParams){
                const id = searchParams.get("id");
                if (id) {
                    router.push('/loans')
                }else {
                     if(organizationTabStatus === "cohort"){
                        router.push('/organizations/cohort/all')
                     }else {
                        router.push('/organizations/loanees/uploaded')
                     }
                    

                }
            }
        }else if(userRole?.includes('ADMIN')) {
            if(organizationAdminView === 'FromLoans'){
                router.push('/loans')
            }else{
                store.dispatch(setUnderlineTabCurrentTab('Loanee'))
                router.push('/cohort/details')
            }
        }else if(userRole === 'LOANEE') {
            router.push("/my-loans");
        }
    }
    const routerToSetAutoRepayment = () => {
        router.push(`/set-auto-repayment`)
    }

    const makePayment = () => {
        store.dispatch(setMakePaymentFrom('my-loan-profile'))
        router.push('/payment/make-payment')
    }

    const providedInstitutionName = institutionName ? getFirstLetterOfWord(institutionName) ? getFirstLetterOfWord(institutionName) : institutionName?.at(0)?.toUpperCase() : ''
    const providedLoaneeName = userName ? getFirstLetterOfWord(userName) : '';
    return (
       <div className={` ${userRole?.includes('ADMIN') ? ' ' :''} px-6 py-2  grid gap-4  h-fit    `} >
               <BackButton id={'backtoMyLoans'} sx={`  `} text={'Back'} handleClick={handleBack}
                        textColor={'meedlBlue'} iconBeforeLetters={true}/>


           <div id={'loaneeProfileHeader'}
                data-testid={'loaneeProfileHeader'}
                className={`w-full h-fit md:h-fit     mt-auto mb-auto grid gap-4  md:flex md:justify-between lg:flex lg:justify-between `}
           >

               {isLoading ?
                   <div className="flex items-center space-x-4">
                       <Skeleton className="h-20 w-20 bg-[#f4f4f5] rounded-full" />
                       <div className="space-y-2">
                           <Skeleton className="h-5 bg-[#f4f4f5] w-[250px]" />
                           <Skeleton className="h-5  bg-[#f4f4f5] w-[200px]" />
                       </div>
                   </div>
                   :

               <div
                   id={'cohortAndProgramInfo'}
                   data-testid={'cohortAndProgramInfo'}
                   className={` w-fit h-full   flex gap-4`}
               >
                       <div
                       id={'cohortImage'}
                       data-testid={'cohortImage'}
                       className={`h-[4rem] w-[4rem] grid place-content-center aspect-square mt-auto mb-auto rounded-full bg-[#F6F6F6] `}
                   >
                           <Avatar>
                               <AvatarImage src="" alt="@shadcn" />
                               <AvatarFallback>{userRole === 'LOANEE' ?  providedInstitutionName : providedLoaneeName}</AvatarFallback>
                           </Avatar>
                   </div>
                   <div className={` mt-auto mb-auto `}>
                       <div className={`   grid  gap-0 `}>
                           {userRole === 'LOANEE' ?
                               <span id={'cohortName'} data-testid={'cohortName'} className={` ${cabinetGroteskBold.className} text-[20px] text-[#212221] `}>{institutionName  ? institutionName : ''}</span>
                               :
                               <p id={'loaneeUserName'} className={`${cabinetGroteskBold.className} 0 text-[#212221] text-[20px] `}>{userName ? capitalizeFirstLetters(userName) : ''}</p>

                           }
                           <div className={` flex gap-2`}>
                               <p id={'loaneeCohort'} className={`${inter.className} text-[#4D4E4D] text-[16px] `}>{program ? capitalizeFirstLetters(program) :''}</p>
                               {cohort && program ? <Circle color={'#ECECEC'}
                                                            className="h-1 w-1 text-[#ECECEC] mt-auto mb-auto  fill-primary"/>: null}
                               <p id={'loaneeProgram'} data-testid={'loaneeProgram'} className={`${inter.className} text-[#4D4E4D] text-[16px] `}>{cohort ? capitalizeFirstLetters(cohort) : ''}</p>
                           </div>
                       </div>
                   </div>
               </div>

               }

               {userRole === 'LOANEE' && loanStatus === 'LOAN_DISBURSAL' &&
                   <div className={`h-full grid gap-2 mb-4  md:flex md:w-fit md:gap-2  `}>
                       <button id={'setAutoRepayment'} data-testid={'setAutoRepayment'}
                           onClick={routerToSetAutoRepayment}
                               className={` hover:bg-[#E8EAEE]   flex items-center justify-center  w-full   md:w-fit md:px-4  h-fit py-2  text-sm ${inter700.className} rounded-md border border-meedlBlue bg-white text-meedlBlue  `}>
                           Set auto repayment
                       </button>
                       <button id={'makePayment'} data-tesid={'makePayment'}
                           onClick={makePayment}
                               className={` hover:bg-[#E8EAEE]   flex items-center justify-center  w-full md:w-fit md:px-4   h-fit py-2  text-sm ${inter700.className} rounded-md  bg-meedlBlue text-white  `}>Make
                           payment
                       </button>
                   </div>
               }
           </div>

           {/*<Modal modalId={modalId} title={modalTitle} isOpen={openModal} setIsOpen={setOpenModal}   buttonText={modalButtonText} />*/}
       </div>
    );
};

export default LoaneeProfileHeader;