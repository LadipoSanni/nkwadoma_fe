"use client"
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {store, useAppSelector} from "@/redux/store";
import {setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";


const SideBar = () => {
    const router = useRouter();
    const showMobileSideBar = useAppSelector(state => state.adminLayout.showMobileSideBar)
    return (
        <>
            <>
                {showMobileSideBar &&
                    <aside
                        id={'adminMobileSideBar'}
                        className={` w-[100vw] h-[100vh]  border-r-2 border-r-grey-200  flex z-10 md:hidden`}
                    >
                        <div
                            className={` w-[70vw] bg-white py-8 px-5 border border-r-grey-200 z-10 h-[100%] bg-learnSpaceWhite `}
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
                        <div id="sideBarblurBackground" className={` h-[100vh] w-[40vw] backdrop-blur-sm bg-[grey/30] `}
                            onClick={() => { store.dispatch(setShowMobileSideBar(false))}}
                        ></div>

                    </aside>

                }
                <aside
                    id={'adminMediumSideBar'}
                    className={`hidden md:flex md:bg-white md:w-[16vw] md:py-8 md:px-5  md:border-r-2 md:border-r-[#E0E3E8] md:z-10 md:h-[100%]`}
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
                            {/*cuycuy*/}
                        </div>
                        <div className={`hidden  md:grid md:w-[78%] md:mr-auto md:ml-auto `}>
                            {/*<SideBarBottomLayer/>*/}
                            {/*cycfhuycfhu*/}
                        </div>
                    </div>
                </aside>
            </>
        </>
    );
};

export default SideBar;