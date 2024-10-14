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
        <div id={'AdminLayout'} className={`h-screen w-screen flex md:flex bg-meedlBlue md:w-screen md:h-screen`}
        >
            <SideBar/>
            <div id={'LayoutMainComponent'} className={`grid h-full w-full md:h-full bg-[#f0f2f4] md:place-self-end`}>
                <TopBar/>
                <div id={'TopBarAndCenterComponent'} className={` w-[100vw] py-4 absolute bottom-0 px-4  md:py-4 md:px-4  h-[92vh] bg-[#f0f2f4] grid  md:w-[84vw] md:h-[90vh] md:bg-[#f0f2f4] `}>
                    <div className={`bg-white  w-full h-full  md:w-full md:h-full md:bg-white rounded-md md:rounded-md `}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </Providers>
    );
};

export default AdminLayout;