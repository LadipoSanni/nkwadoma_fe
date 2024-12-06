import React from 'react';
declare module "react-number-format";
import { NumericFormat } from 'react-number-format';


interface props {
    total: string,
    componentId: string,
    prefix: string

}

const TotalInput = ({total, componentId, prefix}: props) => {
    // var NumberFormat = require('react-number-format');

    // const number = 1 * total


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
                <NumericFormat
                    value={total }
                    className="w-fit "
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={prefix}
                />
            </div>
        </div>
    );
};

export default TotalInput;