import React, {useState} from 'react';
import styles from "./index.module.css"
import PortfolioManagerOverviewCard from "@/reuseable/cards/PortfolioManagerOverviewCard";
import MeedlBarChart from "@/reuseable/bar-chart";

const PortfolioManager = () => {
    const initialChartData = [
        { month: "Jan", value: 186, },
        { month: "Feb", value: 305,  },
        { month: "March", value: 237, },
    ]
    const [chartData, setChartData] = useState<{month: string, value: number}[]>(initialChartData);

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
        {title: "Commercial funds", amount: '2',},
        {title: "Endowment", amount: '2',},
    ]

    const SecondChartData = [
        { month: "Jan", value: 186, },
        { month: "Feb", value: 505,  },
        { month: "March", value: 237, },
        { month: "April", value: 73, },
        { month: "May", value: 209,  },
        { month: "June", value: 214,  },
    ]

    const thirdChartData = [
        { month: "Jan", value: 186, },
        { month: "Feb", value: 305,  },
        { month: "March", value: 237, },
        { month: "April", value: 73, },
        { month: "May", value: 209,  },
        { month: "June", value: 214,  },
        { month: "july", value: 73, },
        { month: "August", value: 209,  },
        { month: "September", value: 214,  },
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
               <div className={` w-[100%] md:w-[100%] bg--300 md:h-auto m ${styles.tab} md:gap-5 md:w- flex md:flex `}>
                   <PortfolioManagerOverviewCard id={'vehicleCard'} cardData={cardData1} clickView={clickCard1}/>
                   <PortfolioManagerOverviewCard id={'vehicleCard2'} cardData={cardData2} clickView={clickCard2}/>
                   <PortfolioManagerOverviewCard id={'vehicleCard3'} cardData={cardData3} clickView={clickCard3}/>
               </div>

               <div className={`  w-full md:w-full pb-5  `}>
                   <div className={` grid md:flex md:w-[50%] md:h-auto md:border md:border-[#D7D7D7] rounded-md  md:py-4 md:px-4 `}>
                       <MeedlBarChart dataKey={'value'} maxWidth={'100%'} maxHeight={'30rem'} chartData={chartData} componentId={'details'}/>
                   </div>
               </div>
           </div>
       </div>
    );
};

export default PortfolioManager;