import React from 'react';
import styles from "./index.module.css"
import PortfolioManagerOverviewCard from "@/reuseable/cards/PortfolioManagerOverviewCard";

const PortfolioManager = () => {
    return (
        <div className={`px-5 h-[85vh] w-[100%] md:w-[100%] ${styles.container}  pt-8 `}>
            <div className={` w-[100%] md:w-[70vw] md:h-auto md:bg-red-100 ${styles.tab} md:gap-5 md:w- flex md:flex `}>
                {/*<PortfolioManagerOverviewCard/>*/}
                {/*<PortfolioManagerOverviewCard/>*/}
                {/*<PortfolioManagerOverviewCard/>*/}
                {/*<div className={`w-[40rem] h-fit bg-red-300`}>*/}
                {/*    rfkpof*/}
                {/*</div>*/}
                {/*<div className={`w-[40rem] h-fit bg-red-300`}>*/}
                {/*    rfkpof*/}
                {/*</div>*/}

            </div>
        </div>
    );
};

export default PortfolioManager;