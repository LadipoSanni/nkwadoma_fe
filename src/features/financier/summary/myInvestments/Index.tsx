import React from 'react';
import {cabinetGrotesk, inter} from '@/app/fonts'
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";
import {useRouter} from 'next/navigation';

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
                    className={'cursor-pointer text-meedlBlue underline text-[14px] font-normal leading-[150%]'}
                    id="myInvestmentsViewAll"
                >
                    View all
                </p>
            </div>
            <div id="myInvestmentsEmptyState">
                <TableEmptyState
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
                    condition={true}
                />
            </div>
        </section>
    );
};

export default MyInvestments;