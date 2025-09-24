'use client'
import BackButton from '@/components/back-button';
import React from 'react';
import {useRouter} from "next/navigation";
import CircleThreeDot from "@/reuseable/Dropdown/CircleThreeDot";
import {ThreeDotTriggerDropDownItemsProps} from "@/types/Component.type";
import UnderlineTab from "@/components/UnderlineTab";
import DetailsComponent from "@/features/cohort/details/DetailsComponent";
import {useAppSelector} from "@/redux/store";
import {useViewCohortDetailsQuery} from "@/service/admin/cohort_query";
import {LoaneeInCohortView} from "@/features/cohort/cohort-details/LoaneeInCohortView/Index";
import GraduatedLoanee from "@/features/cohort/details/GraduatedLoanee";
import EditCohortForm from "@/components/cohort/EditCohortForm";
import {Cross2Icon} from "@radix-ui/react-icons";
import TableModal from "@/reuseable/modals/TableModal";

const CohortDetails = () => {
    const router = useRouter();
    const cohortId = useAppSelector(store => store?.cohort?.setCohortId)
    const selectedCohortInOrganization = useAppSelector(store => store?.cohort?.selectedCohortInOrganization)

    const selectedCohortInOrganizationType = useAppSelector(store => store?.cohort?.selectedCohortInOrganizationType)

    const {data: cohortDetails} = useViewCohortDetailsQuery({
        cohortId: cohortId
    }, {refetchOnMountOrArgChange: true});
    console.log('current cohort details ', cohortDetails);

    const [openEditModal, setOpenEditModal] = React.useState(false);

    const [details, setDetails] = React.useState({
        id: "",
        programId: "",
        organizationId: "",
        cohortDescription: "",
        name: "",
        activationStatus: "",
        cohortStatus: "",
        tuitionAmount: 0,
        totalCohortFee: 0,
        imageUrl: "",
        startDate: "",
        expectedEndDate: "",
    })

    // console.log('cohortDetails: ', cohortDetails)
    const editCohort = ( ) => {
        console.log('trying to edit cohort');
        setOpenEditModal(true);
        console.log('current cohort details ', cohortDetails);
        setDetails({
            id: cohortDetails?.data?.id || "",
            programId: cohortDetails?.data?.programId || "",
            organizationId: cohortDetails?.data?.organizationId || "",
            cohortDescription: cohortDetails?.data?.cohortDescription || "",
            name: cohortDetails?.data?.name || "",
            activationStatus: cohortDetails?.data?.activationStatus || "",
            cohortStatus: cohortDetails?.data?.cohortStatus || "",
            tuitionAmount: cohortDetails?.data?.tuitionAmount || "",
            totalCohortFee: cohortDetails?.data?.totalCohortFee || "",
            imageUrl: cohortDetails?.data?.imageUrl || "",
            startDate: cohortDetails?.data?.startDate || "",
            expectedEndDate: cohortDetails?.data?.expectedEndDate || "",
        })
        console.log('openEditMODAL', openEditModal)
        console.log('details', details)
    }

    const deleteCohort = ( ) => {

    }

    const dropD: ThreeDotTriggerDropDownItemsProps[] = [
        {id: 'editCohortDropDownItem', name: 'Edit cohort', handleClick: editCohort, sx: ``},
        {id: 'deleteCohortDropDownItem', name: 'Delete cohort', handleClick: deleteCohort, sx: ``},

    ]

    const tabTriggers: {name: string; id: string,value: string}[] = [
        {name: 'Details', id: 'details',value: 'details'},
        {name: 'Loanee', id: 'loanees',value: 'loanee'},

    ]
    const tab:  {name: string; displayValue: React.ReactNode}[] = [
        {name: 'details',  displayValue: <DetailsComponent/>},
        {name: 'loanee',  displayValue: selectedCohortInOrganizationType === 'GRADUATED' ? <GraduatedLoanee/> : <LoaneeInCohortView cohortFee={cohortDetails?.data?.tuitionAmount}/>
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
                <span id={'cohortName'}
                      data-testid={'cohortName'}
                      className={` text-[28px] break-all mr-2  text-black `}
                >{cohortDetails?.data?.name}</span>
                <CircleThreeDot
                    id={'editAndDeleteCohort'}
                    dotDisplay={'vertical'}
                    isDisabled={false}
                    dropDownItems={dropD}
                />
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
                <EditCohortForm setIsOpen={()=>{setOpenEditModal(false)}} cohortDetail={details}/>

            </TableModal>
            <UnderlineTab defaultTab={'details'} tabTriggers={tabTriggers} tabValue={tab}/>

        </div>
    );
};

export default CohortDetails;