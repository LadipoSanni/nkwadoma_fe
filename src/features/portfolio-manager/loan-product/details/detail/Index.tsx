"use client"
import React from "react";
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import {ThreeTabs} from "@/reuseable/tabs/ThreeTabs";
import { useGetLoanProductDetailsByIdQuery } from "@/service/admin/loan_product";
import {formatAmount} from "@/utils/Format";
import { MdOutlineInventory2 } from "react-icons/md";
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";



const Details = () => {

    const loanProductId = sessionStorage.getItem("LoanProductId") ?? undefined;
    const { data: loanProduct, isLoading:loading } = useGetLoanProductDetailsByIdQuery({loanProductId: loanProductId})


    const handleDropdownClick = ()=>{}


    const tagButtonData: { tagIcon: React.ElementType; tagCount: string | number; tagButtonStyle: string; tagText: string; }[] = [
        // {tagIcon: MdPersonOutline, tagCount: details?.programName, tagButtonStyle: "bg-warning50", tagText: ""},
        // {tagIcon: FiBook, tagCount: details?.numberOfLoanees, tagButtonStyle: "bg-lightBlue100", tagText: "Loanees"},
    ];

    const dataList = [
        { label: "Fund product", value: loanProduct?.data.investmentVehicleName },
        { label: "Product sponsor", value: loanProduct?.data.sponsor},
        { label: "Product size ", value: formatAmount(loanProduct?.data.loanProductSize)},
        { label: "Tenor", value: loanProduct?.data.tenor + " months" },
        { label: "Minimum repayment amount", value: formatAmount(loanProduct?.data.minRepaymentAmount)},
        { label: "Interest rate", value: loanProduct?.data.interestRate },
        { label: "Obligor limit", value: formatAmount(loanProduct?.data.obligorLoanLimit)},
        { label: "Moratorium", value: loanProduct?.data.moratorium + " months" },
        { label: "Amount disbursed", value: formatAmount(loanProduct?.data.totalAmountDisbursed)},
        { label: "Amount repaid ", value: formatAmount(loanProduct?.data.totalAmountRepaid)},
        { label: "Amount earned", value: formatAmount(loanProduct?.data.totalAmountEarned)},
        { label: "Cost of vehicle", value: loanProduct?.data.costOfFund + "%" || "0%"},
    ];

    return (
        <>{
            loading? (
                <SkeletonForDetailPage/>
            ): (
                <div className={`py-2 flex md:flex-row flex-col md:justify-between`} id={`sections`}>
                    <div id={`firstSection`}>
                        <DetailsImageSection imageSrc={loanProduct?.data.imageUrl} cohortTitle={loanProduct?.data.name}
                                             cohortDescription={loanProduct?.data.mandate}
                                             handleDropdownClicked={handleDropdownClick}
                                             buttonText={"Edit Cohort"} tagButtonData={tagButtonData}
                                             isEditButton={false}
                                             icon={MdOutlineInventory2}
                        />
                    </div>
                    <div className={`md:w-6/12 min-w-sm md:pt-0 h-`} id={`secondSection`}>
                        <ThreeTabs
                            isTable={false} isNotTableDataList={loanProduct?.data.termsAndCondition} dataList={dataList}
                            tabTitle1={"Product details"} tabTitle2={"Terms and conditions"}
                            useBreakdown={false}/>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default Details;