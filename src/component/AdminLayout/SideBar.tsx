"use client"
import React, {useState} from 'react';
import Image from "next/image"
import {useRouter} from "next/navigation";
import {Avatar} from "@mui/material";

const SideBar = () => {
    const router = useRouter();
    const [showSide, setShowSide] = useState(false)
    return (
        <>
            <>
                {showSide &&
                    <aside
                        id={'mobileSideBar'}
                        className={` w-[100vw] h-[100vh] border border-r-grey-200  flex z-10 md:hidden`}
                    >
                        <div
                            className={` w-[70vw]  py-8 px-5 border border-r-grey-200 z-10 h-[100%] bg-learnSpaceWhite `}
                        >
                            <div className={`h-[100%] w-[96%] `}>
                                <div id={'fund'} onClick={() => router.push('')} className={``}>
                                    <div id={'imagesDiv'}
                                         className=" w-[60%] flex items-center mb-12 gap-2 object-fit ">
                                        {/*<Avatar id={'learnSpaceLogo'} src={'/Group 48096834.svg'}*/}
                                        {/*       className={` w-[20%]`}*/}
                                        {/*       alt="learn-space-logo"/>*/}
                                        {/*<Avatar id={'learnSpaceLetters'} src={'/learnSpaceLetters.svg'}*/}
                                        {/*       className={` w-[78%]`}*/}
                                        {/*       alt="learn-space-logo"/>*/}

                                    </div>
                                </div>
                                <div id={'SideNavButtonDiv'} className={`w-full`}>
                                    {/*<SideNavButton*/}
                                    {/*    selectedName={selectedName}*/}
                                    {/*    barCollapse={barCollapse}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        </div>
                        <div className={` h-[100vh] w-[40vw] backdrop-blur-sm bg-[grey/30] `}
                            // onClick={() => { store.dispatch(layOutActions.setHamburger(false))}}
                        ></div>

                    </aside>

                }
                <aside
                    id={'barCollapse'}
                    className={`  hidden md:flex  md:w-[16vw] py-8 px-5 border border-r-[#E0E3E8] z-10 h-[100%] bg-pink-200  `}
                >

                    <div className={`h-[100%] w-[90%] mr-auto ml-auto`}>
                        <div id={'fund'}  className={``}>
                            <div id={'imagesDiv'} className=" w-[60%] flex items-center mb-12 gap-2 object-fit  ml-4">

                            </div>
                        </div>
                        <div id={'SideNavButtonDiv'} className={`w-full`}>
                            {/*<SideNavButton*/}
                            {/*    selectedName={selectedName}*/}
                            {/*    barCollapse={barCollapse}*/}
                            {/*/>*/}
                        </div>
                        <div className={`hidden  md:grid md:w-[78%] md:mr-auto md:ml-auto `}>
                            {/*<SideBarBottomLayer/>*/}
                        </div>
                    </div>
                </aside>
            </>
        </>
    );
};

export default SideBar;