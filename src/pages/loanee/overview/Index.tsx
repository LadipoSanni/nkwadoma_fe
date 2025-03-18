import React from 'react';
import BalanceCard from '@/reuseable/cards/BalanceCard/Index'
import {inter} from '@/app/fonts'
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";


const LoaneeOverview = () => {
    return (
        <main id={'OverviewTr'}
              className={` md:pt-8 ${inter.className} h-full w-full bg-learnSpaceWhite rounded-[8px] md:px-10`}>
            <BalanceCard/>
            <TableEmptyState
                name={'Repayment'}
                icon={() => (
                    <Icon
                        icon='iconoir:hand-cash'
                        color={'#142854'}
                        height={"40px"}
                        width={"40px"}
                    />
                )}
                condition={true}
            />
        </main>
    );
};

export default LoaneeOverview;