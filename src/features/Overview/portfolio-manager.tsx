import React from 'react';
import styles from "./index.module.css"
import PortfolioManagerOverviewCard from "@/reuseable/cards/PortfolioManagerOverviewCard";

const PortfolioManager = () => {

    const cardData1 = [
        {title: "Total investment vehicles", amount: '0',},
        {title: "Commercial funds", amount: '2',},
        {title: "Endowment", amount: '2',},
    ]

    const cardData2 = [
        {title: "Total number of financier", amount: '0',},
        {title: "Individual", amount: '2',},
        {title: "Corporate", amount: '2',},
    ]
    const cardData3 = [
        {title: "Total number of loans", amount: '0',},
        {title: "Commercial funds", amount: '2',},
        {title: "Endowment", amount: '2',},
    ]

    const clickCard1 = () => {

    }


    const clickCard2 = () => {

    }


    const clickCard3 = () => {

    }

    return (
        <div className={`px-5 h-[85vh] w-[100%] md:w-[100%] ${styles.container}  pt-8 `}>
            <div className={` w-[100%] md:w-[70vw] md:h-auto m ${styles.tab} md:gap-5 md:w- flex md:flex `}>
                <PortfolioManagerOverviewCard id={'vehicleCard'} cardData={cardData1} clickView={clickCard1}/>
                <PortfolioManagerOverviewCard id={'vehicleCard2'} cardData={cardData2} clickView={clickCard2}/>
                <PortfolioManagerOverviewCard id={'vehicleCard3'} cardData={cardData3} clickView={clickCard3}/>
            </div>
        </div>
    );
};

export default PortfolioManager;