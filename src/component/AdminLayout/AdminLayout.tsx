import React from 'react';
import SideBar from "@/component/AdminLayout/SideBar";
import TopBar from "@/component/AdminLayout/TopBar";

type props = {
    children: React.ReactNode;
}

const AdminLayout = ({children}: props) => {
    return (
        <div id={'layout'} className={`flex h-screen  `}
        >
            <SideBar />
            <div id={'TopNavComponent  '} className={`flex flex-col gap-3 flex-grow `}>
                <TopBar />
                <div id={`children`}
                     className={` fixed  bg-[#f0f2f4] h-[92%] md:h-[90%] w-full md:w-[84%] bottom-0 right-0 `}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;