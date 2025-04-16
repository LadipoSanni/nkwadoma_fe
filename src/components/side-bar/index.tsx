"use client"
import React from 'react';
import {redirect, useRouter} from "next/navigation";
import {persistor, RootState, store, useAppSelector} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem, setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";
import {LuLogOut} from "react-icons/lu";
import {navbarItemsProps, navbarRouterItemsProps} from "@/types/Component.type";
import {Icon} from "@iconify/react";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {MdOutlineReceiptLong,MdOutlinePersonOutline, MdOutlinePeopleAlt,MdOutlineHome} from "react-icons/md";
import {useLogoutMutation} from "@/service/users/api";
import {clearData} from "@/utils/storage";
import {GearIcon} from "@radix-ui/react-icons";
import {useSelector} from "react-redux";
import {
    getFinancierSideBarItems,
    getInstituteAdminSideBarItems,
    getLoaneeSideBarItems, getLogoutItem,
    getPortfolioManagerSideBarItems,
    getSettingItem
} from "@/utils/sideBarItems";





const SideBar = () => {
    const router = useRouter();
    const showMobileSideBar = useAppSelector(state => state.adminLayout.showMobileSideBar)
    const current = useAppSelector(state => state.adminLayout.currentNavbarItem)
    const currentNavBottom = useAppSelector(state => state.adminLayout.currentNavBottomItem)
    const [logout] = useLogoutMutation()
    const {  isLoaneeIdentityVerified } = useSelector((state: RootState) => state.loanReferral);

    const userRole = getUserDetailsFromStorage('user_role') ? getUserDetailsFromStorage('user_role')  : "user role";






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
        router.push("/auth/login")
        clearData()
        await persistor.purge();
        store.dispatch(setCurrentNavBottomItem(""))

    }


    const currentTextLiterals = `text-[#626F8C] md:text-[#626F8C]`;
    const textLiterals = `text-navbarIconColor md:text-navbarIconColor`;


    const settingItem = getSettingItem( currentNavBottom, handleClick, userRole)
    const logoutItem = getLogoutItem(currentNavBottom,handleLogout)

    ]

    const LOANEE : navbarRouterItemsProps[] = [
        {
            icon: <MdOutlineHome
                className={` h-[1.2rem] w-[1.2rem] ${isLoaneeIdentityVerified ? `${current === 'Overview' ? currentTextLiterals : textLiterals} ` : 'text-navbarIconColor md:text-navbarIconColor'} `}
            />,
            id: 'overview',
            isActive: isLoaneeIdentityVerified,
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
        {icon: <MdOutlineHome color={'#d7d7d7'} className={`h-[1.2rem] w-[1.2rem]`}/>,id: 'Overview', name: 'Overview', isActive: false},
        {id: 'program', name: 'Program', route: '/program', isActive: true, icon: <Icon icon="mynaui:book" color={current === 'Program' ? '#142854' : '#667085'} height={"1.2rem"} width={"1.3rem"}>         </Icon>},
        {id: 'cohort', name: 'Cohort', route: '/cohort', isActive: true, icon: <MdOutlinePeopleAlt className={` h-[1.2rem] w-[1.2rem] ${current === 'Cohort' ? currentTextLiterals : textLiterals} `}/>},
        {id: 'loan', name: 'Loan', isActive: false, icon: <Icon icon="material-symbols:money-bag-outline" height={"1.2rem"} width={"1.3rem"} color={'#d7d7d7'} className={`h-[1.2rem] w-[1.2rem]`}></Icon>},
        {id: 'loanee', name: 'Loanee', isActive: false, icon: <MdOutlinePersonOutline color={'#d7d7d7'} className={`h-[1.2rem] w-[1.2rem]`}/>},
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
                className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `}/>,
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
    const navbarContainerItems: navbarItemsProps[] = [...settingItem, logoutItem];

    const sideBarContent = [
        {name: "PORTFOLIO_MANAGER", value: getPortfolioManagerSideBarItems(current)},
        {name: "ORGANIZATION_ADMIN", value: getInstituteAdminSideBarItems(current)},
        {name: 'LOANEE', value: getLoaneeSideBarItems(current) },
        {name: 'FINANCIER', value: getFinancierSideBarItems(current)},
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
                                          navbarItems={getUserSideBarByRole(userRole)}/>

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
                                      navbarItems={getUserSideBarByRole(userRole)}/>
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