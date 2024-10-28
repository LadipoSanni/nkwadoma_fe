"use client"
import React from "react";
import {useRouter} from "next/navigation";
import {CiLaptop} from "react-icons/ci";
import {inter} from "@/app/fonts";
import CohortDetailsImage from "../../../../../public/asset/Image/CohortDetailsImage.png"
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
const CohortDetails = () =>{
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

    const router = useRouter();
    const handleBackClick =() =>{
        router.push('/cohort')
    }
    return (
        <main  className={`${inter.className}  gap-8 md:p-6 p-4 flex md:flex-row md:justify-between flex-col `}>
            <DetailsImageSection imageSrc={CohortDetailsImage.src} cohortTitle={"Luminary"}
                    cohortDescription="Design thinking is a process for creative problem solving. Design thinking has a human-centered core. It encourages organizations to focus on the people they're creating for, which leads to better products, services, and internal processes."
                    tagCount={50} tagText={"trainee"} tagButtonIcon={CiLaptop} tagButtonStyle={`bg-meedlYellow`}
                                 goBackText={"Back to Cohort"}
                                 handleBackClick={handleBackClick}
            />
            <DetailsTabContainer dataList={dataList} breakDown={breakDown}/>
        </main>
    );
}
export default CohortDetails;