import React from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts'
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";

const InvestmentMarketplace = () => {
    return (
        <section className={`${inter.className}`}>
            <div className={'flex justify-between items-center'}>
                <h5 className={`${cabinetGrotesk.className} font-medium text-black500 text-[24px] leading-[150%]`}>Investment Marketplace</h5>
                <p className={'text-meedlBlue underline text-[14px] font-normal leading-[150%]'}>View all</p>
            </div>
            <TableEmptyState
                name={'investment'}
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
        </section>
    );
};

export default InvestmentMarketplace;