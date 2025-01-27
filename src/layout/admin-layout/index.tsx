'use client'
import React, {useEffect} from 'react';
import SideBar from "@/components/side-bar/index";
import TopBar from "@/components/topBar/index";
import {Providers} from "@/app/provider";
import styles from "./index.module.css"
import {getUserDetailsFromStorage} from "@/components/topBar/action";
import {useToast} from "@/hooks/use-toast";
import {isTokenValid} from "@/utils/GlobalMethods";
import {clearData} from "@/utils/storage";
import {redirect} from "next/navigation";

type props = {
    children: React.ReactNode;
}

const AdminLayout = ({children}: props) => {
    const cookie = getUserDetailsFromStorage('access_token')
    const {toast} = useToast()
    const response = isTokenValid(cookie ? cookie : '')

    useEffect(() => {
        checkUserToken(response)
    }, [response]);

    const checkUserToken = (isTokenValid: boolean) => {
        if (!isTokenValid) {
            clearData()
            toast({
                description: "Session expired. Please login again",
                status: "error",
            });
            redirect("/auth/login")
        }
    }


    return (
        <Providers>
            <div id={'AdminLayout'}
                 className={`h-screen w-screen grid md:flex md:overflow-hidden md:relative md:w-screen md:h-screen`}

            >
                <SideBar/>
                <div id={'LayoutMainComponent'}
                     className={`grid h-full w-full md:h-full bg-[#f0f2f4] md:place-self-end`}>
                    <TopBar/>
                    <div id={'TopBarAndCenterComponent'}
                         className={` w-[100vw] py-4 absolute bottom-0 px-4  md:py-4 md:px-4  h-[92vh] bg-[#f0f2f4] grid  md:w-[84vw] md:h-[90vh] md:bg-[#f0f2f4] `}>
                        <div
                            className={`bg-white ${styles.container} relative  w-full h-full  md:w-full md:h-full md:bg-white rounded-md md:rounded-md z-0`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Providers>
    );
};

export default AdminLayout;