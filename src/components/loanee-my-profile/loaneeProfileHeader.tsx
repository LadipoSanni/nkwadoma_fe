import {cabinetGroteskBold, inter700, inter} from '@/app/fonts';
import React from 'react';

const LoaneeProfileHeader = () => {
    return (
        <div id={'loaneeProfileHeader'}
             data-testid={'loaneeProfileHeader'}
             className={`w-full h-[20%] border-b border-b-[#D7D7D7] px-4 py-4 flex justify-between `}
        >
            <div
                id={'cohortAndProgramInfo'}
                data-testid={'cohortAndProgramInfo'}
                className={` w-fit h-full flex gap-2`}
            >
                <div
                    id={'cohortImage'}
                    data-testid={'cohortImage'}
                    className={`h-[4rem] w-[4rem] rounded-full bg-[#F6F6F6] `}
                >

                </div>
                <div className={` mt-auto mb-auto `}>
                    <span id={'cohortName'} data-testid={'cohortName'} className={` ${cabinetGroteskBold.className} text-[20px] text-[#212221] `}>Semicolon Africa</span>
                    <div className={` text-[#4D4E4D] text-[14px]  ${inter.className}`}>Software engineering . Alphas</div>
                </div>
            </div>
            <button
                id={'defferButton'}
                data-testid={'defferButton'}
                className={` ${inter700.className} mt-auto mb-auto  bg-meedlBlue w-fit h-fit py-2 px-4 rounded-md text-[12px] text-white`}
            >Defer cohort</button>
        </div>
    );
};

export default LoaneeProfileHeader;