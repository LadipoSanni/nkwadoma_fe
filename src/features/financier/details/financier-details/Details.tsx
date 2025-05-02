'use client'
import React from 'react';
import { inter, cabinetGroteskMediumBold} from "@/app/fonts";
import styles from "@/features/portfolio-manager/fund/fundDetails/financiers/financier-details/index.module.css"
import {useAppSelector} from "@/redux/store";
import { useViewFinancierDetailQuery } from '@/service/admin/financier';
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import { getInitial } from '@/utils/GlobalMethods';
import { formatAmount } from '@/utils/Format';

const FinancierDetails = () => {
    const currentFinancierId = useAppSelector(state => (state.financier.activeAndInvitedFinancierId))

    const  {data, isLoading} = useViewFinancierDetailQuery({financierId:currentFinancierId},{skip : !currentFinancierId})

    const initial = getInitial(data?.data?.firstName ,data?.data?.lastName);
    const companyInitial = getInitial(data?.data?.organizationName )


    const basicDetails = [
        { label: 'Financier type', value: <span className={`${data?.data?.financierType ===  "INDIVIDUAL" ? 'text-[#66440A] bg-[#FEF6E8]' : 'text-[#142854] bg-[#EEF5FF]'} rounded-[32px] p-2 h-5`}>{capitalizeFirstLetters(data?.data?.financierType)}</span>},
        {label: 'phone number', value:  data?.data?.phoneNumber ?? "Not provided"},
        {label: 'Address', value: data?.data?.address ?? "Not provided"},
        {label: 'Organization admin name', value: data?.data?.firstName  + " " +  data?.data?.lastName },
        {label: 'Organization admin email address', value: data?.data?.email ?? "Not provided"},
        // {label: 'Organization admin phone number', value:  ``?? "Not provided"},
        {label: 'No. of investments', value: data?.data?.totalNumberOfInvestment ?? `Not provided`},
        {label: 'Total amount invested', value:  formatAmount(data?.data?.totalNumberOfInvestment) ?? `Not provided`},
        {label: 'Total income earned', value: formatAmount(data?.data?.totalIncomeEarned) ?? `Not provided`},
        {label: 'Portfolio value', value: formatAmount(data?.data?.portfolioValue) ?? `Not provided`},

    ]



    return (
        <>
            {isLoading ? (<SkeletonForDetailPage/>) : (
                <div id={'financierDetailsPage'}
                     data-testid={'financierDetailsPage'}
                     className={` w-full md:w-full h-full md:h-fit  grid gap-2 md:grid md:gap-8 px-4 py-2  md:px-8 md:py-4`}
                >
                    <div
                        id={'financierDetailsPageContainer'}
                        data-testid={'financierDetailsPageContainer'}
                        className={` md:flex md:justify-between grid gap-4 md:h-full md:w-full   w-full h-full  `}
                    >
                        <div>

                            <div
                                className={` ${cabinetGroteskMediumBold.className} md:text-[28px] w-32 h-32 md:w-20 md:h-20 text-[#885A3C]  flex bg-[#F6F6F6] rounded-full justify-center items-center`}>
                                {data?.data?.organizationName === null? initial : companyInitial}
                            </div>
                            <div
                                className={`grid gap-2 mt-4`}
                            >
                                <div id={'financierName'}
                                     data-testid={'financierName'}
                                     className={`${cabinetGroteskMediumBold.className} text-black text-xl md:text-[28px]  `}>
                                    {data?.data?.organizationName === null? data?.data?.firstName  + " " +  data?.data?.lastName : data?.data?.organizationName}
                                </div>
                                <span id={'financierEmail'}
                                      data-testid={'financierEmail'}
                                      className={`${inter.className} text-sm text-black400`}>
                            {data?.data?.email}
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
                                <div className={`bg-grey105 ${styles.container} min-h-[45vh] md:h-[48vh]  overflow-x-hidden md:overflow-y-auto`}>
                                    {basicDetails.map((item, index) => (
                                        <li key={"key" + index} className={'p-4  grid gap-4 rounded-md'}>
                                            <div
                                                className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-9 '}>
                                                <div className={` ${inter.className}text-black300 md:text-black300 md:text-[14px] text-[14px] `}>{item.label}</div>
                                                <div
                                                    className={` ${inter.className}  md:max-w-[40%] md:text-[14px] md:text-black500  md:break-all break-all text-black500 text-[14px] `}> {item?.value } </div>
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

export default FinancierDetails;
