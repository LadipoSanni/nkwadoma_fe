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
                    {/*<div*/}
                    {/*    id={``}*/}
                    {/*    className={` ${styles.whiteBackground} hidden md:grid md:w-full md:pt-6  md:pl-16  bg-blue-100 md:h-full md:bg-meedleWhite`}>*/}
                    {/*    /!*md:pt-12 md:pl-24*!/*/}

                    {/*    <div*/}
                    {/*        id={'authLayoutOrganizationLogo'}*/}
                    {/*        data-testid={`authLayoutOrganizationLogo`}*/}
                    {/*        className={` object-cover h-fit  w-fit`}*/}
                    {/*    >*/}
                    {/*        <Image src={'/Meedle Logo Primary Main.svg'} alt={'meedl'}*/}
                    {/*               width={130}*/}
                    {/*               height={90}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <p id={`Revolutionizing`}*/}
                    {/*         data-testid={`Revolutionizing`}*/}
                    {/*         className={`${cabinetGroteskBold.className} ${styles.revolunizing} md:w-fit py-0 mt-0 mb-0   grid gap-0 bg-red-200  md:mt-0 h-fit text-meedlBlue text-[36px]  `}>*/}
                    {/*        Revolutionizing*/}
                    {/*        <div className={` flex h-fit  w-fit  mt-auto mb-auto gap-2`}>*/}
                    {/*                <span className={` h-fit w-fit py-1 bg-meedlYellow`}>access</span>*/}
                    {/*                <span className={`  w-fit h-fit  py-1`} >to financing</span>*/}
                    {/*        </div>*/}
                    {/*        and loans*/}
                    {/*    </p>*/}
                    {/*    /!*<div*!/*/}
                    {/*    /!*    className={`hidden   bg-amber-100   md:grid md:w-[100%] md:h-[80%] `}*!/*/}
                    {/*    /!*>*!/*/}
                    {/*    /!*    <div*!/*/}
                    {/*    /!*        id={'authLayoutOrganizationLogo'}*!/*/}
                    {/*    /!*        data-testid={`authLayoutOrganizationLogo`}*!/*/}
                    {/*    /!*        className={` object-cover h-fit  w-fit`}*!/*/}
                    {/*    /!*    >*!/*/}
                    {/*    /!*        <Image src={'/Meedle Logo Primary Main.svg'} alt={'meedl'}*!/*/}
                    {/*    /!*               width={130}*!/*/}
                    {/*    /!*               height={90}*!/*/}
                    {/*    /!*        />*!/*/}
                    {/*    /!*    </div>*!/*/}
                    {/*    /!*    <div id={`Revolutionizing`}*!/*/}
                    {/*    /!*         data-testid={`Revolutionizing`}*!/*/}
                    {/*    /!*         className={`${cabinetGroteskBold.className} ${styles.revolunizing} md:w-fit bg-green-50  md:mt-40 h-fit text-meedlBlue text-6xl  `}>*!/*/}
                    {/*    /!*        Revolutionizing*!/*/}
                    {/*    /!*        <span className={` flex h-fit bg-red-200 w-fit  mt-auto mb-auto gap-2`}>*!/*/}
                    {/*    /!*            <p className={` h-fit w-fit py-1 bg-meedlYellow`}>access</p>*!/*/}
                    {/*    /!*            <p className={`  w-fit h-fit  py-1`} >to financing</p>*!/*/}
                    {/*    /!*       </span>*!/*/}
                    {/*    /!*    </div>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*</div>*/}

                    <section className="md:grid lg:grid hidden h-[60%] content-between  px-4 pt-4">
                        <div className="pl-16 pt-8  ">
                            {/* Logo */}
                            <Image src={`/Meedle Logo Primary Main.svg`} alt="Meedl logo" width={130} height={120} />
                        </div>

                        <div className="mb-0 place-self-end ">
                            <p className={`text-meedlBlue ${cabinetGroteskBold.className} ${styles.revolunizing}   `}>
                                Revolutionizing{' '}
                                <br />
                                <span className="bg-meedlYellow px-1">access</span> to financing
                                <br />
                                and loans
                            </p>
                        </div>
                    </section>
                    <div className={` ${styles.authLayoutChildrenDiv} md:grid md:content-center grid gap-0  px-4 py-4 bg-authBg w-[100vw] h-[100vh] md:h-[100vh] md:w-[100%]  md:bg-authBg `}>
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
                        <div className={`md:flex md:pr-10 w-full md:justify-end h-full md:w-full md:h-full`}>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </Providers>
    );
};

export default AuthLayout;