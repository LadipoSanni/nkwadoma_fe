import React from 'react';
import {cabinetGrotesk, inter, inter500 } from '@/app/fonts'
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";
import {useRouter} from 'next/navigation';
import GeneralEmptyState from "@/reuseable/emptyStates/General-emptystate";

const MyInvestments = () => {
    const router = useRouter();
    const handleRoute = () => {
        router.push('/my-investment')
    }
    return (
        <section
            className={`${inter.className}`}
            id="myInvestmentsSection"
        >
            <div
                className={'flex justify-between items-center'}
                id="myInvestmentsHeaderContainer"
            >
                <h5
                    className={`${cabinetGrotesk.className} font-medium text-black500 md:text-[24px] text-[20px] leading-[150%]`}
                    id="myInvestmentsTitle"
                >
                    My investments
                </h5>
                <p
                    onClick={handleRoute}
                    className={'hidden cursor-pointer text-meedlBlue underline text-[14px] font-normal leading-[150%]'}
                    id="myInvestmentsViewAll"
                >
                    View all
                </p>
            </div>
            <div id="myInvestmentsEmptyState">
                <GeneralEmptyState
                    name={'investment'}
                    icon={() => (
                        <Icon
                            icon='iconoir:hand-cash'
                            color={'#142854'}
                            height={"40px"}
                            width={"40px"}
                            id="myInvestmentsIcon"
                        />
                    )}
                    message={<div className={'grid gap-2'}><h1 className={`text-black500 ${inter500.className} text-[18px] leading-[150%]`}>My investments will show here</h1> <p className={'text-lightBlue850 text-[14px] leading-[150%]'}>There are no investments
                        available yet</p></div>}
                    // condition={true}
                />
            </div>
        </section>
    );
};

export default MyInvestments;