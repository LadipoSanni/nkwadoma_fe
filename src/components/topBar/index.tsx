"use client"

import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { setShowMobileSideBar } from "@/redux/slice/layout/adminLayout";
import {inter500, inter} from "@/app/fonts";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { capitalizeFirstLetters, getFirstLetterOfWord } from "@/utils/GlobalMethods";
import { store, useAppSelector } from "@/redux/store";
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import AdminProfile from "@/features/profile/adminProfile/Index";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const TopBar = () => {
    const [arrowToggled, setArrowToggled] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const currentTab = useAppSelector(state => state.adminLayout.currentNavbarItem);
    const user_role = getUserDetailsFromStorage('user_role');
    const user_name = getUserDetailsFromStorage("user_name");

    const toggleArrow = () => {
        setArrowToggled(!arrowToggled);
        setIsPopoverOpen(!isPopoverOpen);
    };

    const openMobileSideBar = () => {
        store.dispatch(setShowMobileSideBar(true));
    };


    return (
        <header
            id="adminlayoutHeader"
            className="bg-meedlWhite md:bg-meedlWhite  flex items-center h-[8vh] px-4 md:px-4 border-b border-b-[blue300] md:border-b md:border-b-[blue300] w-full pt-2 md:h-[10vh] md:w-[84vw] static md:static right-0 justify-between "
        >
            <div className={'flex  w-full  mr-auto ml-auto  place-content-between'}>
                <div className={`flex gap-2 h-[1rem] mt-auto mb-auto place-content-center `}>
                    <div id={'buttonsDiv'} className={`relative  flex place-items-center md:hidden`}>
                        <IoMdMenu color='#667085' style={{ height: '1rem', width: '1rem' }}
                            onClick={openMobileSideBar}
                            id={'LayOutHamburger'} />
                    </div>
                    <div className={` relative flex place-items-center `}>
                        <div className={` ${inter500.className} text-base md:text-base text-black500 md:text500 `}>{currentTab}</div>
                    </div>
                </div>

                <div id="LayOutProfileAndNotification" className="flex items-center gap-5 md:gap-10">
                    <div id={'bellDiv'}
                        className={` flex place-content-center object-fit h-[2.6rem]  w-[2.6rem] rounded-md mr-[1.7rem] `}>
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
                                className={` ${inter.className} grid place-content-center  mt-auto mb-auto text-[#29804B]   w-[50%] h-[50%]   `}>
                                {getFirstLetterOfWord(user_name)}
                            </div>
                        </div>
                        <button onClick={toggleArrow} className={`${user_role === 'ORGANIZATION_ADMIN' ? 'cursor-pointer' : ''} hidden md:grid md:gap-0 md:h-fit  w-fit object-contain`}>
                            <p className={`text-black500 ${inter500.className} flex justify-start  text-sm `}>{capitalizeFirstLetters(user_name)}</p>
                            <p className={`text-black400 ${inter.className} flex justify-start text-sm`}>{capitalizeFirstLetters(user_role?.replace("_", " "))}</p>
                        </button>
                        <div id={'toggleArrowDiv'} className={``}>
                            {user_role === 'ORGANIZATION_ADMIN' && (
                                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        {arrowToggled ? (
                                            <ChevronUpIcon
                                                className={'h-4 cursor-pointer  w-5 stroke-2 text-primary200'}
                                                onClick={toggleArrow} />
                                        ) : (
                                            <ChevronDownIcon
                                                className={'h-4 cursor-pointer w-5 stroke-2 text-primary200'}
                                                onClick={toggleArrow} />
                                        )}
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className={"h-[146px] w-[17.1875rem] absolute top-3 -right-2  p-3 rounded-md bg-meedlWhite shadow-boxShadowLight"}>
                                        <AdminProfile closePopover={() => setIsPopoverOpen(false)} />
                                    </PopoverContent>
                                </Popover>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;