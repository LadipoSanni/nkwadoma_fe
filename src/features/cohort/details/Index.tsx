'use client'
import BackButton from '@/components/back-button';
import React,{useEffect,useState} from 'react';
import {useRouter} from "next/navigation";
import CircleThreeDot from "@/reuseable/Dropdown/CircleThreeDot";
import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";
import UnderlineTab from "@/components/UnderlineTab";
import DetailsComponent from "@/features/cohort/details/DetailsComponent";
import {useAppSelector,store } from "@/redux/store";
import {useDeleteCohortMutation, useViewCohortDetailsQuery} from "@/service/admin/cohort_query";
import {LoaneeInCohortView} from "@/features/cohort/cohort-details/LoaneeInCohortView/Index";
import {Cross2Icon} from "@radix-ui/react-icons";
import TableModal from "@/reuseable/modals/TableModal";
import {useToast} from "@/hooks/use-toast";
import DeleteModal from "@/reuseable/modals/Delete-modal";
import DeleteCohort from "@/reuseable/details/DeleteCohort";
import { setCreateCohortField,resetCreateCohortField,setSelectedProgramName,setTotalRefferedNumberOfLoanee} from "@/redux/slice/create/cohortSlice";
import EditCohortForm from '@/components/cohort/CreateCohort';
import { LoanBreakDowns } from '@/components/cohort/CreateCohort';
import DeletionRestrictionMessageProps from '@/components/cohort/DeletionRestrictionMessageProps';
import { setCurrentNavbarItem } from '@/redux/slice/layout/adminLayout';

const CohortDetails = () => {
    const router = useRouter();
    const cohortId = useAppSelector(store => store?.cohort?.setCohortId)
    const selectedCohortInOrganizationType = useAppSelector(store => store?.cohort?.selectedCohortInOrganizationType)
    const [loanBreakdowns, setBreakdowns] = useState<LoanBreakDowns[]>([])
    const [deleteItem,{isLoading:isDeleteLoading}] = useDeleteCohortMutation()
    const currentProgramId = useAppSelector(state => (state.program.currentProgramId))
    const {data: cohortDetails} = useViewCohortDetailsQuery({
        cohortId: cohortId
    }, {refetchOnMountOrArgChange: true});
    const {toast} = useToast()
    const totalNumberOfRefferdLoanee = useAppSelector(store => store?.cohort?.numberOfRefferedLoanees)

     useEffect(() => {
           const breakdowns = cohortDetails?.data.loanBreakdowns
           const formattedBreakdowns = breakdowns?.map((item: { itemName: string; itemAmount: number; currency: string }) => ({
            ...item,
            itemAmount: String(item.itemAmount)
        })) || [];
        setBreakdowns(formattedBreakdowns)
        },[cohortDetails])

    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [hasLoanee, setHasLoanee] = React.useState(false);

    const totalNumberOfLoanee = cohortDetails?.data?.numberOfLoanees as number

    const editCohort = ( ) => {
        setOpenEditModal(true);
       const programName =cohortDetails?.data?.programName
       const totalNumberOfRefferedLoanee = cohortDetails?.data?.numberOfReferredLoanee as number
        const details = {
              id: cohortDetails?.data?.id ,
              name: cohortDetails?.data?.name,
              programId: cohortDetails?.data?.programId,
              startDate: cohortDetails?.data?.startDate,
              cohortDescription: cohortDetails?.data?.cohortDescription,
              tuitionAmount : String(cohortDetails?.data?.tuitionAmount),
              loanBreakDowns: loanBreakdowns || [],
              programName: ""
        }
        store.dispatch(setCreateCohortField(details))
        store.dispatch(setSelectedProgramName(programName))
        store.dispatch(setTotalRefferedNumberOfLoanee(totalNumberOfRefferedLoanee))
    }


    const handleOpenDeleteModal = () => {
         if(totalNumberOfLoanee) {
            setHasLoanee(true)
        setOpenDeleteModal(true) 
     }else {
        setHasLoanee(false)
        setOpenDeleteModal(true) 
     }
    }




    const handleDelete = async (id: string) => {
        try{
             await deleteItem({id}).unwrap();
            setOpenDeleteModal(false)
            toast({
                description: 'Cohort deleted successfully',
                status: "error",
            })
            router.push('/cohort')
        }catch (e) {
            setOpenDeleteModal(false)
            toast({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-expect-error
                description: e?.data?.message,
                status: "error",
            })
        }

    }

    const handleBackaRoute =() => {
        if(!currentProgramId){
            router.push( '/cohort') 
        }else {
             store.dispatch(setCurrentNavbarItem("Program"))
            router.push("/program/program-cohorts") 
        }
    }



    const dropD: ThreeDotTriggerDropDownItemsProps[] = [
        {id: 'editCohortDropDownItem', name: 'Edit cohort', handleClick: editCohort, sx: ``},
        {id: 'deleteCohortDropDownItem', name: 'Delete cohort', handleClick: () => {handleOpenDeleteModal()}, sx: ``},

    ]

    const tabTriggers: {name: string; id: string}[] = [
        {name: 'Details', id: 'details'},
        {name: 'Loanee', id: 'loanees'},

    ]
    const tab:  {name: string; displayValue: React.ReactNode}[] = [
        {name: 'Details',  displayValue: <DetailsComponent/>},
        {name: 'Loanee',  displayValue: <LoaneeInCohortView cohortFee={cohortDetails?.data?.tuitionAmount}/>
        },

    ]

    return (
        <div
            id={'cohortDetails'}
            data-testid={'cohortDetails'}
            className={` px-4 py-4   `}
        >
            <BackButton id={'backToViewAllCohort'} handleClick={handleBackaRoute} text={'Back'} textColor={'#142854'} iconBeforeLetters={true} />
            <div className={` mt-4 mb-4 flex justify-between w-full `}>
                <div
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',

                    }}
                    id={'cohortName'}
                      data-testid={'cohortName'}
                      className={` text-[28px] max-h-[10vh] overflow-y-scroll  break-all mr-2  text-black `}
                >{cohortDetails?.data?.name}</div>
                {selectedCohortInOrganizationType !== 'GRADUATED' && <CircleThreeDot
                    id={'editAndDeleteCohort'}
                    dotDisplay={'vertical'}
                    isDisabled={false}
                    dropDownItems={dropD}
                />}
            </div>
           { totalNumberOfRefferdLoanee > 0? 
        <TableModal
         styeleType="styleBodyTwo"
         isOpen={openEditModal}
         closeModal={() => {
             setOpenEditModal(false)
             store.dispatch(resetCreateCohortField())
         }}
         closeOnOverlayClick={true}
         icon={Cross2Icon}
        >
         <DeletionRestrictionMessageProps
          totalNumberOfLoanee={totalNumberOfRefferdLoanee}
          image={ "/Icon - Warning.svg" }
          message={`This cohort can not be edited because it has Cohort that contains ${totalNumberOfRefferdLoanee > 1? "loanees" : "loanee"} that has been referred` }
          />
        </TableModal>
         :  <TableModal
                isOpen={openEditModal}
                closeModal={() => {
                    setOpenEditModal(false)
                    store.dispatch(resetCreateCohortField())
                }}
                closeOnOverlayClick={true}
                headerTitle='Edit Cohort'
                className='pb-1'
                icon={Cross2Icon}

            >
                <EditCohortForm setIsOpen={()=>{setOpenEditModal(false)}} isEdit={true}/>
            </TableModal>}
           {hasLoanee? 
           <TableModal
            isOpen={openDeleteModal}
            closeOnOverlayClick={true}
            icon={Cross2Icon}
            headerTitle=''
            closeModal={() => {
                setOpenDeleteModal(false)
            }}
            styeleType="styleBodyTwo"
           >
            <DeletionRestrictionMessageProps totalNumberOfLoanee={totalNumberOfLoanee}/>

           </TableModal> : 
           <DeleteModal
                isOpen={openDeleteModal}
                closeModal={() => {
                    setOpenDeleteModal(false)
                    // setDeleteProgram("")
                }}
                closeOnOverlayClick={true}
                icon={Cross2Icon}
                width='auto'
            >
                <DeleteCohort
                    setIsOpen={()=> {
                        setOpenDeleteModal(false)
                    }}
                    headerTitle='Cohort'
                    title='cohort'
                    handleDelete={handleDelete}
                    id={cohortId}
                    isLoading={isDeleteLoading}
                />
            </DeleteModal>}
            <UnderlineTab defaultTab={'Details'} tabTriggers={tabTriggers} tabValue={tab}/>

        </div>
    );
};

export default CohortDetails;