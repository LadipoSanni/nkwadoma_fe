import React from 'react';
import SideBar from "@/layout/AdminLayout/SideBar";
import TopBar from "@/layout/AdminLayout/TopBar";
import {Providers} from "@/app/provider";


type props = {
    children: React.ReactNode;
}

const AdminLayout = ({children}: props) => {
    return (
    <Providers>
        <div id={'AdminLayout'} className={`flex h-screen  `}
        >
            <SideBar/>
            <div id={'TopNavComponent  '} className={`flex flex-col gap-3 flex-grow `}>
                <TopBar/>
                <div id={`children`}
                     className={` fixed grid place-content-center bg-[#f0f2f4] h-[92%] md:h-[90%] w-full md:w-[84%] bottom-0 right-0 `}>
                    {children}
                </div>
            </div>
        </div>
    </Providers>
    );
};

export default AdminLayout;