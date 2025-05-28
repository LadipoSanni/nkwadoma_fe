import {cabinetGroteskBold, inter700, inter} from '@/app/fonts';
import React from 'react';
import {MdKeyboardArrowDown} from "react-icons/md";

const LoaneeProfileHeader = () => {
    return (
        <div id={'loaneeProfileHeader'}
             data-testid={'loaneeProfileHeader'}
             className={`w-full h-[13vh] border-b border-b-grey-200 px-4  mt-auto mb-auto  md:flex grid gap-4  md:justify-between `}
        >
            <div
                id={'cohortAndProgramInfo'}
                data-testid={'cohortAndProgramInfo'}
                className={` w-fit h-full flex gap-2`}
            >
                <div
                    id={'cohortImage'}
                    data-testid={'cohortImage'}
                    className={`h-[4rem] w-[4rem] mt-auto mb-auto rounded-full bg-[#F6F6F6] `}
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
                className={` ${inter700.className} flex justify-center mt-auto mb-auto  py-3 text-[14px] gap-2 bg-meedlBlue w-full  md:w-fit h-fit md:py-2 px-4 rounded-md md:text-[12px] text-white`}
            >Defer cohort
                <MdKeyboardArrowDown
                    className="h-5 w-5 mt-auto mb-auto text-white"/>
            </button>
        </div>
    );
};

export default LoaneeProfileHeader;