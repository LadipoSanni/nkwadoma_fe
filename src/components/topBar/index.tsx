"use client"
import React, {useState} from 'react';
import {IoMdMenu} from "react-icons/io";
import {store, useAppSelector} from "@/redux/store";
import {setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";
import {inter} from"@/app/fonts"
import { ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons"
import {capitalizeFirstLetters, getFirstLetterOfWord} from "@/utils/GlobalMethods"
import styles from "@/components/topBar/index.module.css"
import {getItemFromLocalStorage} from "@/utils/localStorage";


const TopBar = () => {

    const [arrowToggled, setArrowToggled] = useState(false)
    const currentTab = getItemFromLocalStorage('currentTabItem')

    // const currentTab = useAppSelector(state => state.adminLayout.currentNavbarItem)


    const toggleArrow = ()=> {
        if (arrowToggled){
            setArrowToggled(false)
        }else {
            setArrowToggled(true)
        }
    }
    const openMobileSideBar = () => {
        store.dispatch(setShowMobileSideBar(true))
    }

    return (

            <header
                id="adminlayoutHeader"
                className="bg-white  flex items-center h-[8vh] px-4 md:px-4 border-b border-b-[blue300] md:border-b md:border-b-[blue300] w-full md:h-[10vh] md:w-[84vw] absolute md:static right-0 justify-between "
            >
                <div className={'flex  w-full  mr-auto ml-auto  place-content-between'}>
                    <div className={`flex gap-2 h-[1rem] mt-auto mb-auto place-content-center `}>
                        <div id={'buttonsDiv'} className={`relative flex place-items-center md:hidden`}>
                            <IoMdMenu color='#667085' style={{height: '1rem', width: '1rem'}}
                                      onClick={openMobileSideBar}
                                      id={'LayOutHamburger'}/>
                        </div>
                        <div className={` relative flex place-items-center `}>
                            <div className={` ${inter.className} text-sm font-bold text-[#212221]  `}>{currentTab}</div>
                        </div>
                    </div>

                    <div id="LayOutProfileAndNotification" className="flex items-center gap-5 md:gap-10">
                        <div id={'bellDiv'} className={` flex place-content-center object-fit h-[2.6rem]  w-[2.6rem] rounded-md mr-[1.7rem] `}>
                            {/*<Notifications />*/}
                            {/*   <Badge*/}
                            {/*      badgeContent={'33'}*/}
                            {/*      color="success" sx={{marginTop: 'auto', marginBottom: 'auto', height: '70%', width: '70%'}} >*/}
                            {/*             <FiBell className={` w-[100%] h-[100%] object-cover `}/>*/}
                            {/*   </Badge>*/}
                        </div>
                        <div id={'fullNameDiv'} className="flex gap-2  justify-between items-center w-[fit-content]">
                            <div
                                className={` flex place-content-center  object-fit  bg-[#E0FDEB]  mt-auto mb-auto rounded-full w-[30px] h-[30px]  md:w-[40px] md:h-[40px] `}>
                                <div
                                    className={` grid place-content-center  mt-auto mb-auto text-[#29804B]   w-[50%] h-[50%]   `}>
                                {getFirstLetterOfWord("Hannaah Emmanuel")}
                                </div>
                            </div>
                            <div className={` hidden md:grid md:gap-1  w-fit object-contain  `}>
                                <p className={` text-black500 ${styles.fullName}`}>{capitalizeFirstLetters("hannaah emmamuel")}</p>
                                <p className={` text-black500 ${styles.role}`}>Organization Admin</p>
                            </div>
                            <div id={'toggleArrowDiv'} className={``}>
                                {/*#66708*/}
                                {arrowToggled ?
                                    <ChevronUpIcon className={``} onClick={toggleArrow}/> :
                                    <ChevronDownIcon className={``}  onClick={toggleArrow}/>
                                }
                                {/*{arrowToggled &&*/}
                                {/*    <ProfileDropdown onLogoutClick={handleLogout} close={toggleArrow}/>}*/}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
    );
};

export default TopBar;