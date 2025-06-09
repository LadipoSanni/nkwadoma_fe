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

interface Props {
    cohort: string,
    program: string,
    institutionName?: string,
    userName?: string,
}

const LoaneeProfileHeader = ({cohort ,userName,institutionName, program}: Props) => {

    const [openModal, setOpenModal] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    const [modalButtonText, setModalButtonText] = React.useState('');
    const [modalTitle, setModalTitle] = React.useState('');
    const userRole  = getItemSessionStorage("user_role")


    const handleOpenModal = (id: string, title: string, buttonText: string) => {
        setModalId(id);
        setModalTitle(title);
        setModalButtonText(buttonText);
        setOpenModal(true);
    }

    return (
       <div>
           <div id={'loaneeProfileHeader'}
                data-testid={'loaneeProfileHeader'}
                className={`w-full h-fit md:h-[13vh]  py-4 border-b border-b-grey-200 px-4  mt-auto mb-auto  flex justify-between `}
           >
               <div
                   id={'cohortAndProgramInfo'}
                   data-testid={'cohortAndProgramInfo'}
                   className={` w-fit h-full  flex gap-2`}
               >
                   <div
                       id={'cohortImage'}
                       data-testid={'cohortImage'}
                       // className={`h-[4rem] w-[4rem] mt-auto mb-auto rounded-full bg-[#F6F6F6] `}
                   >
                       {userRole === 'LOANEE'?
                           <Badge className={`h-fit w-fit py-4 px-4  bg-[#F6F6F6] rounded-full `}>
                               {getFirstLetterOfWord(institutionName)}
                           </Badge>
                           :

                           <Badge  id={'loaneeUserName'} variant={"secondary"} className={`h-fit w-fit py-4 px-4 bg-[#E7F5EC] ${cabinetGroteskBold.className} text-[#063F1A] md:text-[#063F1A]  text-[24px] rounded-full `}>
                               {getFirstLetterOfWord(userName)}
                           </Badge>
                       }
                   </div>
                   <div className={` mt-auto mb-auto `}>
                       <div className={`   grid  gap-0 `}>
                           {userRole === 'LOANEE' ?
                               <span id={'cohortName'} data-testid={'cohortName'} className={` ${cabinetGroteskBold.className} text-[20px] text-[#212221] `}>{institutionName}</span>
                               :
                               <p id={'loaneeUserName'} className={`${cabinetGroteskBold.className} 0 text-[#212221] text-[20px] `}>{capitalizeFirstLetters(userName)}</p>

                           }
                           <div className={` flex gap-2`}>
                               <p id={'loaneeCohort'} className={`${inter.className} text-[#4D4E4D] text-[16px] `}>{capitalizeFirstLetters(cohort)}</p>
                               {cohort || program ? <Circle color={'#ECECEC'}
                                                            className="h-1 w-1 text-[#ECECEC] mt-auto mb-auto  fill-primary"/>: null}
                               <p id={'loaneeProgram'} data-testid={'loaneeProgram'} className={`${inter.className} text-[#4D4E4D] text-[16px] `}>{capitalizeFirstLetters(program)}</p>
                           </div>
                       </div>
                   </div>
               </div>

               {userRole === 'LOANEE' &&
               <Menubar className={'w-fit mt-auto mb-auto h-fit'}>
                   <MenubarMenu >
                       <MenubarTrigger className={` bg-[#F9F9F9] w-fit h-fit py-1.5  px-1.5 md:py-2 md:px-2 lg:py-2 lg:px-2 mt-auto mb-auto   rounded-full `} >
                           <MdMoreHoriz  color={'#6A6B6A'} className={` h-4 w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 `} />
                       </MenubarTrigger>
                       <MenubarContent>
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
               }
           </div>

           <Modal modalId={modalId} title={modalTitle} isOpen={openModal} setIsOpen={setOpenModal} buttonText={modalButtonText} />
       </div>
    );
};

export default LoaneeProfileHeader;