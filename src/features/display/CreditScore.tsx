import React from 'react';

const CreditScore = () => {
    return (
        <div
            id={'CreditScoreComponent'}
            data-testid="CreditScoreComponent"
            className={` flex md:flex w-fit md:w-fit `}
        >
            <p>very good </p>
            <div
                className={` w-fit md:w-fit md:h-fit h-fit md:py-0 py-0 md:px-1 px-1 md:rounded-md rounded-md border md:border border-green650 md:border-green650`}>
                        <span
                            className={`md:bg-green150 bg-green150 md:px-0.5 px-0.5 md:rounded-md rounded-md md:py-0.5 py-0.5 md:text-xs text-xs text-green750 md:text-green750 `}>50</span>
            </div>
        </div>
    );
};

export default CreditScore;