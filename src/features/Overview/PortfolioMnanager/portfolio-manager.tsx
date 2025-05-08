import React from 'react';
import styles from "../index.module.css"
import PortfolioManagerOverviewCard from "@/reuseable/cards/portfoliomanagerOverview/PortfolioManagerOverviewCard";
import Barcharts from "@/features/Overview/PortfolioMnanager/Barcharts";
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";
import {useRouter} from "next/navigation";
import {store} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem} from "@/redux/slice/layout/adminLayout";
import {useViewMeedlPortfolioQuery} from "@/service/admin/overview";

const PortfolioManager = () => {

    const router = useRouter();
    const {data, isFetching, isLoading } = useViewMeedlPortfolioQuery({})
    // console.log('data: ', data)
    const cardData1 = [
        {title: "Total investment vehicles", amount: data?.data?.totalNumberOfInvestmentVehicle?.toString(),},
        {title: "Commercial funds", amount: data?.data?.totalNumberOfCommercialFundsInvestmentVehicle?.toString(),showIcon: true},
        {title: "Endowment", amount: data?.data?.totalNumberOfEndowmentFundsInvestmentVehicle?.toString(),showIcon: true},
    ]

    const cardData2 = [
        {title: "Total number of financier", amount: data?.data?.totalNumberOfFinancier?.toString(),},
        {title: "Individual", amount: data?.data?.totalNumberOfIndividualFinancier?.toString(),showIcon: true},
        {title: "Corporate", amount: data?.data?.totalNumberOfInstitutionalFinancier?.toString(),showIcon: true},
    ]
    const cardData3 = [
        {title: "Total number of loans", amount: data?.data?.totalNumberOfLoans?.toString(),},
        // {title: "Commercial funds", amount: '2',},
        // {title: "Endowment", amount: '2',},
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

    const loanData = [
        {title: "Loan referrals", amount: Math.round(Number(data?.data?.loanReferralPercentage?.toString())) + "%",textColor: 'text-[#66440A]',bgColor: 'bg-[#FEF6E8]',},
        {title: "Loan offers", amount: Math.round(Number(data?.data?.loanOfferPercentage?.toString())) + "%",textColor: 'text-[#142854]',bgColor: 'bg-[#D9EAFF]',},
        {title: "Disbursed loan", amount: Math.round(Number(data?.data?.loanDisbursalPercentage?.toString())) + '%',textColor: 'text-[#0e4c23]',bgColor: 'bg-[#E6F2EA]',},

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
        router.push('/loan/loan-request')
    }

    return (
       <div className={` pt-8 pb-`}>
           <div className={`px-5 h-[82vh] w-[100%] gap-8  md:w-[100%] md:grid md:gap-8  ${styles.container}   `}>
               <div className={` w-[100%] md:w-[100%] gap-8 md:mb-0 sm:mb-8 mb-8  md:h-auto m ${styles.tab} md:gap-5 md:w- flex  `}>
                   <PortfolioManagerOverviewCard isFetching={isFetching} isLoading={isLoading} id={'vehicleCard'} cardData={cardData1} clickView={routeToInvestmentVehicle}/>
                   <PortfolioManagerOverviewCard isFetching={isFetching} isLoading={isLoading} id={'vehicleCard2'} cardData={cardData2} clickView={routeToFinancier}/>
                   <PortfolioManagerOverviewCard isFetching={isFetching} isLoading={isLoading} loanData={loanData}  isLoanData={true} id={'vehicleCard3'} cardData={cardData3} clickView={routeToLoans}/>
               </div>
               <div className={`  w-full md:w-full pb-4  `}>
                   <Barcharts/>
               </div>
               <div className={` w-full grid md:flex pb-4 gap-6 `}>
                   <PerformanceCard id={'ownership'}  isSmall={true} showContainerBorder={true} percentage={'0'} showPerformancePercentage={true} maxWidth={'50%'} title={'Net AUM return'} value={0} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
                   <PerformanceCard id={'ownership'} isSmall={true} showContainerBorder={true} percentage={'0'} showPerformancePercentage={true} maxWidth={'50%'} title={'Talent funded '} value={0} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
               </div>
               <div className={` w-full grid  md:flex pb-4 gap-6 `}>
                   <PerformanceCard id={'ownership'}  isSmall={true} showContainerBorder={true} percentage={'0'} showPerformancePercentage={false} maxWidth={'50%'} title={'Total custodian/trustee fee'} value={0} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
                   <PerformanceCard id={'ownership'} isSmall={true} showContainerBorder={true} percentage={'0'} showPerformancePercentage={false} maxWidth={'50%'} title={'Total fund manager fee'} value={0} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
               </div>
           </div>
       </div>
    );
};

export default PortfolioManager;