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
import {GearIcon, QuestionMarkCircledIcon} from "@radix-ui/react-icons";
// import { usePathname } from 'next/navigation'
// import {removeContent, capitalizeFirstLetters} from "@/utils/GlobalMethods";


const SideBar = () => {
    const router = useRouter();
    // const path = usePathname()
    const showMobileSideBar = useAppSelector(state => state.adminLayout.showMobileSideBar)
    const currentNavbarItem = useAppSelector(state => state.adminLayout.currentNavbarItem)
    // const [pathname ]= React.useState(removeContent("/",path))
    const [currentTab, setCurrentTab] = React.useState(currentNavbarItem)

    // console.log("current tab:", pathname)
    // useEffect(() => {
    //     const route = capitalizeFirstLetters(currentTab);
    //     setCurrentTab(route)
    // }, []);

    const clickNavbar = ( name: string,  id: string ) => {
        setCurrentTab(name)
        store.dispatch(setCurrentNavbarItem(name))
        router.push("/"+id)
    }
    const handleClick = () => {

    }

    const navbarRouterItems : navbarRouterItemsProps[] = [
        {icon: <MdOutlineHome className={` h-[1.2rem] w-[1.2rem] ${(currentNavbarItem !== 'Overview' ? `text-navbarIconColor` : `text-meedleBlue`)} `}  /> , id: 'Overview', name: 'Overview', route: '/overview'},
        {id: 'program', name: 'Program', route: '/program', icon: <LuBook className={` h-[1.2rem] w-[1.2rem] ${(currentNavbarItem !== 'Program' ? `text-navbarIconColor` : `text-meedleBlue`)} `} />},
        {id: 'cohort', name: 'Cohort', route: '/cohort', icon:<MdOutlinePeopleAlt className={` h-[1.2rem] w-[1.2rem] ${currentNavbarItem === 'Cohort' ? `text-meedleBlue` : `text-navbarIconColor`} `}  />},
        {id: 'loan', name: 'Loan', route: '/loan', icon:<LuPanelTop className={` h-[1.2rem] w-[1.2rem] ${currentNavbarItem === 'Loan' ? `text-meedleBlue` : `text-navbarIconColor`} `}  />},
        {id: 'trainee', name: 'Trainee', route: '/trainee',icon:<GoPerson className={` h-[1.2rem] w-[1.2rem] ${currentNavbarItem === 'Trainee' ? `text-meedleBlue` : `text-navbarIconColor`} `}  />},
    ]

    const navbarConatainerItems : navbarItemsProps[] = [
        {id: 'settings', name: 'Settings', icon: <GearIcon className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `}/>, handleClick: handleClick},
        {id: 'help&support', name: "Help & Support", icon: <QuestionMarkCircledIcon className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `} />, handleClick: handleClick},
        {id: 'logout', name: 'Logout', icon: <LuLogOut className={`text-navbarIconColor h-[1.2rem] w-[1.2rem] `} />, handleClick: handleClick},

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
                className={`hidden md:grid md:relative md:bg-white md:w-[16vw]  md:px-4  md:border-r md:border-r-[blue300] md:z-10 md:h-[100vh]`}
            >
                <div className={`grid gap-4   h-fit `}>
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
                    <div className={` hidden md:grid md:h-fit  md:w-full `}>
                        <NavbarRouter currentTab={currentTab} handleClick={clickNavbar} navbarItems={navbarRouterItems}/>
                    </div>
                </div>

                <div className={`md:absolute  md:bottom-0 gap-3  px-4 md:h-fit md:w-full `}>
                    <div  className={` hidden md:grid md:h-fit  md:w-full `}>
                        < NavbarContainer items={navbarConatainerItems}/>
                    </div>
                    <div
                        className={`h-fit w-full border-t-2  border-t-navBorder`}
                    >
                        <div
                            className={`h-fit w-full flex gap-2 pt-4 pb-12`}
                        >
                            <div
                                className={` md:grid  md:place-items-center md:object-fit md:text-black md:text-xs md:font-bold  md:bg-[#F7F7F7]   md:rounded-full w-[30px] h-[30px]  md:w-[3.5rem] md:h-[3.5rem] `}>
                               <div className={`break-all w-[80%] `}>Alt ___ school</div>
                            </div>
                            <div className={`grid  mt-auto mb-auto h-[3rem]`}>
                                <p className={`  text-black text-base`}>Alt school Africa </p>
                                <p className={` text-gray1 text-sm `}>Education</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default SideBar;