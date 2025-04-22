import React from "react";
import {cabinetGrotesk, inter} from '@/app/fonts';
import {Button} from "@/components/ui/button";

interface CardData {
    title: string;
    amount: string;
    linkText: string;
}

interface BalanceCardProps {
    cardData: CardData[];
}

const BalanceCard: React.FC<BalanceCardProps> = ({ cardData }) => {
    return (
        <div id={'balanceCard'}
             className={`${inter.className} flex overflow-x-auto md:grid md:overflow-visible 
                        snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden 
                        [-ms-overflow-style:none] [scrollbar-width:none]`}>
            <div className="flex md:grid md:grid-cols-3 gap-6">
                {cardData.map((card, index) => (
                    <main key={index}
                          className="flex-none w-[280px] md:w-full he grid gap-5 px-3 pt-3 pb-5 rounded-md border border-neutral-200">
                        <div id={`balanceCardBlock${index}`}
                             className="bg-grey105 p-5 grid gap-5">
                            <p id={`cardTitle${index}`}
                               className="text-black300 text-[14px] font-normal leading-[150%]">{card.title}</p>
                            <h1 id={`cardAmount${index}`}
                                className={`${cabinetGrotesk.className} text-meedlBlue text-[32px] font-bold leading-[120%]`}>{card.amount}</h1>
                        </div>
                        <div id={`balanceLinkBlock${index}`}
                             className="grid place-items-end items-center h-[4.54vh]">
                            <Button className="bg-grey50 shadow-none cursor-not-allowed hover:bg-grey50 w-auto px-4">
                                <h2 id={`cardLinkText${index}`}
                                    className="text-black300 text-[14px] gap-2 flex font-normal leading-[150%] underline">{card.linkText}</h2>
                            </Button>
                        </div>
                    </main>
                ))}
            </div>
        </div>
    );
};

export default BalanceCard;