import React from 'react';
import {Providers} from "@/app/provider";
import Image from 'next/image'

type props = {
    children: React.ReactNode;
}

const AuthLayout: React.FC<props> = ({ children }) => {



    return (
        <Providers>
            <main
                id={'authLayoutContainer'}
                data-testid={'authLayoutContainer'}
                className={` grid bg-[#fafbfc] h-screen px-4 py-4 md:px-16 md:py-16 md:h-screen `}
            >
                <div
                    id={'authLayoutOrganizationLogo'}
                    data-testid={`authLayoutOrganizationLogo`}
                    className={`text-[#0D9B48] font-mono object-cover`}
                >
                    <Image src={'/Meedl.svg'} alt={'meedl'}
                           width={100}
                           height={100}
                    />
                </div>
                <div
                    className={` md:flex md:justify-between md:content-between md:w-full md:h-[80%] `}
                >
                    <div className={`md:w-[50%] md:h-fit  md:flex md:flex-col md:gap-4 hidden`}>
                      <div className={`font-bold text-5xl`}>
                          Revolutionizing financing and access to loans
                      </div>
                       <div className={`text-xs text-[#404653] w-[90%] leading-lose tracking-wide  `}>
                           Meedl serves as a nexus, connecting high net-worth individuals, financial institutions, and organizations seeking impactful investment avenues with the pressing need for accessible loans.
                       </div>
                    </div>
                    <div className={`w-[98%]  md:w-[45%] md:grid md:justify-items-end `}>
                        {children}
                    </div>
                </div>
            </main>
        </Providers>
    );
};

export default AuthLayout;