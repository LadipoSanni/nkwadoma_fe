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
// import EditCohortForm from "@/components/cohort/EditCohortForm";
import {Cross2Icon} from "@radix-ui/react-icons";
import TableModal from "@/reuseable/modals/TableModal";
import {useToast} from "@/hooks/use-toast";
import DeleteModal from "@/reuseable/modals/Delete-modal";
import DeleteCohort from "@/reuseable/details/DeleteCohort";
import { setCreateCohortField } from "@/redux/slice/create/cohortSlice";
import EditCohortForm from '@/components/cohort/CreateCohort';
import { LoanBreakDowns } from '@/components/cohort/CreateCohort';



const CohortDetails = () => {
    const router = useRouter();
    const cohortId = useAppSelector(store => store?.cohort?.setCohortId)
    const selectedCohortInOrganizationType = useAppSelector(store => store?.cohort?.selectedCohortInOrganizationType)
    const [loanBreakdowns, setBreakdowns] = useState<LoanBreakDowns[]>([])
    const [deleteItem,{isLoading:isDeleteLoading}] = useDeleteCohortMutation()
    const {data: cohortDetails} = useViewCohortDetailsQuery({
        cohortId: cohortId
    }, {refetchOnMountOrArgChange: true});
    const {toast} = useToast()


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
    // const [details, setDetails] = React.useState({
    //     id: "",
    //     programId: "",
    //     organizationId: "",
    //     cohortDescription: "",
    //     name: "",
    //     activationStatus: "",
    //     cohortStatus: "",
    //     tuitionAmount: 0,
    //     totalCohortFee: 0,
    //     imageUrl: "",
    //     startDate: "",
    //     expectedEndDate: "",
    // })

    const editCohort = ( ) => {
        setOpenEditModal(true);
        // setDetails({
        //     id: cohortDetails?.data?.id || "",
        //     programId: cohortDetails?.data?.programId || "",
        //     organizationId: cohortDetails?.data?.organizationId || "",
        //     cohortDescription: cohortDetails?.data?.cohortDescription || "",
        //     name: cohortDetails?.data?.name || "",
        //     activationStatus: cohortDetails?.data?.activationStatus || "",
        //     cohortStatus: cohortDetails?.data?.cohortStatus || "",
        //     tuitionAmount: cohortDetails?.data?.tuitionAmount || "",
        //     totalCohortFee: cohortDetails?.data?.totalCohortFee || "",
        //     imageUrl: cohortDetails?.data?.imageUrl || "",
        //     startDate: cohortDetails?.data?.startDate || "",
        //     expectedEndDate: cohortDetails?.data?.expectedEndDate || "",
        // })

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



    const dropD: ThreeDotTriggerDropDownItemsProps[] = [
        {id: 'editCohortDropDownItem', name: 'Edit cohort', handleClick: editCohort, sx: ``},
        {id: 'deleteCohortDropDownItem', name: 'Delete cohort', handleClick: ()=> {setOpenDeleteModal(true)}, sx: ``},

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
            <BackButton id={'backToViewAllCohort'} handleClick={() => router.push('/cohort')} text={'Back'} textColor={'#142854'} iconBeforeLetters={true} />
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
            <TableModal
                isOpen={openEditModal}
                closeModal={() => {
                    setOpenEditModal(false)
                }}
                closeOnOverlayClick={true}
                headerTitle='Edit Cohort'
                className='pb-1'
                icon={Cross2Icon}

            >
                {/* <EditCohortForm setIsOpen={()=>{setOpenEditModal(false)}} cohortDetail={details}/> */}
                <EditCohortForm setIsOpen={()=>{setOpenEditModal(false)}} isEdit={true}/>
            </TableModal>
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
            </DeleteModal>
            <UnderlineTab defaultTab={'Details'} tabTriggers={tabTriggers} tabValue={tab}/>

        </div>
    );
};

export default CohortDetails;