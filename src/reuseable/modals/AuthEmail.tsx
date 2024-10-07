'use client'
import React from 'react';
import Image from 'next/legacy/image'
import { useRouter } from 'next/navigation'

interface props {
    header?: string,
    text?: string,
    email?: string,
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
            <div >
                <div id={'modalHeaderText'} data-testid={'modalHeaderText'}
                     className={` text-lg  `}
                >
                    {header}
                </div>
                <div className={`text-xs inline-flex text-[#6c7685]  leading-3 w-[96%]`}>
                     We’ve sent a link to create a new password to
                     {email}. If it’s not in your inbox, check your spam folder.
                </div>
            </div>
            <div className={`h-[70%] flex justify-normal relative`} id={'backToLoginFromResetPasswordStep2'}>
                <div className={`w-fit absolute bottom-0`} onClick={() => router.push("/auth/login")}>
                    <div  className={`text-[#0d9b48] text-sm  `}>Back to Log in</div>
                    <hr style={{backgroundColor: '#0d9b48'}} className={`h-[2px] `}/>
                </div>
            </div>

        </div>
    );
};

export default AuthEmail;