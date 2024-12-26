"use client"
import React from "react";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import {FiBook} from "react-icons/fi";
import {ThreeTabs} from "@/reuseable/tabs/ThreeTabs";
import { useGetLoanProductDetailsByIdQuery } from "@/service/admin/loan_product";
import {formatAmount} from "@/utils/Format";


const Details = () => {

    const loanProductId = sessionStorage.getItem("LoanProductId") ?? undefined;
    const { data: loanProduct } = useGetLoanProductDetailsByIdQuery({loanProductId: loanProductId})

    console.log(loanProduct, "This is details")

    const handleDropdownClick = ()=>{}


    const tagButtonData: { tagIcon: React.ElementType; tagCount: string | number; tagButtonStyle: string; tagText: string; }[] = [
        // {tagIcon: MdPersonOutline, tagCount: details?.programName, tagButtonStyle: "bg-warning50", tagText: ""},
        // {tagIcon: FiBook, tagCount: details?.numberOfLoanees, tagButtonStyle: "bg-lightBlue100", tagText: "Loanees"},
    ];

    const dataList = [
        { label: "Fund product", value: loanProduct?.data.name },
        { label: "Product sponsor", value: loanProduct?.data.sponsor },
        { label: "Product size ", value: formatAmount(loanProduct?.data.loanProductSize)},
        { label: "Tenor", value: loanProduct?.data.tenor },
        { label: "Minimum repayment amount", value: formatAmount(loanProduct?.data.minimumRepaymentAmount)},
        { label: "Interest rate", value: loanProduct?.data.interestRate },
        { label: "Obligor limit", value: formatAmount(loanProduct?.data.obligorLimit)},
        { label: "Moratorium", value: loanProduct?.data.moratorium },
        { label: "Amount disbursed", value: formatAmount(loanProduct?.data.amountDisbursed)},
        { label: "Amount repaid ", value: formatAmount(loanProduct?.data.amountRepaid)},
        { label: "Amount earned", value: formatAmount(loanProduct?.data.amountEarned)},
        { label: "Cost of funds", value: formatAmount(loanProduct?.data.costOfFunds)},
    ];

    return (
        <div className={`py-1 flex md:flex-row flex-col md:justify-between`} id={`sections`}>
            <div id={`firstSection`}>
                <DetailsImageSection imageSrc={loanProduct?.data.imageUrl} cohortTitle={loanProduct?.data.name}
                                     cohortDescription={loanProduct?.data.mandate}
                                     handleDropdownClicked={handleDropdownClick}
                                     buttonText={"Edit Cohort"} tagButtonData={tagButtonData}
                                     isEditButton={false}
                                     icon={FiBook}
                />
            </div>
            <div className={`md:w-6/12 min-w-sm md:pt-0 h-[96%]`} id={`secondSection`}>
                <ThreeTabs
                    isTable={false} isNotTableDataList={loanProduct?.data.loanProductTermsAndCondition} dataList={dataList}
                                     tabTitle1={"Product details"} tabTitle2={"Loan terms and conditions"} tabTitle3={"Loan disbursement terms"}
                                     useBreakdown={false} dataList3={loanProduct?.data.loanDisbursementTerms}/>
            </div>
        </div>
    );
}

export default Details;