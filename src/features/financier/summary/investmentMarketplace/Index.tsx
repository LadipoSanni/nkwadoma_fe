import React from 'react';
import {cabinetGrotesk, inter, inter500} from '@/app/fonts'
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";
import {useRouter} from 'next/navigation';
import {MdOutlineAccountBalance} from 'react-icons/md';
import GeneralEmptyState from "@/reuseable/emptyStates/General-emptystate";

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
                    className={'hidden cursor-pointer text-meedlBlue underline text-[14px] font-normal leading-[150%]'}
                    id={'investmentMarketplaceViewAll'}
                >
                    View all
                </p>
            </div>
            <div id={'investmentMarketplaceEmptyState'}>
                <GeneralEmptyState
                    name={'investment'}
                    icon={() => (
                        <MdOutlineAccountBalance
                            className={'h-8 w-8 text-meedlBlue'}
                            id={'investmentMarketplaceIcon'}
                        />
                    )}
                    message={<div className={'grid gap-2'}><h1 className={`${inter500.className} text-black500 text-[18px] leading-[150%]`}>All investments will show here</h1> <p className={'text-lightBlue850 text-[14px] leading-[150%]'}>There are no investments
                        available yet</p></div>}
                    // condition={true}
                />
            </div>
        </section>
    );
};

export default InvestmentMarketplace;