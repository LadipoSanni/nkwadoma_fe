"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import {store, useAppSelector} from "@/redux/store";
import {setCurrentNavbarItem, setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";
import Image from "next/image"
import NavbarRouter from "../../reuseable/ui/navbarRouter";
import {MdOutlineHome, MdOutlinePeopleAlt} from "react-icons/md";
import {LuBook, LuPanelTop} from "react-icons/lu";
import {GoPerson} from "react-icons/go";
import {navbarItemsProps, navbarRouterItemsProps} from "@/types/Component.type";
import NavbarContainer from "@/reuseable/ui/Navbar";
import {LuLogOut} from "react-icons/lu";

const SideBar = () => {
    const router = useRouter();
    const showMobileSideBar = useAppSelector(state => state.adminLayout.showMobileSideBar)
    const currentNavbarItem = useAppSelector(state => state.adminLayout.currentNavbarItem)
    const [currentTab, setCurrentTab] = React.useState(0)

    const clickNavbar = ( name: string, index: number, id: string ) => {
        setCurrentTab(index)
        store.dispatch(setCurrentNavbarItem(name))
        router.push("/"+id)
    }
    const handleClick = () => {

    }

    const navbarRouterItems : navbarRouterItemsProps[] = [
        {icon: <MdOutlineHome style={{height: '19', width: '19', color: `${currentNavbarItem === 'Overview' ? `#142854` : `#72757A`}` }}/> , id: 'Overview', name: 'Overview', route: '/overview'},
        {id: 'program', name: 'Program', route: '/program', icon: <LuBook style={{height: '18', width: '18', color: `${currentNavbarItem  === 'Program' ?  `#142854` : `#72757A`}`}} />},
        {id: 'cohort', name: 'Cohort', route: '/cohort', icon:<MdOutlinePeopleAlt style={{height: '17', width: '17', color: `${currentNavbarItem === 'Cohort' ? `#142854` : `#72757A`}` }} />},
        {id: 'loan', name: 'Loan', route: '/loan', icon:<LuPanelTop style={{height: '17', width: '17' , color: `${currentNavbarItem === 'Loan' ? `#142854` : `#72757A`}` }} />},
        {id: 'trainee', name: 'Trainee', route: '/trainee',icon:<GoPerson style={{height: '17', width: '17' , color: `${currentNavbarItem === 'Trainee' ? `#142854` : `#72757A`}`}} />},
    ]

    const navbarConatainerItems : navbarItemsProps[] = [
        {id: 'settings', name: 'Settings', icon: <LuBook className={`text-grey100 h-[18] `}/>, handleClick: handleClick},
        {id: 'help&support', name: "Help & Support", icon: <LuBook/>, handleClick: handleClick},
        {id: 'logout', name: 'Logout', icon: <LuLogOut/>, handleClick: handleClick},

    ]



    return (
        <div>
            {showMobileSideBar &&
                <aside
                    id={'adminMobileSideBar'}
                    className={` w-[100vw] h-[100vh]  border-r-2 border-r-grey-200  flex z-10 md:hidden`}
                >
                    <div
                        className={` w-[70vw] bg-white py-2 px-5 border border-r-grey-200 z-10 h-[100%] bg-learnSpaceWhite `}
                    >

                        {/*<div className={`h-[100%] w-[96%] bg-purple-200 `}>*/}
                        {/*    <div id={'fund'} onClick={() => router.push('')} className={`bg-red-200 w-[92%]`}>*/}
                        {/*        <div id={'SMLogo'}*/}
                        {/*             className=" md:w-[100%] md:bg-amber-100 md:flex md:object-fit ">*/}
                        {/*            <Avatar>*/}
                        {/*                <AvatarImage src={'/Meedle Logo Primary Yellow.svg'} alt={'meedleYellowLogo'}/>*/}
                        {/*            </Avatar>*/}
                        {/*            /!*<Avatar id={'Letters'} src={'/learnSpaceLetters.svg'}*!/*/}
                        {/*            /!*       className={` bg-green-200 object-fit w-[78%]`}*!/*/}
                        {/*            /!*        variant={"square"}*!/*/}
                        {/*            /!*       alt="learn-space-logo"/>*!/*/}

                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div id={'SideNavButtonDiv'} className={`w-full`}>*/}
                        {/*        /!*<SideNavButton*!/*/}
                        {/*        /!*    selectedName={selectedName}*!/*/}
                        {/*        /!*    barCollapse={barCollapse}*!/*/}
                        {/*        /!*//*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div data-testid="blurry" id="sideBarblurBackground"
                         className={` h-[100vh] w-[40vw] backdrop-blur-sm bg-[grey/30] `}
                         onClick={() => {
                             store.dispatch(setShowMobileSideBar(false))
                         }}
                    ></div>

                </aside>
            }
            <aside
                id={'adminMediumSideBar'}
                data-testid={'adminMediumSideBar'}
                className={`hidden md:grid md:bg-white md:w-[16vw]  md:px-4  md:border-r md:border-r-[blue300] md:z-10 md:h-[100vh]`}
            >
                <div className={`grid gap-4   h-fit `}>
                    <div className={`md:h-fit py-5 md:w-full   md:grid   `}>
                        <Image
                            id={'meddleMainLogoOnAdminLayout'}
                            data-testid={'meddleMainLogoOnAdminLayout'}
                            width={100}
                            height={50}
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                            src={'/Meedle Logo Primary Main.svg'} alt={'meedleYellowLogo'}
                        />
                    </div>
                    <div className={` hidden md:grid md:h-fit  md:w-full `}>
                        <NavbarRouter currentTab={currentTab} handleClick={clickNavbar} navbarItems={navbarRouterItems}/>
                    </div>
                </div>

                <div className={`md:grid md:bottom-0 md:h-fit md:w-full `}>
                    <div  className={` hidden md:grid md:h-fit  md:w-full `}>
                        < NavbarContainer items={navbarConatainerItems}/>
                    </div>
                    <div
                        className={``}
                    >

                    </div>
                </div>
            </aside>
        </div>
    );
};

export default SideBar;