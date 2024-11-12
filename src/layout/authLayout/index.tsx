"use client"
import React from 'react';
import {Providers} from "@/app/provider";
import Image from 'next/image'
import { cabinetGroteskBold} from "@/app/fonts";
import styles from "@//layout/authLayout/index.module.css"

type props = {
    children: React.ReactNode;
}

const AuthLayout: React.FC<props> = ({children}) => {



    return (
        <Providers>
            <main
                id={'authLayoutContainer'}
                data-testid={'authLayoutContainer'}
                className={`flex   `}
            >

                <div
                    id={`authBgMainContainer`}
                    data-testid={`authBgMainContainer`}
                    className={` grid md:grid md:grid-cols-2 ${styles.authBgMainContainer}  w-full h-full md:h-[100vh] md:w-[100vw] md:bg-meedlWhite bg-meedlWhite  `}
                >
                    <div
                        id={``}
                        className={` hidden md:grid md:h-full md:bg-meedleWhite`}>
                        <div
                            className={`hidden md:pt-12 md:pl-24   md:grid md:w-fit md:h-[70%] `}
                        >
                            <div
                                id={'authLayoutOrganizationLogo'}
                                data-testid={`authLayoutOrganizationLogo`}
                                className={` object-cover h-fit  w-fit`}
                            >
                                <Image src={'/Meedle Logo Primary Main.svg'} alt={'meedl'}
                                       width={130}
                                       height={90}
                                />
                            </div>
                            <div id={`Revolutionizing`}
                                 data-testid={`Revolutionizing`}
                                 className={`${cabinetGroteskBold.className} ${styles.revolunizing} md:w-fit  md:mt-40 h-fit text-meedlBlue text-6xl  `}>
                                    Revolutionizing
                                <div>financing and</div>
                                <div className={` flex h-fit mt-auto mb-auto gap-2`}>
                                    <div className={` h-fit w-fit py-1 bg-meedlYellow`}>access</div>
                                    <div className={`  w-fit h-fit  py-1`} >to loans</div>
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className={` ${styles.authLayoutChildrenDiv} md:grid md:relative grid gap-0  px-4 py-4 bg-authBg w-[100vw] h-[100vh] md:h-[100vh] md:w-[100%]  md:bg-authBg `}>
                            <div
                                id={'authLayoutOrganizationLogo'}
                                data-testid={`authLayoutOrganizationLogo`}
                                className={` md:hidden h-fit w-fit grid object-cover`}
                            >
                                <Image src={'/Meedle Logo Primary Main.svg'} alt={'meedl'}
                                       width={130}
                                       height={90}
                                />
                            </div>
                        <div className={`md:grid  md:place-items-center  md:mt-auto md:mb-auto  md:absolute md:right-0 w-full h-full md:w-full md:h-full`}>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </Providers>
    );
};

export default AuthLayout;