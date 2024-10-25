"use client"
import React from "react";
import Details from "@/reuseable/details/Details";
import CohortDetailsImage from "../../../../../public/asset/Image/CohortDetailsImage.png"
import {useRouter} from "next/navigation";

const CohortDetails = () => {
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

    const router = useRouter();
    const handleBackClick = () => {
        router.push('/cohort')
    }
    return (

        <Details
            imageSrc={CohortDetailsImage.src}
            // icon={MdBook}
            cohortTitle="Luminary"
            cohortDescription="Design thinking is a process for creative problem solving. Design thinking has a human-centered core. It encourages organizations to focus on the people they're creating for, which leads to better products, services, and internal processes."
            traineesCount={50}
            dropoutsCount={10}
            dataList={dataList}
            breakDown={breakDown}
            goBackText={"Back to Cohort"}
            handleBackClick={handleBackClick}/>
    );
}
export default CohortDetails;