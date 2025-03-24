"use client"
import React from 'react';
import { useRouter} from "next/navigation";
import {persistor, store, useAppSelector} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem, setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";
import Image from "next/image"
import NavbarRouter from "../../reuseable/ui/navbarRouter";
import {navbarItemsProps, navbarRouterItemsProps} from "@/types/Component.type";
import NavbarContainer from "@/reuseable/ui/Navbar";
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {useLogoutMutation} from "@/service/users/api";
import {clearData} from "@/utils/storage";
import {
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
        clearData()
        await persistor.purge();
         router.push("/auth/login")
        store.dispatch(setCurrentNavBottomItem(""))

    }




    const settingItem = getSettingItem( currentNavBottom, handleClick, userRole)
    const logoutItem = getLogoutItem(currentNavBottom,handleLogout)

    const navbarContainerItems: navbarItemsProps[] = [...settingItem, logoutItem];

    const sideBarContent = [
        {name: "PORTFOLIO_MANAGER", value: getPortfolioManagerSideBarItems(current)},
        {name: "ORGANIZATION_ADMIN", value: getInstituteAdminSideBarItems(current)},
        {name: 'LOANEE', value: getLoaneeSideBarItems(current) }
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