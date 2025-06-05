import React from 'react';
import { inter500, inter} from "@/app/fonts";
// import stxyles from "@/components/loanee-my-profile/index.module.css";
import Image from "next/image";
import {LoaneeDetails} from "@/types/loanee";
interface props{
    data: LoaneeDetails
}


const LoaneeBasicDetails = ({data}: props) => {

    console.log(data)


    return (
        <div
            id={'loaneeBasicDetails'}
            data-testid={'loaneeBasicDetails'}
            className={`md:h-fit hidden  md:w-[45%]   gap-0 md:grid lg:grid px-4  sm:hidden    sm:w-full w-full  `}
        >
                <span id={'document'} className={`w-fit ${inter500.className} text-[18px]  py-4 h-fit  text-[#212221]  `} >Document</span>

                <div
                    className={` md:max-h-fit grid  grid-cols-2 w-full   `}
                >

                    <div className={` h-fit  w-full rounded-md px-3 pt-5 pb-3   bg-[#F6F6F6] `}>
                           <div className={` h-[8rem] w-full bg-white   rounded-md `}>

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
                    {/*<div className={` h-fit  w-fit rounded-md px-3 pt-5 pb-3   bg-[#F6F6F6] `}>*/}
                    {/*    <div className={` h-[8rem] w-[203px] bg-white   rounded-md `}>*/}

                    {/*    </div>*/}
                    {/*    <div className={`flex py-4  gap-2 `}>*/}
                    {/*        <Image*/}
                    {/*            src={'/MyMandateLogo.png'}*/}
                    {/*            alt="circle"*/}
                    {/*            width={20}*/}
                    {/*            height={29}*/}
                    {/*            // className="object-right-bottom flex  "*/}
                    {/*            data-testid="circle-image"*/}
                    {/*            loading="lazy"*/}
                    {/*        />*/}
                    {/*        <span className={` ${inter.className} text-[#212221] text-[14px] `}>mymandate25.pdf</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
        </div>
    );
};

export default LoaneeBasicDetails;