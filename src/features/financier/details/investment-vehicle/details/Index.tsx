'use client'
import React, {useEffect, useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/redux/store";
import {useFinancierVehicleDetailsQuery} from '@/service/admin/financier';
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import { formatAmount } from '@/utils/Format';
import {inter} from "@/app/fonts";
import styles from "@/features/portfolio-manager/fund/fundDetails/financiers/financier-details/index.module.css";
import { MdOutlinePayments} from "react-icons/md";
import InfoCard from "@/reuseable/details/InfoCard";

const FinancierInvestmentVehiclesDetails = () => {
    const financierId = useAppSelector(state => (state.financier.activeAndInvitedFinancierId))
    const financierMode = useAppSelector(state => (state.financier.financierMode))
    const investmentVehicleFinancierId = useAppSelector(state=> (state.financier.financierInvestmentVehicleId))
    const router = useRouter();
    const [statusValue, setStatusValue] = useState("");

    const  {data, isLoading} = useFinancierVehicleDetailsQuery({financierId:financierId, investmentVehicleFinancierId:investmentVehicleFinancierId})



    const navigateToViewAllFinancier = () => {
        if(financierMode === "platform"){
            router.push("/financier");
        }else {
            router.push("/financier/investmentVehicles");
        }
    }

    const status = () => {
        if (data?.data?.couponDistributionStatus !== null) {
            return { value: data?.data?.couponDistributionStatus, type: "coupon" };
        } else if (data?.data?.fundRaisingStatus || data?.data?.deployingStatus) {
            return { value: data?.data?.fundRaisingStatus || data?.data?.deployingStatus, type: "operation" };
        } else {
            return {
                value: data?.data?.vehicleClosureStatus?.recollectionStatus ?? data?.data?.vehicleClosureStatus?.maturity,
                type: "closure",
            };
        }
    };

    // useEffect to update the state based on the status function
    useEffect(() => {
        if (data) {
            const result = status();
            setStatusValue(result.value);
        }
    }, [data,status]);


    const basicDetails = [
        {label: 'Vehicle type', value: <div className={` w-fit h-fit rounded-full px-2 bg-[#EEF5FF] text-[#142854] `}>{capitalizeFirstLetters(data?.data?.investmentVehicleType)}</div>},
        {label: 'Investment start date', value:  data?.data?.startDate ?? "Not provided"},
        {label: 'Date invested', value:  data?.data?.dateInvested ?? "Not provided"},
        {label: 'Total amount invested', value:  formatAmount(data?.data?.amountInvested)},
        {label: 'Maturity date', value: data?.data?.maturityDate ?? "Not provided"},
        {label: 'Income earned', value: formatAmount(data?.data?.incomeEarned) ?? "0"},
        {label: 'Designation', value: data?.data?.designations ?? "Not provided"},
        {label: `Vehicle ${status().type} status`, value:  capitalizeFirstLetters(statusValue) ?? `Not provided`},
        {label: 'Vehicle visibility status', value: capitalizeFirstLetters(data?.data?.investmentVehicleVisibility) ?? 'Not provided'},
    ]


    return (
        <>
            {isLoading ? (<SkeletonForDetailPage/>) : (
                <div id={'financierDetailsPage'}
                     data-testid={'financierDetailsPage'}
                     className={` w-full md:w-full h-full md:h-fit  grid gap-2 md:grid md:gap-8 px-4 py-2  md:px-8 md:py-4`}
                >
                    <BackButton handleClick={navigateToViewAllFinancier} iconBeforeLetters={true} text={"Back to financiers"}
                                id={"backButtonToViewAllFinancier"} textColor={'#142854'}/>

                    <div
                        id={'financierDetailsPageContainer'}
                        data-testid={'financierDetailsPageContainer'}
                        className={` md:flex md:justify-between grid gap-4 md:h-full md:w-full   w-full h-full  `}
                    >
                        <div>

                            {/*<div*/}
                            {/*    className={` ${cabinetGroteskMediumBold.className} md:text-[28px] w-32 h-32 md:w-20 md:h-20 text-[#885A3C]  flex bg-[#FEF6F0] rounded-full justify-center items-center`}>*/}
                            {/*    {data?.data?.organizationName === null? initial : companyInitial}*/}
                            {/*</div>*/}
                            {/*MdOutlinePayments*/}
                            <div
                                className={`grid gap-2 mt-4`}
                            >
                                <InfoCard
                                    icon={MdOutlinePayments}
                                    fundTitle={data?.data?.name}
                                    description={"Net asset value - " + data?.data.netAssetValue}
                                />
                                <span id={'financierEmail'}
                                      data-testid={'financierEmail'}
                                      className={`${inter.className} text-sm text-black400`}>
                            {data?.data?.userIdentity?.email}
                        </span>
                            </div>
                        </div>
                        <div
                            className={` overflow-x-hidden md:w-1/2 w-full border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid `}
                        >
                            <div
                                className={` ${styles.tabConnector} md:w-full pl-1  h-fit md:h-fit  flex md:flex `}

                            >
                            </div>
                            <div className={`px `}>
                                <div
                                    className={`bg-grey105 ${styles.container} min-h-[45vh] md:h-[60vh]  overflow-x-hidden md:overflow-y-auto`}>
                                    {basicDetails.map((item, index) => (
                                        <li key={"key" + index} className={'p-4  grid gap-4 rounded-md'}>
                                            <div
                                                className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-9 '}>
                                                <div
                                                    className={` ${inter.className}text-black300 md:text-black300 md:text-[14px] text-[14px] `}>{item.label}</div>
                                                <div
                                                    className={` ${inter.className}  md:max-w-[40%] md:text-[14px] md:text-black500  md:break-all break-all text-black500 text-[14px] `}> {item?.value} </div>
                                            </div>
                                        </li>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            )}
        </>
    );
};

export default FinancierInvestmentVehiclesDetails;
