import React from 'react';
import Image from 'next/legacy/image'
import Link from "next/link";

interface props {
    header?: string,
    text?: string,
    email?: string,
}

const AuthEmail = ({header, text, email}: props) => {

    console.log("email: ", email)
    return (
        <div id={'authEmailModal'} data-testid={'authEmailModal'}
             className={`w-[100%] h-[100%] px-3 py-3 rounded-md bg-white grid grid-rows-3 border border-slate-200`}
        >
            <div id={'successIconContainer'} data-testid={'successIconContainer'}>
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
                    <div className={`text-xs text-[#6c7685] flex leading-3 w-[80%]`}>
                        We’ve sent a link to create a new password to<p className={`font-semibold bg-red-50 h-fit text-[#6c7685] `}>{email}</p>. If it’s not in your inbox, check your spam folder.
                    </div>

                }
            </div>
            <div>
                <Link href="/auth/login">
                    <div  className={`text-[#0d9b48] text-sm  `}>Back to Log in</div>
                    <hr style={{backgroundColor: '#0d9b48'}} className={`h-[2px]`}/>
                </Link>
            </div>

        </div>
    );
};

export default AuthEmail;