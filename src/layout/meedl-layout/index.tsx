'use client'
import React from 'react';
import SideBar from "@/components/side-bar/index";
import TopBar from "@/components/topBar/index";
import {Providers} from "@/app/provider";
import styles from "./index.module.css"


type props = {
    children: React.ReactNode;
}

const MeedlLayout = ({children}: props) => {



    return (
        <Providers>
            <div id={'AdminLayout'}
                 className={`h-screen w-screen grid md:flex md:overflow-hidden md:relative md:w-screen md:h-screen`}
            >
                <SideBar/>
                <div id={'LayoutMainComponent'}
                     className={`grid h-[100vh] w-[100vw] md:h-full bg-[#f0f2f4] md:place-self-end`}>
                    <TopBar/>
                    <div id={'TopBarAndCenterComponent'}
                         className={` w-[100%] py-4 absolute bottom-0 px-4  md:py-4 md:px-4  h-[92%] bg-[#f0f2f4] grid  md:w-[84vw] md:max:h-[90vh] md:bg-[#f0f2f4] `}>
                        <div
                            className={`bg-white ${styles.container} relative  w-full h-full  md:w-full md:h-full md:bg-white overflow-x-hidden rounded-md md:rounded-md z-0`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Providers>
    );
};

export default MeedlLayout;