import React from 'react';
import SideBar from "@/component/AdminLayout/SideBar";
import TopBar from "@/component/AdminLayout/TopBar";
import { Providers } from '../provider';


type props = {
    children: React.ReactNode;
}

const Layout = ({children}: props) => {
    return (
        <div id={'AdminLayout'} className={`flex h-screen  `}
        >
            <SideBar/>
            <div id={'TopNavComponent  '} className={`flex flex-col gap-3 flex-grow `}>
                <TopBar/>
                <Providers>
                <div id={`children`}
                     className={` fixed grid place-content-center bg-[#f0f2f4] h-[92%] md:h-[90%] w-full md:w-[84%] bottom-0 right-0 `}>
                    {children}
                </div>
                </Providers>
            </div>
        </div>
    );
};


export default Layout;