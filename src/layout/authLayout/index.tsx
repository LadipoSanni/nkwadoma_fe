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
                className={` flex  h-screen w-full md:w-full  md:h-screen `}
            >
                <div
                    className={` hidden md:pt-12 md:pl-24 md:grid md:gap-10  md:w-fit  md:h-[70%] `}
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
                         className={`${cabinetGroteskBold.className} md:w-fit  h-fit text-meedlBlue text-6xl  `}>
                            Revolutionizing financing and <div className={` flex h-fit mt-auto mb-auto gap-2`}>
                        <div className={` h-fit w-fit py-1 bg-meedlYellow`}>access</div>
                        <div className={`  w-fit h-fit  py-1`} >to loans</div>
                    </div>
                    </div>

                </div>
                <div
                    className={` ${styles.authLayoutChildrenDiv} md:grid grid w-full md:w-full py-6 px-4 md:pr-24  h-full  md:px-8 md:h-full bg-authBg md:bg-authBg  `}
                >
                    <div
                        id={'authLayoutOrganizationLogo'}
                        data-testid={`authLayoutOrganizationLogo`}
                        className={` md:hidden grid object-cover`}
                    >
                        <Image src={'/Meedle Logo Primary Main.svg'} alt={'meedl'}
                               width={130}
                               height={90}
                        />
                    </div>
                    <div id={`authLayoutChildrenDiv`}
                         data-testid={`authLayoutChildrenDiv`}
                         className={`   w-full h-fit md:w-full md:absolute md:grid md:justify-items-end md:right-10  md:mt-28 md:h-[60%]  `}
                    >
                        {children}
                    </div>
                </div>
            </main>
        </Providers>
    );
};

export default AuthLayout;