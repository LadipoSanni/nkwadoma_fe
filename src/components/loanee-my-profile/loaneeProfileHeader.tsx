'use client'
import {cabinetGroteskBold, inter} from '@/app/fonts';
import React from 'react';
import { MdMoreHoriz } from "react-icons/md";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Circle } from "lucide-react"
import Modal from "@/reuseable/modals/Modal";
import {getItemSessionStorage} from "@/utils/storage";
import {capitalizeFirstLetters, getFirstLetterOfWord} from "@/utils/GlobalMethods";
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from '../back-button';
import {useRouter, useSearchParams} from "next/navigation";
import { useAppSelector} from '@/redux/store';

interface Props {
    cohort: string,
    program: string,
    institutionName?: string,
    userName?: string,
    isLoading: boolean,
}

const LoaneeProfileHeader = ({cohort ,userName,institutionName, program, isLoading}: Props) => {

    const [openModal, setOpenModal] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    const [modalButtonText, setModalButtonText] = React.useState('');
    const [modalTitle, setModalTitle] = React.useState('');
    const userRole  = getItemSessionStorage("user_role")
    const router = useRouter()
    const searchParams = useSearchParams()
     const organizationTabStatus = useAppSelector(store => store?.organization?.organizationDetailTabStatus)

    const handleOpenModal = (id: string, title: string, buttonText: string) => {
        setModalId(id);
        setModalTitle(title);
        setModalButtonText(buttonText);
        setOpenModal(true);
    }
    const handleBack = () => {
        if(userRole === 'PORTFOLIO_MANAGER'){
            if (searchParams){
                const id = searchParams.get("id");
                if (id) {
                    router.push('/loanees/loans')
                }else {
                     if(organizationTabStatus === "cohort"){
                        router.push('/organizations/cohort/all')
                     }else {
                        router.push('/organizations/loanees/uploaded')
                     }
                    

                }
            }

        }else if(userRole?.includes('ADMIN')) {
            router.push('/loanees/loans')
        }else if(userRole === 'LOANEE') {
            router.push("/my-loans");
        }
    }

    return (
       <div className={` ${userRole?.includes('ADMIN') ? ' ' :''} grid gap-3  h-fit   border-b border-b-grey-200 `} >
               <BackButton id={'backtoMyLoans'} sx={`  `} text={'Back'} handleClick={handleBack}
                        textColor={'meedlBlue'} iconBeforeLetters={true}/>


           <div id={'loaneeProfileHeader'}
                data-testid={'loaneeProfileHeader'}
                className={`w-full h-fit md:h-fit     mt-auto mb-auto  flex justify-between `}
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
                   className={` w-fit h-full   flex gap-2`}
               >
                       <div
                       id={'cohortImage'}
                       data-testid={'cohortImage'}
                       // className={`h-[4rem] w-[4rem] mt-auto mb-auto rounded-full bg-[#F6F6F6] `}
                   >
                       {userRole === 'LOANEE' ?
                           <Badge className={`h-[70px] w-[70px] hover:bg-[#F6F6F6]    bg-[#F6F6F6] rounded-full `}>

                               <p className={` w-fit h-fit mt-auto mb-auto mr-auto ml-auto ${cabinetGroteskBold.className} text-[#4D4E4D] md:text-[#4D4E4D] text-[24px] `}>{institutionName ? getFirstLetterOfWord(institutionName) ? getFirstLetterOfWord(institutionName) : institutionName?.at(0)?.toUpperCase() : ''}</p>
                           </Badge>
                           :

                           <Badge id={'loaneeUserName'} variant={"secondary"}
                                  className={`h-[70px] w-[70px] bg-[#E7F5EC] hover:bg-[#E7F5EC] ${cabinetGroteskBold.className} text-[#063F1A] md:text-[#063F1A]  text-[24px] rounded-full `}>
                               <p className={` w-fit h-fit mt-auto mb-auto mr-auto ml-auto `}>{userName ? getFirstLetterOfWord(userName) : ''}</p>
                           </Badge>
                       }
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

               {userRole === 'LOANEE' &&
                   <div className={`h-full hidden  grid content-center`}>
                       <Menubar  className={'w-fit mt-auto mb-auto h-fit'}>
                           <MenubarMenu >
                               <MenubarTrigger disabled={true} className={` bg-[#F9F9F9] w-fit h-fit py-1.5  px-1.5 md:py-2 md:px-2 lg:py-2 lg:px-2 mt-auto mb-auto   rounded-full `} >
                                   <MdMoreHoriz
                                       // color={'#6A6B6A'}
                                       color={'#d0d0d0'}
                                                 className={` cursor-not-allowed h-4 w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 `} />
                               </MenubarTrigger>
                               <MenubarContent  className={`hidden`}>
                                   <MenubarItem
                                       id={`dropOut`}
                                       onClick={() => handleOpenModal('dropOut', 'Drop out', 'Drop out')}
                                       className={` ${inter.className} text-[14px] text-[#212221] w-full hover:text-[#142854] hover:bg-[#D9EAFF] `}
                                   >

                                       Drop out
                                   </MenubarItem>
                                   <MenubarItem
                                       id={`deferCohort`}
                                       onClick={() => handleOpenModal('deferCohort', 'Defer cohort', 'Defer')}
                                       className={`${inter.className} text-[14px] text-[#212221] w-full hover:text-[#142854] hover:bg-[#D9EAFF] `}
                                   >

                                       Defer cohort
                                   </MenubarItem>
                               </MenubarContent>
                           </MenubarMenu>
                       </Menubar>
                   </div>
               }
           </div>

           <Modal modalId={modalId} title={modalTitle} isOpen={openModal} setIsOpen={setOpenModal}   buttonText={modalButtonText} />
       </div>
    );
};

export default LoaneeProfileHeader;