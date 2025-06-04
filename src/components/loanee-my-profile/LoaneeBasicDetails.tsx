import React from 'react';
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, inter500} from "@/app/fonts";
import styles from "@/components/loanee-my-profile/index.module.css";
import Image from "next/image";
import {LoaneeDetails} from "@/types/loanee";
interface props{
    data: LoaneeDetails
}


const LoaneeBasicDetails = ({data}: props) => {



    return (
        <div
            id={'loaneeBasicDetails'}
            data-testid={'loaneeBasicDetails'}
            className={`md:max-h-fit hidden bg-red-500  md:w-[45%]  md:grid lg:grid px-4  sm:hidden    sm:w-full w-full  `}
        >
                <div id={'document'} className={`w-fit ${inter500.className} text-[18px]  py-4 h-fit  text-[#212221] ${inter500.className} `} >Document</div>
                <div
                    className={` md:max-h-[30vh] w-full bg-purple-100 ${styles.container}`}
                >
                     {/*<div className={` h-fit  w-full rounded-md px-3 pt-5 pb-3  bg-[#F6F6F6] `}>*/}
                     {/*       <div className={` h-[8rem] bg-white  w-full rounded-md `}>*/}

                     {/*       </div>*/}

                     {/*       <div className={`flex py-4 gap-2 `}>*/}
                     {/*           <Image*/}
                     {/*               src={'/MyMandateLogo.png'}*/}
                     {/*               alt="circle"*/}
                     {/*               width={20}*/}
                     {/*               height={29}*/}
                     {/*               data-testid="circle-image"*/}
                     {/*               loading="lazy"*/}
                     {/*           />*/}
                     {/*           <span className={` ${inter.className} text-[#212221] text-[14px] `}>mymandate25.pdf</span>*/}
                     {/*       </div>*/}
                     {/*   </div>*/}
                     {/*<div className={` h-fit  w-full rounded-md px-3 pt-5 pb-3   bg-[#F6F6F6] `}>*/}
                     {/*       <div className={` h-[8rem] bg-white  w-full rounded-md `}>*/}

                     {/*       </div>*/}
                     {/*       <div className={`flex py-4  gap-2 `}>*/}
                     {/*           <Image*/}
                     {/*               src={'/MyMandateLogo.png'}*/}
                     {/*               alt="circle"*/}
                     {/*               width={20}*/}
                     {/*               height={29}*/}
                     {/*               // className="object-right-bottom flex  "*/}
                     {/*               data-testid="circle-image"*/}
                     {/*               loading="lazy"*/}
                     {/*           />*/}
                     {/*           <span className={` ${inter.className} text-[#212221] text-[14px] `}>mymandate25.pdf</span>*/}
                     {/*       </div>*/}
                     {/*   </div>*/}
                </div>
        </div>
    );
};

export default LoaneeBasicDetails;