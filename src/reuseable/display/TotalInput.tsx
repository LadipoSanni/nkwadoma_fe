import React from 'react';
declare module "react-number-format";
import {formatAmount} from "@/utils/Format";


interface props {
    total: string | number,
    componentId: string,
    prefix?: string

}

const TotalInput = ({total, componentId}: props) => {


    return (
        <div
            data-testid={componentId}
            id={componentId}
            className={` w-fit h-fit bg-[#F9F9F9] py-4 px-2 rounded flex  justify-between text-[#6A696D]`}
        >
            <div
                className={`bg-blue500 text-meedlBlue grid w-fit  h-fit px-3 py-1 rounded-full `}
            >
                {formatAmount(total)}
            </div>
        </div>
    );
};

export default TotalInput;