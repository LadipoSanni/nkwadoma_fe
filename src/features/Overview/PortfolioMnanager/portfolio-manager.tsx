import React,{useEffect} from 'react';
import styles from '@/features/Overview/index.module.css';
import PortfolioManagerOverviewCard from "@/reuseable/cards/portfoliomanagerOverview/PortfolioManagerOverviewCard";
import Barcharts from "@/features/Overview/PortfolioMnanager/Barcharts";
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";
import {useRouter} from "next/navigation";
import {store} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem} from "@/redux/slice/layout/adminLayout";
import {useViewMeedlPortfolioQuery} from "@/service/admin/overview";
import {setCurrentTab, setCurrentTabStatus} from "@/redux/slice/loan/selected-loan";
import { resetAll,clearSaveCreateInvestmentField} from '@/redux/slice/vehicle/vehicle';
import SkeletonForGrid from '@/reuseable/Skeleton-loading-state/Skeleton-for-grid';

const PortfolioManager = () => {

    const router = useRouter();
    const {data, isFetching, isLoading } = useViewMeedlPortfolioQuery({})
    const cardData1 = [
        {title: `Total investment vehicles`, amount: `${data?.data?.totalNumberOfInvestmentVehicle ? data?.data?.totalNumberOfInvestmentVehicle?.toString() : '0'}`,},
        {title: `${Number(data?.data?.totalNumberOfCommercialFundsInvestmentVehicle) > 1 ? `Commercial funds` : `Commercial fund`}`, amount: `${data?.data?.totalNumberOfCommercialFundsInvestmentVehicle ? data?.data?.totalNumberOfCommercialFundsInvestmentVehicle?.toString() : '0'}`,showIcon: true},
        {title: `${Number(data?.data?.totalNumberOfEndowmentFundsInvestmentVehicle) > 1  ? `Endowment funds` : `Endowment fund`}`, amount: `${data?.data?.totalNumberOfEndowmentFundsInvestmentVehicle ? data?.data?.totalNumberOfEndowmentFundsInvestmentVehicle?.toString() : '0'}`,showIcon: true},
    ]

    const cardData2 = [
        {title: "Total number of financiers", amount: `${data?.data?.totalNumberOfFinancier ?data?.data?.totalNumberOfFinancier?.toString() : '0'}`,},
        {title: `${Number(data?.data?.totalNumberOfIndividualFinancier) > 1 ? `Individuals` : `Individual`} `, amount: `${data?.data?.totalNumberOfIndividualFinancier ? data?.data?.totalNumberOfIndividualFinancier?.toString() : '0'}`,showIcon: true},
        {title: `${Number(data?.data?.totalNumberOfInstitutionalFinancier) > 1 ? `Corporates` : `Corporate`}`, amount: `${data?.data?.totalNumberOfLoans ? data?.data?.totalNumberOfInstitutionalFinancier?.toString() : '0'}`,showIcon: true},
    ]
    const cardData3 = [
        {title: "Total number of loans", amount: `${data?.data?.totalNumberOfLoans ? data?.data?.totalNumberOfLoans?.toString() : '0'}`,},
    ]

    // const SecondChartData = [
    //     { month: "Jan", value: 186, },
    //     { month: "Feb", value: 505,  },
    //     { month: "March", value: 237, },
    //     { month: "April", value: 73, },
    //     { month: "May", value: 209,  },
    //     { month: "June", value: 214,  },
    // ]
    //
    // const thirdChartData = [
    //     { month: "Jan", value: 186, },
    //     { month: "Feb", value: 305,  },
    //     { month: "March", value: 237, },
    //     { month: "April", value: 73, },
    //     { month: "May", value: 209,  },
    //     { month: "June", value: 214,  },
    //     { month: "july", value: 73, },
    //     { month: "August", value: 209,  },
    //     { month: "September", value: 214,  },
    // ]

     useEffect(() => {
         store.dispatch(resetAll())
         store.dispatch(clearSaveCreateInvestmentField())
     },[])

    const loanData = [
        {title: "Loan referrals", amount: `${ data?.data?.loanReferralPercentage ? Math.round(Number(data?.data?.loanReferralPercentage?.toString()))  : '0'}`,textColor: 'text-[#66440A]',bgColor: 'bg-[#FEF6E8]',},
        {title: "Loan offers", amount:  `${ data?.data?.loanOfferPercentage ? Math.round(Number(data?.data?.loanOfferPercentage?.toString()))  : '0'}`,textColor: 'text-[#142854]',bgColor: 'bg-[#D9EAFF]',},
        {title: "Disbursed loans", amount: `${ data?.data?.loanDisbursalPercentage ? Math.round(Number(data?.data?.loanDisbursalPercentage?.toString()))  : '0'}`,textColor: 'text-[#0e4c23]',bgColor: 'bg-[#E6F2EA]',},

    ]

    const routeToInvestmentVehicle = () => {
        store.dispatch(setCurrentNavBottomItem('Investment vehicle'))
        store.dispatch(setCurrentNavbarItem('Investment vehicle'))
        router.push('/vehicle/commercial-vehicle')
    }


    const routeToFinancier = () => {
        store.dispatch(setCurrentNavBottomItem('Financier'))
        store.dispatch(setCurrentNavbarItem('Financier'))
        router.push('/financier')

    }


    const routeToLoans = () => {
        store.dispatch(setCurrentNavBottomItem('Loan'))
        store.dispatch(setCurrentNavbarItem('Loan'))
        store.dispatch(setCurrentTab('Loan requests'))
        store.dispatch(setCurrentTabStatus('LOAN_REQUEST'))
        router.push('/loan/loan-request')
    }

    return (
        <div>

     { isLoading || isFetching ? <div className='py-2'><SkeletonForGrid/></div> : 
        <div className={` pl-3 pt-8 w-full  h-[84vh]  ${styles.container} `}>
           <section className={`  mb-6  flex gap-4  overflow-scroll ${styles.overviewCard} `}>
               <PortfolioManagerOverviewCard isFetching={isFetching} isLoading={isLoading} id={'vehicleCard'} cardData={cardData1} clickView={routeToInvestmentVehicle}/>
               <PortfolioManagerOverviewCard isFetching={isFetching} isLoading={isLoading} id={'vehicleCard2'} cardData={cardData2} clickView={routeToFinancier}/>
               <PortfolioManagerOverviewCard isFetching={isFetching} isLoading={isLoading} loanData={loanData}  isLoanData={true} id={'vehicleCard3'} cardData={cardData3} clickView={routeToLoans}/>
           </section>
               <div className={`  w-full md:w-full pb-4  `}>
                   <Barcharts/>
               </div>
               <div className={`  w-full grid sm:grid   xl:flex lg:flex md:flex  pb-4 gap-6 `}>
                   <PerformanceCard id={'ownership'}  isSmall={true} showContainerBorder={true} percentage={'0'} showPerformancePercentage={true} maxWidth={'50%'} title={'Net AUM return'} value={0} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
                   <PerformanceCard id={'netLoanPortfolioReturn'} isSmall={true} showContainerBorder={true} percentage={'0'} showPerformancePercentage={true} maxWidth={'50%'} title={'Net loan portfolio return'} value={0} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
               </div>
               <div className={` w-full grid  md:flex pb-4 gap-6 `}>
                   <PerformanceCard id={'totalCustodianTrusteeFee'}  isSmall={true} showContainerBorder={true} percentage={'0'} showPerformancePercentage={false} maxWidth={'50%'} title={'Total custodian/trustee fee'} value={0} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
                   <PerformanceCard id={'ownership'} isSmall={true} showContainerBorder={true} percentage={'0'} showPerformancePercentage={false} maxWidth={'50%'} title={'Total fund manager fee'} value={0} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
               </div>
           {/*</div>*/}
       </div>
       } 
       </div>
    );
};

export default PortfolioManager;