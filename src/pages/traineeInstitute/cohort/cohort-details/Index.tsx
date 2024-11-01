"use client"
import React from "react";
import {useRouter} from "next/navigation";
import {CiLaptop} from "react-icons/ci";
import {inter} from "@/app/fonts";
import CohortDetailsImage from "../../../../../public/asset/Image/CohortDetailsImage.png"
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import { MdOutlinePerson } from "react-icons/md";
import {BiArrowBack} from "react-icons/bi";
import {CohortTraineeData} from "@/utils/cohort/cohortDetails/Index";
import TableModal from "@/reuseable/modals/TableModal";
import {Cross2Icon} from "@radix-ui/react-icons";
import {DeleteCohort} from "@/reuseable/details/deleteCohort";
import EditCohortForm from "@/components/cohort/EditCohortForm";


const CohortDetails = () =>{
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isEditOpen, setEditOpen] = React.useState(false);
    const id = "1";

    const dataList = [
        { label: "Start Date", value: "13, Dec 2023" },
        { label: "End Date", value: "15, Jan 2024" },
        { label: "Cohort status", value: "10" },
        { label: "Number of Dropouts", value: "10" },
        { label: "Dropout rate", value: "0.5%" },
        { label: "Number employed", value: "38" },
        { label: "Employment rate", value: "38%" },
        { label: "Average starting salary", value: "3,000,000.00" },
        { label: "Total amount disbursed", value: "3,000,000.00" },
        { label: "Total amount repaid", value: "3,000,000.00" },
        { label: "Total amount outstanding", value: "3,000,000.00" },
        { label: "Repayment rate", value: "70%" },
        { label: "Tuition amount", value: "3,500,000.00" },
    ];

    const breakDown = [
        { title: "Tuition", amount: "200,000,000.00" },
        { title: "Device", amount: "600,000,000.00" },
        { title: "Accommodation", amount: "200,000,000.00" },
        { title: "Feeding", amount: "200,000.00" },
        { title: "Total", amount: "300,500,000.00" },
    ];

    const program1Options = [
        { name: 'Edit Cohort', id: '1' },
        CohortTraineeData.length > 0
            ?
                { name: 'Refer Cohort', id: '2' }
            :
                { name: 'Delete Cohort', id: '3' },
    ]


    const tagButtonData = [
        { tagIcon: CiLaptop, tagCount: 10, tagButtonStyle: "bg-lightBlue100", tagText: "trainees" },
        { tagIcon: MdOutlinePerson, tagCount: 50, tagButtonStyle: "bg-warning50", tagText: "cohorts" },
    ];


    const router = useRouter();
    const handleBackClick =() =>{
        router.push('/cohort')
    }

    const handleDropdownClick =(id: string) =>{
          if(id === "1") {
              setEditOpen(true)
          } else if(id === "2") {
              // setIsOpen(true)
          } else {
              setIsDeleteOpen(true)
          }
    }

    const description= "Design thinking is a process for creative problem solving." +
        "Design thinking has a human-centered core. It encourages organizations to focus on " +
        "thepeople they're creating for, which leads to better products, services, and internal processes."

        return (
        <main className={`${inter.className}  py-2 md:px-8 px-2 w-fit md:w-full`}>
            <div className={`flex cursor-pointer py-2 px-2 space-x-1 text-meedlBlue`} id={`backClick`}
                 data-testid={`backClick`} onClick={handleBackClick}>
                <BiArrowBack className={`mt-1`}/>
                <h1 id={`backClickText`} data-testid={`backClickText`}>Back to cohort</h1>
            </div>

            <div className={`p- flex md:flex-row flex-col md:justify-between`}>
                <div>
                    <DetailsImageSection imageSrc={CohortDetailsImage.src} cohortTitle={"Luminary"}
                         cohortDescription={description}
                         dropdownOption={program1Options} handleDropdownClicked={handleDropdownClick}
                         useProgramButton={false} tagButtonData={tagButtonData}/>
                </div>

                <div className={`md:w-6/12 pt- md:pt-0 h-[96%]`}>
                    <DetailsTabContainer dataList={dataList} breakDown={breakDown}/>
                </div>
            </div>
            <div>
                <TableModal
                 isOpen={isDeleteOpen}
                 closeModal={() => setIsDeleteOpen(false)}
                 closeOnOverlayClick={true}
                 icon={Cross2Icon}

                >
                    <DeleteCohort  setIsOpen={()=>setIsDeleteOpen(false)}/>
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
                        <EditCohortForm cohortId={id} setIsOpen={()=> setEditOpen(false)}/>
                    </TableModal>
                </div>
        </main>
        );
}
export default CohortDetails;