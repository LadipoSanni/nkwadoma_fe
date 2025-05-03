import React from 'react';
import {cabinetGroteskBold, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import { MdOutlineHelpOutline } from "react-icons/md";


interface Props {
    id: string;
    cardData?: {title: string, amount: string, showIcon?: boolean}[];
    clickView: () => void;
    isLoanData?: boolean;
    loanData?: {title: string, amount: string, textColor: string,bgColor: string,}[];
}

const PortfolioManagerOverviewCard = ({id,isLoanData,loanData, cardData, clickView}: Props) => {



    return (
        <div id={id}
             className={`${inter.className} flex  md:grid w-full md:w-full  `}>
            <div className="grid px-3 pt-3 pb-3  rounded-md border border-neutral-200 md:grid  gap-6">
              <div className={`bg-grey105  h-full grid gap- px-4 py-4`}>
                  {cardData?.map((card, index) => (
                      <main key={index}
                            className="flex-non h-full pb-2  w md:w-full he grid gap ">
                          <div id={`balanceCardBlock${index}`}
                               className=" grid gap-2 ">
                              <p id={`cardTitle${index}`}
                                 className="text-black300 flex gap-2 text-nowrap whitespace-nowrap mt-auto mb-auto  ">
                                  {card.title}
                                  {card?.showIcon &&
                                      <MdOutlineHelpOutline className={` mt-auto mb-auto`} />
                                  }
                              </p>
                              <h1 id={`cardAmount${index}`} className={`${cabinetGroteskBold.className} text-[28px] text-meedlBlue ]`}>{card.amount}
                              </h1>
                          </div>
                      </main>
                  ))}
                  {isLoanData &&
                      <main className={`w-full grid gap-4 `}>
                          {loanData?.map((loan, index) => (
                              <div key={index} className={`text-black300 w-full border h-fit  ${Number(loan.amount) === 0 ? '' : ''} bg-white px-2   border-[#ECECEC] rounded-md flex justify-between gap-2  text-[14px] text-nowrap whitespace-nowrap mt-auto mb-auto`}>
                                  <div
                                      style={{width:Math.round(Number(loan.amount)).toString()}}
                                      className={`h-full py-3 bg-red-600 `}
                                  >
kjjk
                                  </div>
                              </div>

                      //         <div className={` w- py-3  flex justify-between ${loan.bgColor} `} style={{width: Math.round(Number(loan.amount)).toString()}}>
                      //     <label className={` ${inter500.className} text-[${loan.textColor}] `}>{loan.title}</label>
                      //     <label className={` ${inter500.className}  `}>{Math.round(Number(loan.amount))}%</label>
                      // </div>
                              // <progress key={index} id={`cardTitle`}
                              //    className={`text-black300 w-full border h-fit py-3  ${Number(loan.amount) === 0 ? '' : ''} bg-white px-2   border-[#ECECEC] rounded-md flex justify-between gap-2  text-[14px] text-nowrap whitespace-nowrap mt-auto mb-auto `}>
                              //     <label className={` ${inter500.className} text-[${loan.textColor}] `}>{loan.title}</label>
                              //     <label className={` ${inter500.className}  `}>{loan.amount}%</label>
                              // </progress>
                          ))}
                      </main>
                  }
              </div>

                <div id={`balanceLinkBlock`}
                     className="flex bg-white  mt-auto h-fit   justify-end">
                    <Button  onClick={clickView} className={`bg-[#D9EAFF] ${inter.className} md:w-fit md:h-fit px-1 py-1 md:py-1 md:px-2  underline md:text-[#142854] text-[#142854] text-[14px] shadow-none  hover:bg-[#D9EAFF] w-fit h-fit `}>
                        view
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioManagerOverviewCard;