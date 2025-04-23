import React from 'react';
import {cabinetGroteskBold, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";


interface Props {
    id: string;
    cardData?: {title: string, amount: string}[];
    clickView: () => void;
}

const PortfolioManagerOverviewCard = ({id, cardData, clickView}: Props) => {


    return (
        <div id={id}
             className={`${inter.className} flex overflow-x-auto md:grid md:overflow-visible 
                        snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden 
                        [-ms-overflow-style:none] w-[30rem] md:w-2/5  [scrollbar-width:none]`}>
            <div className="grid px-3 pt-3 pb-5  rounded-md border border-neutral-200 md:grid md:gri gap-6">
              <div className={`bg-grey105  grid px-4 py-4`}>
                  {cardData?.map((card, index) => (
                      <main key={index}
                            className="flex-none w md:w-full he grid gap-5 ">
                          <div id={`balanceCardBlock${index}`}
                               className=" grid gap-5">
                              <p id={`cardTitle${index}`}
                                 className="text-black300 text-[14px] font-normal leading-[150%]">{card.title}</p>
                              <h1 id={`cardAmount${index}`}
                                  className={`${cabinetGroteskBold.className} text-meedlBlue text-[32px] font-bold leading-[120%]`}>{card.amount}</h1>
                          </div>
                      </main>
                  ))}
              </div>

                <div id={`balanceLinkBlock`}
                     className="flex bg-white  justify-end">
                    <Button  onClick={clickView} className={`bg-[#D9EAFF] ${inter.className} md:w-fit md:h-fit  underline md:text-[#142854] text-[#142854] text-[14px] shadow-none  hover:bg-[#D9EAFF] w-fit h-fit `}>
                        view
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioManagerOverviewCard;