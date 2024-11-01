'use client'
import React from 'react';
import Image from 'next/legacy/image'
import {useRouter} from 'next/navigation'

interface props {
    header?: string,
    email?: string | null,
}

const AuthEmail = ({header, email}: props) => {

    const router = useRouter()


    return (
        <div id={'authEmailModal'} data-testid={'authEmailModal'}
             className={`w-full mr-3 h-fit px-3 md:mt-7 md:pr-10  py-3 rounded-md bg-white grid grid-rows-3 place-self-center  border border-slate-200`}
        >
            <div id={'successIconContainer'} className={``} data-testid={'successIconContainer'}>
                <Image
                    id={'successIcon'}
                    data-testid={'successIcon'}
                    width={50}
                    height={50}
                    src={'/Icon - Success (3).svg'}
                    alt={'success icon'}
                />
            </div>
            <div className={`grid gap-3`}>
                <div id={'modalHeaderText'} data-testid={'modalHeaderText'}
                     className={` text-lg  `}
                >
                    {header}
                </div>
                <div className={`text-xs h-fit md:h-fit text-[#6c7685] grid gap-1 leading-3 w-fit md:w-fit `}>
                    <div>We’ve sent a link to create a new password to</div>
                    <div className={`flex w-[100%] break-words`}>
                        <div className={`text-[#6c7685] h-fit font-bold `}>{email}.</div>
                        <div className={`break-words `}>If it’s not in your inbox,</div>
                    </div>
                    <div> check your spam folder.</div>
                </div>
            </div>
            <div className={`h-[70%] flex justify-normal relative`} id={'backToLoginFromResetPasswordStep2'}>
                <button className={`w-fit absolute bottom-0`} onClick={() => router.push("/auth/login")}>
                    <div className={`text-meedleBlue text-sm underline `}>Back to Log in</div>
                </button>
            </div>
        </div>
    );
};

export default AuthEmail;