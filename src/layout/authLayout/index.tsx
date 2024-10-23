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
                className={`flex md:w-screen w-full md:h-screen h-screen  md:grid md:grid-cols-2  md:place-content-between `}
            >
                <div
                    className={`hidden md:pt-12 md:pl-24 md:grid md:w-fit md:h-fit `}
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
                         className={`${cabinetGroteskBold.className} md:w-fit md:mt-40 h-fit text-meedlBlue text-6xl  `}>
                            Revolutionizing
                        <div>financing and</div>
                        <div className={` flex h-fit mt-auto mb-auto gap-2`}>
                            <div className={` h-fit w-fit py-1 bg-meedlYellow`}>access</div>
                            <div className={`  w-fit h-fit  py-1`} >to loans</div>
                       </div>
                    </div>

                </div>
                <div
                    id={`sliceBlueBackground`}
                    data-testid={`sliceBlueBackground`}
                    // className={` ${styles.authLayoutChildrenDiv} md:flex md: grid md: w-full md:w-fit md:pt-44 md:px-24 py-6 px-4  h-[100%] md:h-[100vh] bg-authBg md:bg-authBg  `}
                    className={`${styles.authLayoutChildrenDiv} md:grid grid w-full md:pt-40 md:pr-20 md:pl-24 py-6 px-4 md:place-self-end md:w-[100%] md:bg-authBg md:h-[100vh] `}
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
                         className={` w-full md:w-[100%] md:bg-red-200 h-fit pb-72 md:pb-0 md:h-fit  md:grid md:justify-items-end`}
                         // className={`   w-full h-fit md:w-full md:bg-red-200 md:mt- mb-24  md:grid md:justify-items-end    md:h-fit  `}
                    >
                        {children}
                    </div>
                </div>
            </main>
        </Providers>
    );
};

export default AuthLayout;