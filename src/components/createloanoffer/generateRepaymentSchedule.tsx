import React from 'react';
import {cabinetGroteskMediumBold600, inter700} from "@/app/fonts";
import Details from "@/components/loanee-my-profile/Details";

const GenerateRepaymentSchedule = () => {
    return (
        <div
            id={'generateRepaymentScheduleComponent'}
            data-testid={'generateRepaymentScheduleComponent'}
            className={` w-full grid gap-6  h-full px-2 py-2 `}
        >
            <div className={`w-full h-fit flex justify-between `}>
                <h4 className={` ${cabinetGroteskMediumBold600.className} text-[#101828] text-[28px] text-  `}>Generate repayment schedule</h4>
                <button id={'confirmRepaymentButton'} data-tesid={'confirmRepaymentButton'} className={` rounded-md text-[14px] ${inter700.className}  w-fit h-fit py-1 px-2 bg-meedlBlue text-white  `}>Confirm repayment schedule</button>
            </div>
            <div className={` flex gap-3  `}>
                <div className={` w-[50%] `}>
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'total'} showAsWholeNumber={false}    name={'Sum total'} value={'200000'} valueType={'currency'}  />
                </div>
                <div className={`w-[50%] flex gap-3  `}>
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'totalamountEarned'} showAsWholeNumber={false}    name={'Tenor'} value={'9'} valueType={'years'}  />
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'totalamountEarned'} showAsWholeNumber={false}    name={'Tenor'} value={'0'} valueType={'years'}  />
                </div>
            </div>

        </div>
    );
};

export default GenerateRepaymentSchedule;