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
interface Props {
    cohort: string,
    program: string,
}

const LoaneeProfileHeader = ({cohort , program}: Props) => {

    const [openModal, setOpenModal] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    const [modalButtonText, setModalButtonText] = React.useState('');
    const [modalTitle, setModalTitle] = React.useState('');


    const handleOpenModal = (id: string, title: string, buttonText: string) => {
        console.log('id: ',id,'title: ', title)
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
                       className={`h-[4rem] w-[4rem] mt-auto mb-auto rounded-full bg-[#F6F6F6] `}
                   >

                   </div>
                   <div className={` mt-auto mb-auto `}>
                       <span id={'cohortName'} data-testid={'cohortName'} className={` ${cabinetGroteskBold.className} text-[20px] text-[#212221] `}>Semicolon Africa</span>
                       <div className={`  flex  gap-2 `}>
                           <p className={`${inter.className} text-[#4D4E4D] text-[14px] `}>{cohort}</p>
                           {cohort || program && <Circle color={'#ECECEC'}
                                    className="h-1 w-1 text-[#ECECEC] mt-auto mb-auto  fill-primary"/>}
                           <p className={`${inter.className} text-[#4D4E4D] text-[14px] `}>{program}</p>
                       </div>
                   </div>
               </div>



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

           </div>
           <Modal modalId={modalId} title={modalTitle} isOpen={openModal} setIsOpen={setOpenModal} buttonText={modalButtonText} />

       </div>
    );
};

export default LoaneeProfileHeader;