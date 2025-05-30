import React from 'react';
import Image from "next/image";
import {inter} from "@/app/fonts";

const Document = () => {
    return (
        <div className={` h-fit  w-full rounded-md px-3 pt-5 pb-3   bg-[#F6F6F6] `}>
            <div className={` h-[8rem] bg-white  w-full rounded-md `}>

            </div>
            <div className={`flex py-4  gap-2 `}>
                <Image
                    src={'/MyMandateLogo.png'}
                    alt="circle"
                    width={20}
                    height={29}
                    // className="object-right-bottom flex  "
                    data-testid="circle-image"
                    loading="lazy"
                />
                <span className={` ${inter.className} text-[#212221] text-[14px] `}>mymandate25.pdf</span>
            </div>
        </div>
    );
};

export default Document;