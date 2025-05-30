import React from 'react';
import {inter} from "@/app/fonts";

interface props  {
    basicDetails: {label: string, value: string}[];
}
const BasicDetails = ({basicDetails}:props) => {
    return (
        <div className={` bg-grey105  w-full rounded-md  `}>
            {basicDetails?.map((item, index) => (
                <li key={"key" + index} className={'p-4  grid gap-9 rounded-md'}>
                    <div
                        className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                        <div
                            id={'name:'+item.label}
                            className={`  ${inter.className} break-all md:max-w-[40%] text-black300 text-[14px] `}>{item.label}</div>
                        <div
                            id={'name:'+item.value}
                            className={` ${inter.className} break-all md:max-w-[50%]   text-black500 text-[14px] `}> {item.value ? item.value : 'Not provided'}</div>
                    </div>
                </li>
            ))
            }
        </div>
    );
};

export default BasicDetails;