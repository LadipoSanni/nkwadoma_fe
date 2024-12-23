"use client"
import React from "react";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import {FiBook} from "react-icons/fi";
import {ThreeTabs} from "@/reuseable/tabs/ThreeTabs";
import image from '../../../../../../public/asset/Image/CohortDetailsImage.png'
import { useGetLoanProductDetailsByIdQuery } from "@/service/admin/loan_product";


const Details = () => {

    const loanProductId = sessionStorage.getItem("LoanProductId") ?? undefined;
    const { data: loanProduct } = useGetLoanProductDetailsByIdQuery({loanProductId: loanProductId})
    const handleDropdownClick = ()=>{}


    const tagButtonData: { tagIcon: React.ElementType; tagCount: string | number; tagButtonStyle: string; tagText: string; }[] = [
        // {tagIcon: MdPersonOutline, tagCount: details?.programName, tagButtonStyle: "bg-warning50", tagText: ""},
        // {tagIcon: FiBook, tagCount: details?.numberOfLoanees, tagButtonStyle: "bg-lightBlue100", tagText: "Loanees"},
    ];

    const dataList = [
        { label: "Fund product", value: 0 },
        { label: "Product sponsor", value: "2024-01-01" },
        { label: "Product size ", value: "2024-01-01" },
        { label: "Tenor", value: "2024-01-01" },
        { label: "Minimum repayment amount", value: "2024-01-01" },
        { label: "Interest rate", value: "2024-01-01" },
        { label: "Obligor limit", value: "2024-01-01" },
        { label: "Moratorium", value: "2024-01-01" },
        { label: "Amount disbursed", value: "2024-01-01" },
        { label: "Amount repaid ", value: "2024-01-01" },
        { label: "Amount earned", value: "2024-01-01" },
        { label: "Cost of funds", value: "2024-01-01" },
        { label: "Bank partner", value: "2024-01-01" },
        { label: "Credit life insurance provider", value: "2024-01-01" },
        { label: "Health insurance provider", value: "2024-01-01" },
    ];

    const loanDetail = [
        { detail: "Loan Amount", value: "This is Loan terms and conditions" },
    ];

    const dataList3 = [
        { label: "Disbursement Term 2", value: "This is loan disbursment terms"},
    ]

    const description = "DisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursement" +
        "DisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursement" +
        "DisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursement" +
        "DisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursementDisbursement"
    return (
        <div className={`py-1 flex md:flex-row flex-col md:justify-between`} id={`sections`}>
            <div id={`firstSection`}>
                <DetailsImageSection imageSrc={image} cohortTitle={"details"}
                                     cohortDescription={description}
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