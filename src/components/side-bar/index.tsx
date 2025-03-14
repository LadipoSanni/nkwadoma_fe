"use client"
import React, { useState} from 'react';
import { useRouter} from "next/navigation";
import {persistor, store, useAppSelector} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem, setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";
import Image from "next/image"
import NavbarRouter from "../../reuseable/ui/navbarRouter";
import {LuLogOut} from "react-icons/lu";
import {navbarItemsProps, navbarRouterItemsProps} from "@/types/Component.type";
import NavbarContainer from "@/reuseable/ui/Navbar";
import {Icon} from "@iconify/react";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {MdOutlineAccountBalance, MdOutlineInventory2,MdOutlineReceiptLong, MdOutlinePayments, MdOutlineBusinessCenter,MdOutlinePersonOutline, MdOutlinePeopleAlt,MdOutlineHome} from "react-icons/md";
import {useLogoutMutation} from "@/service/users/api";
import {clearData} from "@/utils/storage";
import {GearIcon} from "@radix-ui/react-icons";





const SideBar = () => {
    const router = useRouter();
    const showMobileSideBar = useAppSelector(state => state.adminLayout.showMobileSideBar)
    const current = useAppSelector(state => state.adminLayout.currentNavbarItem)
    const currentNavBottom = useAppSelector(state => state.adminLayout.currentNavBottomItem)
    const [logout] = useLogoutMutation()
    const user_role = getUserDetailsFromStorage('user_role')


    const [role] = useState(user_role)




    const closeSideBar = () => {
        store.dispatch(setShowMobileSideBar(false))

    }
    const handleClick = ()=> {
        router.push('/settings/team')
        store.dispatch(setCurrentNavBottomItem("Settings"))
        store.dispatch(setCurrentNavbarItem('Settings'))


    }

    const clickNavbar = (name: string, route?: string, isActive?: boolean) => {
        if (isActive){
            store.dispatch(setCurrentNavBottomItem(name))
            store.dispatch(setCurrentNavbarItem(name))
            if(route){
                router.push(route)
            }
            closeSideBar()
        }

    }

    const handleLogout =  async () => {
        store.dispatch(setCurrentNavBottomItem("Logout"))
        await logout({})
        clearData()
        await persistor.purge();
         router.push("/auth/login")
        store.dispatch(setCurrentNavBottomItem(""))

    }


    const currentTextLiterals = `text-[#626F8C]`;
    const textLiterals = `text-navbarIconColor`;


    const PORTFOLIO_MANAGER: navbarRouterItemsProps[] = [
        { icon: <MdOutlineHome color={'#d7d7d7'} className={` h-[1.2rem] w-[1.2em] `}/>, id: 'Overview', name: 'Overview', isActive: false,},
        {id: 'loan', name: 'Loan', route: '/loan/loan-request', isActive: true, icon: <Icon icon="material-symbols:money-bag-outline" height={"1.2rem"} width={"1.2rem"} color={current === 'Loan' ? '#142854' : '#939cb0'}></Icon>},
        {id: 'loanProduct', name: 'Loan product', route: '/loan-product', isActive: true, icon: <MdOutlineInventory2 color={current === 'Loan Product' ? '#142854' : '#939CB0'}></MdOutlineInventory2>},
        {id: 'organizations', name: 'Organizations', route: '/organizations', isActive: true, icon: <MdOutlineAccountBalance className={` h-[1.2rem] w-[1.2em]  `} color={current === 'Organizations' ? '#142854' : '#939CB0'}></MdOutlineAccountBalance>},
        {id: 'loanee', name: 'Loanee', isActive: false, icon: <MdOutlinePersonOutline color={'#d7d7d7'} className={` h-[1.2rem] w-[1.2rem]   `}/>},
        {id: 'vehicle', name: 'Vehicle', isActive: true, route: '/vehicle', icon: <MdOutlinePayments color={current === 'Vehicle' ? '#142854' : '#939CB0'} className={` h-[1.2rem] w-[1.2rem]  `}/>},
        {id: 'investors', name: 'Investors', isActive: false, icon: <MdOutlineBusinessCenter color={'#d7d7d7'} className={` h-[1.2rem] w-[1.2rem]  `}/>},
        {id: 'financier', name: 'Financier', route: '/financier', isActive: true, icon: <MdOutlineBusinessCenter  color={current === 'Financier' ? '#142854' : '#939CB0'} className={'h-[1.2rem] w-[1.2rem]'} /> },

    ]

    const LOANEE : navbarRouterItemsProps[] = [
        {
            icon: <MdOutlineHome
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}
            />,
            id: 'overview',
            isActive: true,
            name: "Overview",
            route: '/overview'
        },
        {
            icon: <MdOutlineReceiptLong
                className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}
            />,
            id: 'wallet',
            name: "Wallet",
            isActive: false,
            route: '/wallet'
        },
        {
            icon: <Icon
                icon='iconoir:hand-cash'
                color={current === 'Loan' ? '#142854' : '#667085'}
                height={"1.2rem"}
                width={"1.3rem"}
            />,
            id: 'repayment',
            isActive: false,
            name: "Repayment",
            route: '/repayment'
        },


    ]

    const INSTITUTION_ADMIN: navbarRouterItemsProps[] = [
        {icon: <MdOutlineHome color={'#d7d7d7'} className={`h-[1.3rem] w-[1.3rem]`}/>,id: 'Overview', name: 'Overview', isActive: false},
        {id: 'program', name: 'Program', route: '/program', isActive: true, icon: <Icon icon="mynaui:book" color={current === 'Program' ? '#142854' : '#667085'} height={"1.3rem"} width={"1.3rem"}>         </Icon>},
        {id: 'cohort', name: 'Cohort', route: '/cohort', isActive: true, icon: <MdOutlinePeopleAlt className={` h-[1.3rem] w-[1.3rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}/>},
        {id: 'loan', name: 'Loan', isActive: false, icon: <Icon icon="material-symbols:money-bag-outline" height={"1.2rem"} width={"1.3rem"} color={'#d7d7d7'} className={`h-[1.3rem] w-[1.3rem]`}></Icon>},
        {id: 'loanee', name: 'Loanee', isActive: false, icon: <MdOutlinePersonOutline color={'#d7d7d7'} className={`h-[1.3rem] w-[1.3rem]`}/>},
    ]


    // const navbarContainerItems: navbarItemsProps[] = [
    //     {
    //         id: 'settings',
    //         name: 'Settings',
    //         icon: <GearIcon
    //             color={currentNavBottom === 'Settings' ? '#142854' : '#939CB0'}
    //             className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `}/>,
    //         handleClick: handleClick
    //     },
    //     {
    //         id: 'help&support',
    //         name: "Help & Support",
    //         icon: <MdHelpOutline
    //             color={currentNavBottom === "Help & Support" ? '#142854' : '#939CB0'}
    //             className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `}/>,
    //         handleClick: () => {handleRoute("Help & Support")}
    //     },

    //     {id: 'logout',
    //     name: 'Logout',
    //     icon: <LuLogOut color={currentNavBottom === "Logout" ? '#142854' : '#939CB0'}
    //     className={` h-[1.2rem] w-[1.2rem] `}/>, handleClick: handleLogout
    // },

//  ]

const settingsAndHelpItems: navbarItemsProps[] = [];

    if (role === "PORTFOLIO_MANAGER") {
        settingsAndHelpItems.push({
            id: 'settings',
            name: 'Settings',
            icon: <GearIcon color={currentNavBottom === 'Settings' ? '#142854' : '#939CB0'}
                className={`text-navbarIconColor h-[1.3rem] w-[1.3rem] `}/>,
            handleClick: handleClick
        });


    }

    const logoutItem: navbarItemsProps = {
        id: 'logout',
        name: 'Logout',
        icon: <LuLogOut color={currentNavBottom === 'Logout' ? '#142854' : '#939CB0'}
        className={` h-[1.2rem] w-[1.2rem] `}/>, handleClick: handleLogout
    };

    const navbarContainerItems: navbarItemsProps[] = [...settingsAndHelpItems, logoutItem];

    const sideBarContent = [
        {name: "PORTFOLIO_MANAGER", value: PORTFOLIO_MANAGER},
        {name: "ORGANIZATION_ADMIN", value: INSTITUTION_ADMIN},
        {name: 'LOANEE', value: LOANEE }
    ]

    const getUserSideBarByRole = (userrole?: string): navbarRouterItemsProps[] | undefined => {
        for (let i = 0; i < sideBarContent.length; i++) {
            if (sideBarContent.at(i)?.name === userrole) {
                if (sideBarContent.at(i)?.value) {
                    return sideBarContent.at(i)?.value as navbarRouterItemsProps[]
                }
            }
        }
    }




    return (
        <div className={` absolute bottom-0 grid md:static   `}>
            {showMobileSideBar &&
                <div
                    id={'adminMobileSideBar'}
                    className={` z-40 w-[100vw] overflow-hidden h-[100vh]  border-r-2 border-r-grey-200  flex md:hidden`}
                >

                    <div
                        className={` w-[70%] bg-white py-2 px-5 border border-r-grey-200 z-10 h-[100%] bg-learnSpaceWhite `}
                    >
                        <div className={`md:h-fit py-6 md:w-full   md:grid   `}>
                            <Image
                                id={'meddleMainLogoOnAdminLayout'}
                                data-testid={'meddleMainLogoOnAdminLayout'}
                                width={100}
                                height={50}
                                style={{marginTop: 'auto', marginBottom: 'auto'}}
                                src={'/Meedle Logo Primary Main.svg'} alt={'meedleYellowLogo'}
                            />

                        </div>
                        <div className={`  grid h-fit  w-full `}>
                            <NavbarRouter currentTab={current} handleClick={clickNavbar}
                                          navbarItems={getUserSideBarByRole(role)}/>

                            < NavbarContainer current={currentNavBottom} items={navbarContainerItems} />
                        </div>
                    </div>
                    <button data-testid="blurry" id="sideBarblurBackground"
                            className={` grid md:hidden   h-[100%] w-[40%] z-10 bg-[#344054B2]  `}
                            onClick={closeSideBar}
                    ></button>
                </div>
            }
            <aside
                id={'adminMediumSideBar'}
                data-testid={'adminMediumSideBar'}
                className={`hidden md:grid  md:bg-meedlWhite md:content-between md:w-[16vw]  md:px-4  md:py-6 md:border-r md:border-r-[blue300] md:z-0 md:h-[100%]`}
            >


                <div className={`  md:grid md:gap-8    md:h-fit `}>
                    <div className={`md:h-fit md:mt-2  m md:w-fit   md:grid   `}>
                        <Image
                            id={'meddleMainLogoOnAdminLayout'}
                            data-testid={'meddleMainLogoOnAdminLayout'}
                            width={100}
                            height={50}
                            src={'/Meedle Logo Primary Main.svg'} alt={'meedleYellowLogo'}
                        />
                    </div>
                    <div className={` hidden md:mt-3  md:grid md:h-fit  md:w-full `}>
                        <NavbarRouter currentTab={current} handleClick={clickNavbar}
                                      navbarItems={getUserSideBarByRole(role)}/>
                    </div>
                </div>

                <div className={` `}>
                    < NavbarContainer current={currentNavBottom} items={navbarContainerItems}/>
                </div>

            </aside>



        </div>
    );
};

export default SideBar;