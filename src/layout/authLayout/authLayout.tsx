import React from 'react';
import {Providers} from "@/app/provider";
import Image from 'next/image'
import {inter, cabinetGroteskBold} from "@/app/fonts";

type props = {
    children: React.ReactNode;
}

const AuthLayout: React.FC<props> = ({children}) => {


    return (
        <Providers>
            <main id={'authLayoutContainer'} data-testid={'authLayoutContainer'}
                  className={` grid bg-[#fafbfc] h-screen px-5 py-7 md:px-16 md:py-16 md:h-screen `}>
                <Image data-testid={`authLayoutOrganizationLogo`} id={'meedlAuthLogo'} src={'/Meedl.svg'} alt={'meedl'} width={100} height={100}/>
                <div
                    className={` md:flex  md:justify-between md:content-between md:w-full  md:h-full `}
                >
                    <div className={`md:w-[50%] md:h-fit md:self-center   md:grid md:gap-4 hidden`}>
                        <h1 className={`${cabinetGroteskBold.className} text-[#101828] text-[50px] leading-tight`}>
                            Revolutionizing financing and access to loans
                        </h1>
                        <p className={`${inter.className} w-auto text-sm text-[#404653] leading-lose tracking-wide  `}>
                            Meedl serves as a nexus, connecting high net-worth individuals, financial institutions, and
                            organizations seeking impactful investment avenues with the pressing need for accessible
                            loans.
                        </p>
                    </div>
                    <div className={`w-[98%] md:w-[43%] md:grid`}>
                        {children}
                    </div>
                </div>
            </main>
        </Providers>
    );
};

export default AuthLayout;