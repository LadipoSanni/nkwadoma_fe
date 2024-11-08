"use client"
import React from "react";
import {useRouter} from "next/navigation";
import { FiBook } from "react-icons/fi";
import {inter} from "@/app/fonts";
import CohortDetailsImage from "../../../../../public/asset/Image/CohortDetailsImage.png"
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import { MdPersonOutline } from "react-icons/md";
import {BiArrowBack} from "react-icons/bi";
import {traineeData} from "@/utils/cohort/trainee-details-mock-data/Index";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import {DeleteCohort} from "@/reuseable/details/DeleteCohort";
import EditCohortForm from "@/components/cohort/EditCohortForm";

const CohortDetails = () => {
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isEditOpen, setEditOpen] = React.useState(false);
    const id = "1";

    const dataList = [
        {label: "Start Date", value: "13, Dec 2023"},
        {label: "End Date", value: "15, Jan 2024"},
        {label: "Cohort status", value: "10"},
        {label: "Number of Dropouts", value: "10"},
        {label: "Dropout rate", value: "0.5%"},
        {label: "Number employed", value: "38"},
        {label: "Employment rate", value: "38%"},
        {label: "Average starting salary", value: "3,000,000.00"},
        {label: "Total amount disbursed", value: "3,000,000.00"},
        {label: "Total amount repaid", value: "3,000,000.00"},
        {label: "Total amount outstanding", value: "3,000,000.00"},
        {label: "Repayment rate", value: "70%"},
        {label: "Tuition amount", value: "3,500,000.00"},
    ];

    const breakDown = [
        {title: "Tuition", amount: "200,000,000.00"},
        {title: "Device", amount: "600,000,000.00"},
        {title: "Accommodation", amount: "200,000,000.00"},
        {title: "Feeding", amount: "200,000.00"},
        {title: "Total", amount: "300,500,000.00"},
    ];

    const program1Options = [
        {name: 'Edit Cohort', id: '1'},
        traineeData.length > 0
            ?
            {name: 'Refer Cohort', id: '2'}
            :
            {name: 'Delete Cohort', id: '3'},
    ]


    const tagButtonData = [
        {tagIcon: FiBook, tagCount: 10, tagButtonStyle: "bg-lightBlue100", tagText: "trainees"},
        {tagIcon: MdPersonOutline, tagCount: 50, tagButtonStyle: "bg-warning50", tagText: "cohorts"},
    ];


    const router = useRouter();
    const handleBackClick = () => {
        router.push('/cohort')
    }

    const handleDropdownClick = (id: string) => {
        if (id === "1") {
            setEditOpen(true)
        } else if (id === "2") {
            // setIsOpen(true)
        } else {
            setIsDeleteOpen(true)
        }
    }

    const description = "Design thinking is a process for creative problem solving." +
        "Design thinking has a human-centered core. It encourages organizations to focus on " +
        "thepeople they're creating for, which leads to better products, services, and internal processes."

    return (
        <main className={`${inter.className}  py-3 md:px-10 px-3 w-full`}>
            <div className={`flex cursor-pointer py-2 space-x-1 text-meedlBlue`} id={`backClick`}
                 data-testid={`backClick`} onClick={handleBackClick}>
                <BiArrowBack className={`mt-1`}/>
                <h1 id={`backClickText`} data-testid={`backClickText`}>Back to cohort</h1>
            </div>

            <div className={`py-3 flex md:flex-row flex-col md:justify-between`}>
                <div>
                    <DetailsImageSection imageSrc={CohortDetailsImage.src} cohortTitle={"Luminary"}
                                         cohortDescription={description}
                                         dropdownOption={program1Options} handleDropdownClicked={handleDropdownClick}
                                         buttonText={"Edit Cohort"} tagButtonData={tagButtonData}/>
                </div>

                <div className={`md:w-6/12 pt-8 md:pt-0 h-[96%]`}>
                    <DetailsTabContainer dataList={dataList} breakDown={breakDown} tabTitle1={"cohort details"}
                                         tabTitle2={"trainee"} useBreakdown={true} />
                </div>
            </div>
            <div>
                <TableModal
                    isOpen={isDeleteOpen}
                    closeModal={() => setIsDeleteOpen(false)}
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    width="auto"
                >
                    <DeleteCohort setIsOpen={() => setIsDeleteOpen(false)} headerTitle={"Delete cohort"}
                                  title={"cohort"}/>
                </TableModal>
            </div>

            <div className={`md:max-w-sm w-full`}>
                <TableModal
                    isOpen={isEditOpen}
                    closeModal={() => setEditOpen(false)}
                    closeOnOverlayClick={true}
                    headerTitle={`Edit Cohort`}
                    icon={Cross2Icon}
                >
                    <EditCohortForm cohortId={id} setIsOpen={() => setEditOpen(false)}/>
                </TableModal>
            </div>
        </main>
    );
}
export default CohortDetails;