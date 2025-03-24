import { navbarRouterItemsProps} from "@/types/Component.type";
import {Icon} from "@iconify/react";
import {
    MdOutlineAccountBalance,
    MdOutlineInventory2,
    MdOutlinePayments,
    MdOutlineBusinessCenter,
    MdOutlinePersonOutline,
    MdOutlineHome,
    MdOutlineAccountBalanceWallet
} from "react-icons/md";
import React from "react";

const currentTextLiterals = `text-meedlBlue md:text-meedlBlue`;
const textLiterals = `text-[#626F8C] md:text-[#626F8C] `;


export const portfolioManagerSideBarItems =  (currentItem: string) => {
    const items: navbarRouterItemsProps[] = [
        { icon: <MdOutlineHome color={'#d7d7d7'} className={` h-[1.2rem] w-[1.2em] `}/>, id: 'Overview', name: 'Overview', isActive: false,},
        {id: 'loan', name: 'Loan', route: '/loan/loan-request', isActive: true, icon: <Icon icon="material-symbols:money-bag-outline" height={"1.2rem"} width={"1.2rem"} color={currentItem === 'Loan' ? '#142854' : '#939cb0'}></Icon>},
        {id: 'loanProduct', name: 'Loan product', route: '/loan-product', isActive: true, icon: <MdOutlineInventory2 color={currentItem === 'Loan product' ? '#142854' : '#939CB0'}></MdOutlineInventory2>},
        {id: 'organizations', name: 'Organizations', route: '/organizations', isActive: true, icon: <MdOutlineAccountBalance className={` h-[1.2rem] w-[1.2em]  `} color={currentItem === 'Organizations' ? '#142854' : '#939CB0'}></MdOutlineAccountBalance>},
        {id: 'loanee', name: 'Loanee', isActive: false, icon: <MdOutlinePersonOutline color={'#d7d7d7'} className={` h-[1.2rem] w-[1.2rem]   `}/>},
        {id: 'vehicle', name: 'Investment vehicle', isActive: true, route: '/vehicle/commercial-vehicle', icon: <MdOutlinePayments color={currentItem === 'Investment vehicle' ? '#142854' : '#939CB0'} className={` h-[1.2rem] w-[1.2rem]  `}/>},
        {id: 'financier', name: 'Financier', route: '/financier', isActive: true, icon: <MdOutlineBusinessCenter  color={currentItem === 'Financier' ? '#142854' : '#939CB0'} className={'h-[1.2rem] w-[1.2rem]'} /> },

    ]
    
    return items;
}



export const loaneeSideBarItems = ( current: string) => {

    const items : navbarRouterItemsProps[] = [
        {icon: <MdOutlineHome className={` h-[1.2rem] w-[1.2rem] ${current === 'Overview' ? currentTextLiterals : textLiterals} `}/>, id: 'overview', isActive: true, name: "Overview", route: '/overview'},
        {icon: <MdOutlineAccountBalanceWallet className={` h-[1.2rem] w-[1.2rem] text-[#d7d7d7] md:text-[#d7d7d7`}/>, id: 'wallet', name: "Wallet", isActive: false, route: '/wallet'},
        {icon: <Icon icon='iconoir:hand-cash' color={'#d7d7d7'} height={"1.2rem"} width={"1.3rem"}/>, id: 'repayment', isActive: false, name: "Repayment", route: '/repayment'},
    ]
    return items;
}

