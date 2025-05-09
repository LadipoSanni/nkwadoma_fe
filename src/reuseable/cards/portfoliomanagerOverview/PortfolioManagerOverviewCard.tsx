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
    isLoading: boolean;
    isFetching: boolean;
}

const PortfolioManagerOverviewCard = ({id,isLoading,isFetching,isLoanData,loanData, cardData, clickView}: Props) => {



    return (
        <div id={id}
             className={`${inter.className} flex  md:grid w-full md:w-full  `}>
            <div className="grid px-3 pt-3 pb-3  rounded-md border border-neutral-200 md:grid  gap-6">
              <div className={`  ${isFetching  && isLoading ? 'animate-pulse h-[40vh] md:w-full w-[40vw]  bg-[#f9f9f9] ': 'bg-grey105'} h-full grid gap- px-4 py-4`}>
                  {cardData?.map((card, index) => (
                      <main key={index}
                            className={`flex-non h-full ${isFetching  && isLoading ? 'hidden  ': ''} pb-2  w md:w-full he grid gap `}>
                          <div id={`balanceCardBlock${index}`}
                               className=" grid gap-2 ">
                              <p id={`cardTitle${index}`}
                                 className={`text-black300  flex gap-2 text-nowrap whitespace-nowrap mt-auto mb-auto  `}>
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
                      <main className={`w-full  grid gap-4 `}>
                          {loanData?.map((loan, index) => (
                              <div key={index}
                                   id={'id'+loan.title}
                                   className={` bg-white w-full border ${isFetching  && isLoading ? 'hidden ': ''} rounded-md relative  border-[#ECECEC]  h-fit `}
                              >

                                  <div
                                      style={{width:loan.amount}}
                                      className={` h-[40px] ${loan.amount === '0%'? `bg-white` : `${loan.bgColor}` }  rounded-md `}
                                      id={loan.title + 'Bar'}
                                  >

                                  </div>

                                  <div
                                      className={`text-black300 w-full absolute top-0 left-0  gap-2   px-3  h-[40px]    flex justify-between   `}
                                  >
                                      <label id={'label'+ loan.title} className={` ${inter500.className} mt-auto mb-auto text-nowrap whitespace-nowrap  ${loan.textColor} `}>{loan.title}</label>
                                      <label id={ loan.title +'Percentage'} className={` ${inter500.className} mt-auto mb-auto text-nowrap whitespace-nowrap  text-[#212221] `}>{loan.amount}</label>

                                  </div>
                              </div>
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