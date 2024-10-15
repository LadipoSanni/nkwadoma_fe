"use client"
import React, {useState} from 'react';
import {IoMdMenu} from "react-icons/io";
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {store} from "@/redux/store";
import {setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";
// import {Badge} from "@mui/material";
// import {FiBell} from "react-icons/fi";
// import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons"
import { ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons"


const TopBar = () => {

    const [arrowToggled, setArrowToggled] = useState(false)


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
        <>
            <header
                id="adminlayoutHeader"
                className="bg-white  flex items-center h-[8vh] border-b border-b-[blue300] md:border-b md:border-b-[blue300] w-full md:h-[10vh] md:w-[84vw] absolute md:static right-0 justify-between "
            >
                <div className={'flex  w-[96%]  mr-auto ml-auto  place-content-between'}>
                    <div className={`flex gap-2 h-[1rem] mt-auto mb-auto place-content-center `}>
                        <div id={'buttonsDiv'} className={`relative flex place-items-center md:hidden`}>
                            <IoMdMenu color='#667085' style={{height: '1rem', width: '1rem'}}
                                      onClick={openMobileSideBar}
                                      id={'LayOutHamburger'}/>
                        </div>
                        <div className={` relative flex place-items-center `}>
                            <div className={` font-medium    `}></div>
                            <div className={` hidden`}></div>
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
                                {/*<div*/}
                                {/*    className={` grid place-content-center  mt-auto mb-auto  ${styles.avatarText}  w-[70%] h-[70%]   `}>*/}
                                {/*{getFirstLetterOfWord(fullName)}*/}
                                {/*</div>*/}
                            </div>
                            <div className={` hidden md:grid md:gap-1  `}>

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
        </>
    );
};

export default TopBar;