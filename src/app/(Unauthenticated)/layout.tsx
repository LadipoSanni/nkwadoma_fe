'use client'
import React from 'react';
import {Providers} from "@/app/provider";
import styles from "@/layout/meedl-layout/index.module.css";
import Image from "next/image";
import { MdAccountBalance } from "react-icons/md";
import {inter, inter600} from "@/app/fonts";
import {useRouter} from "next/navigation";

type props = {
    children: React.ReactNode;
}
const Layout = ({children}: props) => {
    const router = useRouter()
    return (
        <Providers>
            <div id={'Layout'} className={` h-screen w-screen flex  bg-blue-100`}>
                <div
                    id={'layoutContainer'}
                    className={` hidden md:grid md:w-[18%] md:h-[100vh] md:py-8 md:px-6 md:border-r md:border-r-grey-200 md:bg-white `}
                >
                    <div id={`sideBar`} className={` h-fit w-full grid  gap-14 `}>
                        <div className={`md:h-fit  md:w-full md:  md:grid   `}>
                            <Image
                                id={'meddleMainLogo'}
                                data-testid={'meddleMainLogo'}
                                width={130}
                                height={50}
                                style={{marginTop: 'auto', marginBottom: 'auto'}}
                                src={'/Meedle Logo Primary Main.svg'} alt={'meedleYellowLogo'}
                            />

                        </div>
                        <div
                            id={'navbarItem'}
                            className={` w-full h-fit  `}
                        >
                            <button
                                id={`iteMarket`}
                                className={` flex gap-2 t cursor-not-allowed  `}
                            >
                                <MdAccountBalance id={'itemIcon'} className={` mt-auto mb-auto text-[#939CB0]`} />
                                <p id={'itemName'} className={` ${inter.className} text-[14px] text-[#626F8C] `}>Marketplace</p>

                            </button>

                        </div>
                    </div>
                </div>
                <div
                    id={'component'}
                    className={` w-full md:w-[82%] grid h-[100vh] bg-orange-50 `}
                >
                    <div className={` h-[12vh] md:flex md:justify-end  flex justify-between  px-6  border-b  pt-auto pb-auto  border-grey-200 w-full bg-white `}>
                        <div className={`h-fit w-fit  mt-auto mb-auto   md:hidden   `}>
                            <Image
                                id={'meddleMainLogoOnAdminLayout'}
                                data-testid={'meddleMainLogoOnAdminLayout'}
                                width={130}
                                height={50}
                                style={{marginTop: 'auto', marginBottom: 'auto'}}
                                src={'/Meedle Logo Primary Main.svg'} alt={'meedleYellowLogo'}
                            />

                        </div>
                        <button
                            id={`topBatLoginComponent`}
                            onClick={() => {router.push('/auth/login')}}
                            className={` w-fit h-fit py-2 rounded-md text-[14px] ${inter600.className} px-4 border mt-auto mb-auto border-meedlBlue `}
                        >
                            Login
                        </button>
                    </div>
                    <div
                        id={'mainComponent'}
                        className={` w-f h-[88vh] bg-[#f0f2f4] px-5 py-5 `}
                    >
                        <div id={'childrenComponent'} className={` w-full ${styles.container} h-full rounded-md bg-white `}>
                            {children}
                        </div>

                    </div>
                </div>
            </div>
        </Providers>
    );
};

export default Layout;