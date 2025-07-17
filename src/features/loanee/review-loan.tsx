'use client'
import React from 'react';
import {cabinetGrotesk, inter, cabinetGroteskMediumBold600} from "@/app/fonts";
import Connector from "@/components/common/Connector";
import {Button} from "@/components/ui/button";
import DetailItem from "@/reuseable/details/detail-Item/Index";
import {NumericFormat} from "react-number-format";

const ReviewLoan = () => {




    return (
        <div className={` w-full h-full py-4 px-6  grid gap-6  `}>
            <div className={`border-b border-[#ECECEC] py-4 `}>
                <h1 id={'componentTitle'} data-testid={'componentTitle'} className={` ${cabinetGrotesk.className} py- w-full  text-[#101828]  text-[26px] `}>Loan review process</h1>
            </div>
            <div className={`grid   md:flex lg:flex md:justify-between lg:justify-between  `}>
                <div className={`hidden md:flex h-fit  gap-3`}>
                    <Connector showLine={false} isActive={true} isCompleted={false} />
                    <p className={`text-[#142854] mt-auto mb-auto  text-[14px] ${inter.className}`}>Loan application</p>
                </div>
                <div className={` md:w-[50%] rounded-md  lg:w-[50%] w-full border px-4 py-4  border-[#ECECEC]   `}>
                    <h2  className={` ${cabinetGroteskMediumBold600.className} pb-2 text-[22px]  `}>Loan application details</h2>
                    <div className={` rounded-md grid gap-9 p-5 bg-grey105 `}>
                        <DetailItem id={'LoanAmount'} label="Loan amount" value={<NumericFormat value={'10000'} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={'amountOutstanding'} label="Amount outstanding" value={<NumericFormat value={'10000'} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={"amountRepaid"} label="Amount repaid" value={<NumericFormat value={'10000'} displayType={'text'} thousandSeparator={true} prefix={'₦'} decimalScale={2} fixedDecimalScale={true} />} />
                        <DetailItem id={'interest'} label="Interest" value={`10%`} />
                        <DetailItem id={`interestIncurred`} label="Interest incurred" value={`10%`} />
                    </div>
                    <div className={` mt-4  flex justify-end w-full `}>
                        <Button
                            id="acceptButton"
                            data-testid={'acceptButton'}
                            className={'bg-meedlBlue text-meedlWhite text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-fit '}
                            variant={'secondary'}
                        >
                            Accept
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewLoan;