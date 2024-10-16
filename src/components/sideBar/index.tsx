"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import {store, useAppSelector} from "@/redux/store";
import {setShowMobileSideBar} from "@/redux/slice/layout/adminLayout";
import Image from "next/image"
import NavbarItems from "@/reuseable/ui/navbarItems";
import {NavbarItemsInitialState} from "@/utils/components/NavbarItems";


const SideBar = () => {
    const router = useRouter();
    const showMobileSideBar = useAppSelector(state => state.adminLayout.showMobileSideBar)

    return (
        <div>
            {showMobileSideBar ?
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
                :
                null
            }
            <aside
                id={'adminMediumSideBar'}
                className={`hidden md:grid md:bg-white md:w-[16vw]  md:px-4  md:border-r md:border-r-[blue300] md:z-10 md:h-[100vh]`}
            >
                <div className={`md:h-[30%] md:w-full md:bg-red-200 md:grid   `}>
                        <Image
                            id={'meddleMainLogoOnAdminLayout'}
                            data-testid={'meddleMainLogoOnAdminLayout'}
                            width={120}
                            height={70}
                            style={{marginTop: 'auto', marginBottom: 'auto'}}
                            src={'/Meedle Logo Primary Main.svg'} alt={'meedleYellowLogo'}
                        />
                </div>
                <div className={` hidden md:grid md:h-fit  md:w-full `}>
                    <NavbarItems navbarItems={NavbarItemsInitialState}/>
                </div>
                <div className={`md:grid md:bottom-0 md:h-[20%] md:w-full md:bg-yellow300`}>

                </div>
            </aside>
        </div>
    );
};

export default SideBar;