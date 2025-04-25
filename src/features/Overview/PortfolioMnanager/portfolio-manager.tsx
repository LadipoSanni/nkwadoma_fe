import React from 'react';
import styles from "../index.module.css"
import PortfolioManagerOverviewCard from "@/reuseable/cards/PortfolioManagerOverviewCard";
// import MeedlBarChart from "@/reuseable/bar-chart";
import Barcharts from "@/features/Overview/PortfolioMnanager/Barcharts";
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";

const PortfolioManager = () => {
    // const initialChartData = [
    //     { month: "Jan", value: 186, },
    //     { month: "Feb", value: 305,  },
    //     { month: "March", value: 237, },
    // ]
    // const [chartData, setChartData] = useState<{month: string, value: number}[]>(initialChartData);

    const cardData1 = [
        {title: "Total investment vehicles", amount: '0',},
        {title: "Commercial funds", amount: '2',showIcon: true},
        {title: "Endowment", amount: '2',showIcon: true},
    ]

    const cardData2 = [
        {title: "Total number of financier", amount: '0',},
        {title: "Individual", amount: '2',showIcon: true},
        {title: "Corporate", amount: '2',showIcon: true},
    ]
    const cardData3 = [
        {title: "Total number of loans", amount: '0',},
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
        {title: "Loan referrals", amount: '0',textColor: '#66440A',bgColor: 'bg-green-500',},
        {title: "Loan offers", amount: '0',textColor: '#142854',bgColor: 'bg-green-500',},
        {title: "Disbursed loan", amount: '0',textColor: '#034319',bgColor: 'bg-green-500',},
    ]

    const clickCard1 = () => {

    }


    const clickCard2 = () => {

    }


    const clickCard3 = () => {

    }

    return (
       <div className={` pt-8 pb-`}>
           <div className={`px-5 h-[82vh] w-[100%] md:w-[100%] md:grid md:gap-8  ${styles.container}   `}>
               <div className={` w-[100%] md:w-[100%] bg--300 md:h-auto m ${styles.tab} md:gap-5 md:w- flex md:grid md:grid-cols-3  `}>
                   <PortfolioManagerOverviewCard id={'vehicleCard'} cardData={cardData1} clickView={clickCard1}/>
                   <PortfolioManagerOverviewCard id={'vehicleCard2'} cardData={cardData2} clickView={clickCard2}/>
                   <PortfolioManagerOverviewCard loanData={loanData}  isLoanData={true} id={'vehicleCard3'} cardData={cardData3} clickView={clickCard3}/>
               </div>
               {/*<div className={`  w-full md:w-full pb-4  `}>*/}
               {/*    <Barcharts/>*/}
               {/*</div>*/}
               {/*<div className={` w-full grid md:flex pb-4 gap-6 `}>*/}
               {/*    <PerformanceCard id={'ownership'}  isSmall={true} showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={true} maxWidth={'50%'} title={'Net AUM return'} value={3000000000} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>*/}
               {/*    <PerformanceCard id={'ownership'} isSmall={true} showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={true} maxWidth={'50%'} title={'Talent funded '} value={3000000000} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>*/}
               {/*</div>*/}
               {/*<div className={` w-full grid  md:flex pb-4 gap-6 `}>*/}
               {/*    <PerformanceCard id={'ownership'}  isSmall={true} showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={false} maxWidth={'50%'} title={'Total custodian/trustee fee'} value={3000000000} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>*/}
               {/*    <PerformanceCard id={'ownership'} isSmall={true} showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={false} maxWidth={'50%'} title={'Total fund manager fee'} value={3000000000} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>*/}
               {/*</div>*/}
           </div>
       </div>
    );
};

export default PortfolioManager;