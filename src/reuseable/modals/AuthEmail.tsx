'use client'
import React from 'react';
import Image from 'next/legacy/image'
import { useRouter } from 'next/navigation'

interface props {
    header?: string,
    text?: string,
    email?: string,
}

const AuthEmail = ({header, text, email}: props) => {

    const router = useRouter()

    return (
        <div id={'authEmailModal'} data-testid={'authEmailModal'}
             className={`w-[100%] h-[100%] px-3 py-3 rounded-md bg-white grid grid-rows-3 place-self-center  border border-slate-200`}
        >
            <div id={'successIconContainer'} className={`bg-purple-200`} data-testid={'successIconContainer'}>
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
                {text ?

                    <div id={'modalText'} data-testid={`modalText`}
                     className={`text-xs text-[#6c7685] w-[80%]`}
                >
                    {text}
                </div>
                    :
                    <div className={`text-xs inline-flex text-[#6c7685]  leading-3 w-[80%]`}>
                        We’ve sent a link to create a new password to
                        {email}. If it’s not in your inbox, check your spam folder.
                    </div>

                }
            </div>
            <div className={`h-[70%] bg-red-300 grid place-items-end`} id={'backTOLogin'}>
                <div className={`w-fit`} onClick={() => router.push("/auth/login")}>
                    <div  className={`text-[#0d9b48] text-sm  `}>Back to Log in</div>
                    <hr style={{backgroundColor: '#0d9b48'}} className={`h-[2px] `}/>
                </div>
            </div>

        </div>
    );
};

export default AuthEmail;