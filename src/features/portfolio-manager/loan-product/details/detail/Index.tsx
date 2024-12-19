"use client"
import React from "react";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import {FiBook} from "react-icons/fi";
import {ThreeTabs} from "@/reuseable/tabs/ThreeTabs";
import image from '../../../../../../public/asset/Image/CohortDetailsImage.png'


const Details = () => {

    const handleDropdownClick = ()=>{

    }


    const tagButtonData = [
        // {tagIcon: MdPersonOutline, tagCount: details?.programName, tagButtonStyle: "bg-warning50", tagText: ""},
        // {tagIcon: FiBook, tagCount: details?.numberOfLoanees, tagButtonStyle: "bg-lightBlue100", tagText: "Loanees"},
    ];

    const dataList = [ { label: "Cohort Name", value: "Cohort A" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
        { label: "Start Date", value: "2024-01-01" },
    ];

    const loanDetail = [ { detail: "Loan Amount", value: "50000" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
        { detail: "Interest Rate", value: "5%" },
    ];
    const dataList3 = [ { label: "Disbursement Term 1", value: "Term 1 Description" },
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
        { label: "Disbursement Term 2", value: "Term 2 Description"},
    ]
    return (
        <div className={`py-1 flex md:flex-row flex-col md:justify-between`} id={`sections`}>
            <div id={`firstSection`}>
                <DetailsImageSection imageSrc={image} cohortTitle={"details"}
                                     cohortDescription={"detailsfghggruuei"}
                                     handleDropdownClicked={handleDropdownClick}
                                     buttonText={"Edit Cohort"} tagButtonData={tagButtonData}
                                     isEditButton={false}
                                     icon={FiBook}
                />
            </div>
            <div className={`md:w-6/12 min-w-sm md:pt-0 h-[96%]`} id={`secondSection`}>
                <ThreeTabs
                    isTable={false} isNotTableDataList={loanDetail} dataList={dataList}
                                     tabTitle1={"Product details"} tabTitle2={"Loan terms and conditions"} tabTitle3={"Loan disbursement terms"}
                                     useBreakdown={false} dataList3={dataList3}/>
            </div>
        </div>
    );
}

export default Details;