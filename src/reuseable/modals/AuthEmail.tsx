'use client'
import React from 'react';
import Image from 'next/legacy/image'
import { useRouter } from 'next/navigation'

interface props {
    header?: string,
    text?: string,
    email?: string | null,
}

const AuthEmail = ({header, email}: props) => {

    const router = useRouter()


    return (
        <div id={'authEmailModal'} data-testid={'authEmailModal'}
             className={`w-[100%] h-[100%] px-3 md:mt-7 py-3 rounded-md bg-white grid grid-rows-3 place-self-center  border border-slate-200`}
        >
            <div id={'successIconContainer'} className={``} data-testid={'successIconContainer'}>
                <Image
                 id={'successIcon'}
                 data-testid={'successIcon'}
                 width={50}
                 height={50}
                 src={'/Icon - Success (1).svg'}
                 alt={'success icon'}
                />
            </div>
            <div className={`grid gap-3`}>
                <div id={'modalHeaderText'} data-testid={'modalHeaderText'}
                     className={` text-lg  `}
                >
                    {header}
                </div>
                <div className={`text-xs  text-[#6c7685] grid gap-1 leading-3 w-[96%]`}>
                    <div>We’ve sent a link to create a new password to</div>
                    <div className={`flex w-[100%] break-words`}>
                        <div  className={`text-[#6c7685] font-bold `}>{email}.</div>
                        <div className={`break-words `}>If it’s not in your inbox, check</div>
                    </div>
                    <div> your spam folder.</div>
                </div>
            </div>
            <div className={`h-[70%] flex justify-normal relative`} id={'backToLoginFromResetPasswordStep2'}>
                <div className={`w-fit absolute bottom-0`} onClick={() => router.push("/auth/login")}>
                    <div  className={`text-[#0d9b48] text-sm underline `}>Back to Log in</div>
                </div>
            </div>

        </div>
    );
};

export default AuthEmail;