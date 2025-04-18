import {navbarItemsProps, navbarRouterItemsProps} from "@/types/Component.type";
import {Icon} from "@iconify/react";
import {
    MdOutlineAccountBalance,
    MdOutlineInventory2,
    MdOutlinePayments,
    MdOutlineBusinessCenter,
    MdOutlinePersonOutline,
    MdOutlineHome,
    MdOutlineAccountBalanceWallet, MdOutlinePeopleAlt
} from "react-icons/md";
import React from "react";
import {GearIcon} from "@radix-ui/react-icons";
import {LuLogOut} from "react-icons/lu";

const currentTextLiterals = `text-meedlBlue md:text-meedlBlue`;
const textLiterals = `text-[#626F8C] md:text-[#626F8C] `;


export const getPortfolioManagerSideBarItems =  (currentItem: string) => {
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



export const getLoaneeSideBarItems = (currentItem: string, isLoaneeIdentityVerified: boolean) => {

    const items : navbarRouterItemsProps[] = [
        {icon: <MdOutlineHome className={` h-[1.2rem] w-[1.2rem]  ${isLoaneeIdentityVerified ? `${currentItem === 'Overview' ? currentTextLiterals : textLiterals} ` : 'text-navbarIconColor md:text-navbarIconColor'} `}/>, id: 'overview', isActive: isLoaneeIdentityVerified, name: "Overview", route: '/Overview'},
        {icon: <MdOutlineAccountBalanceWallet className={` h-[1.2rem] w-[1.2rem] text-[#d7d7d7] md:text-[#d7d7d7`}/>, id: 'wallet', name: "Wallet", isActive: false, route: '/wallet'},
        {icon: <Icon icon='iconoir:hand-cash' color={'#d7d7d7'} height={"1.2rem"} width={"1.3rem"}/>, id: 'repayment', isActive: false, name: "Repayment", route: '/repayment'},
    ]
    return items;
}

export const getInstituteAdminSideBarItems = (currentItem: string) => {
    const items: navbarRouterItemsProps[] = [
        {icon: <MdOutlineHome color={'#d7d7d7'} className={`h-[1.3rem] w-[1.3rem]`}/>,id: 'Overview', name: 'Overview', isActive: false, route:'/Overview'},
        {id: 'program', name: 'Program', route: '/program', isActive: true, icon: <Icon icon="mynaui:book" color={currentItem === 'Program' ? '#142854' : '#667085'} height={"1.3rem"} width={"1.3rem"}>         </Icon>},
        {id: 'cohort', name: 'Cohort', route: '/cohort', isActive: true, icon: <MdOutlinePeopleAlt className={` h-[1.3rem] w-[1.3rem] ${currentItem === 'Cohort' ? currentTextLiterals : textLiterals} `}/>},
        {id: 'loan', name: 'Loan', isActive: false, icon: <Icon icon="material-symbols:money-bag-outline" height={"1.2rem"} width={"1.3rem"} color={'#d7d7d7'} className={`h-[1.3rem] w-[1.3rem]`}></Icon>},
        {id: 'loanee', name: 'Loanee', isActive: false, icon: <MdOutlinePersonOutline color={'#d7d7d7'} className={`h-[1.3rem] w-[1.3rem]`}/>},
    ]
    return items;
}

export const getSettingItem = ( currentNavBottomItem: string,handleClick:()=> void , userRole?: string | undefined) => {
    const item: navbarItemsProps[] = [];

    if (userRole === "PORTFOLIO_MANAGER") {
        item.push(
            {id: 'settings', name: 'Settings', icon: <GearIcon color={currentNavBottomItem === 'Settings' ? '#142854' : '#939CB0'} className={`text-navbarIconColor h-[1.3rem] w-[1.3rem] `}/>, handleClick: handleClick}
        );
    }
    return item;
}

export const getLogoutItem = (currentNavBottomItem: string, handleClick: ()=> void)=> {
    const item: navbarItemsProps =
        {id: 'logout', name: 'Logout', icon: <LuLogOut color={currentNavBottomItem === 'Logout' ? '#142854' : '#939CB0'} className={` h-[1.2rem] w-[1.2rem] `}/>, handleClick: handleClick
    };
    return item;
}


export const getFinancierSideBarItems = (currentNavItem: string) => {
    const item: navbarRouterItemsProps[] = [
        {
            icon: <MdOutlineHome
                className={` h-[1.2rem] w-[1.2rem] ${currentNavItem === 'Overview' ? currentTextLiterals : textLiterals} `}/>,
            id: 'overview',
            isActive: true,
            name: "Overview",
            route: '/Overview'
        },
        {
            id: 'marketplace',
            name: 'Marketplace',
            route: '/marketplace',
            isActive: true,
            icon: <MdOutlineAccountBalance className={` h-[1.2rem] w-[1.2em]  `} color={ currentNavItem === 'Marketplace' ? '#142854':'#626F8C'}/>
        },
        {
            icon: <Icon icon='iconoir:hand-cash' color={ currentNavItem === 'My Investment' ? '#142854':'#626F8C'} height={"1.2rem"} width={"1.3rem"}/>,
            id: 'myInvestment',
            isActive: true,
            name: "My Investment",
            route: '/my-investment'
        },
    ]
    return item;
}
