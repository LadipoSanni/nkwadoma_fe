import React from 'react';
import {Button} from "@/components/ui/button";


interface props {
    dataList?: { label: string; value: string; }[];
    showBackButton?: boolean,
    showNextButton?: boolean,
    backButtonTittle?: string,
    nextButtonTittle?: string,
    handleNextButton?: ()=> void,
    handleBackButton?: ()=> void,
    nextButtonId?: string,
    backButtonId?: string,
    id: string,
}

const LoanDetailsCard = ({dataList, showBackButton, showNextButton, nextButtonTittle, backButtonTittle}: props) => {
    return (
        <div
            className={`w-full h-fit md:w-full grid gap-4 md:grid md:gap-4 md:h-fit px-2 py-2 md:px-2 md:py-2 `}
        >
            <div
                id={'loanDetailsCardMainComponent'}
                data-testid={'loanDetailsCardMainComponent'}
                className={` bg-[#f9f9f9] rounded-md w-full grid gap-10 h-fit px-3 py-3   `}
            >
                {dataList?.map((data, index) => (
                    <div
                        key={index}
                        className={`md:w-full md:h-fit w-full h-fit md:flex md:justify-between grid gap-2 `}
                    >
                        <div className={`text-sm text-black300 `}>{data.label}</div>
                        <div className={`text-sm text-[#101828]`}>{data.value}</div>
                    </div>
                ))}
            </div>
            <div
                id={'buttonComponent'}
                className={`w-full h-fit grid gap-3 md:flex md:justify-end  `}
            >
                {showBackButton &&
                    <Button

                    >
                        {backButtonTittle}
                    </Button>
                }
                {showNextButton &&
                    <Button
                        className={` bg-meedlBlue text-white hover:bg-meedleBlue hover:text-white py-6 px-5 `}
                    >
                        {nextButtonTittle}
                    </Button>
                }
            </div>

        </div>
    );
};

export default LoanDetailsCard;