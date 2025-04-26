import React from 'react';
import {cabinetGroteskBold, inter, inter500} from "@/app/fonts";
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
             className={`${inter.className}  w-[20rem] d md:w-1/3  `}>
            <div className="grid px-3 pt-3 pb-5   rounded-md border border-neutral-200 md:grid md:gri gap-6">
              <div className={`bg-grey105 w-  grid gap- px-4 py-4`}>
                  {cardData?.map((card, index) => (
                      <main key={index}
                            className="flex-non  w-fit he grid gap-5 ">
                          <div id={`balanceCardBlock${index}`}
                               className=" w-fit grid gap-5 ">
                              <p id={`cardTitle${index}`}
                                 className="text-black300 flex gap-2 w-fit bg-red-100 text-[14px] break-keep ">
                                  {card.title}
                                  {card?.showIcon &&
                                      <MdOutlineHelpOutline className={` mt-auto mb-auto`} />
                                  }
                              </p>
                              <h1 id={`cardAmount${index}`} className={`${cabinetGroteskBold.className} text-meedlBlue ]`}>{card.amount}
                              </h1>
                          </div>
                      </main>
                  ))}
                  {isLoanData &&
                      <main className={`b w-full grid gap-4 px-4 py-4`}>
                          {loanData?.map((loan, index) => (
                              <div key={index} id={`cardTitle`}
                                 className={`text-black300 w-full border h-fit py-3  ${Number(loan.amount) === 0 ? '' : ''}  border-[#ECECEC] rounded-md flex justify-between gap-2  text-[14px] font-normal leading-[150%]`}>
                                  <p className={` ${inter500.className} text-[${loan.textColor}] `}>{loan.title}</p>
                                  <p className={` ${inter500.className}  `}>{loan.amount}%</p>
                              </div>
                          ))}
                      </main>
                  }
              </div>

                <div id={`balanceLinkBlock`}
                     className="flex bg-white  justify-end">
                    <Button  onClick={clickView} className={`bg-[#D9EAFF] ${inter.className} md:w-fit md:h-fit px-1 py-1 md:py-1 md:px-2  underline md:text-[#142854] text-[#142854] text-[14px] shadow-none  hover:bg-[#D9EAFF] w-fit h-fit `}>
                        view
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioManagerOverviewCard;