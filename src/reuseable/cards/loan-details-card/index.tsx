import React from 'react';


interface props {
    dataList?: { label: string; value: string; }[];
}

const LoanDetailsCard = ({dataList}: props) => {
    return (
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
    );
};

export default LoanDetailsCard;