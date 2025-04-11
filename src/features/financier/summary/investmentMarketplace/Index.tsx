import React from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts'
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";
import {useRouter} from 'next/navigation';

const InvestmentMarketplace = () => {
    const router = useRouter();
    const handleRoute = () => {
        router.push('/marketplace')
    }
    return (
        <section
            className={`${inter.className}`}
            id={'investmentMarketplaceSection'}
        >
            <div
                className={'flex justify-between items-center'}
                id={'investmentMarketplaceHeaderContainer'}
            >
                <h5
                    className={`${cabinetGrotesk.className} font-medium text-black500 md:text-[24px] text-[20px] leading-[150%]`}
                    id={'investmentMarketplaceTitle'}
                >
                    Investment Marketplace
                </h5>
                <p
                    onClick={handleRoute}
                    className={'cursor-pointer text-meedlBlue underline text-[14px] font-normal leading-[150%]'}
                    id={'investmentMarketplaceViewAll'}
                >
                    View all
                </p>
            </div>
            <div id={'investmentMarketplaceEmptyState'}>
                <TableEmptyState
                    name={'investment'}
                    icon={() => (
                        <Icon
                            icon='iconoir:hand-cash'
                            color={'#142854'}
                            height={"40px"}
                            width={"40px"}
                            id={'investmentMarketplaceIcon'}
                        />
                    )}
                    condition={true}
                />
            </div>
        </section>
    );
};

export default InvestmentMarketplace;