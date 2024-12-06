import React from 'react';

interface props {
    total: string,
    componentId: string,

}

const TotalInput = ({total, componentId}: props) => {
    return (
        <div
            data-testid={componentId}
            id={componentId}
            className={` w-full h-fit bg-[#F9F9F9] py-4 px-2 rounded flex  justify-between text-[#6A696D]`}
        >
            <span>Total</span>
            <div
                className={`bg-blue500 text-meedlBlue grid w-fit  h-fit px-3 py-1 rounded-full `}
            >
                {total}
            </div>
        </div>
    );
};

export default TotalInput;