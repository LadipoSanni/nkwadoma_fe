import React from 'react';
import Image from 'next/legacy/image'

interface props {
    header?: string,
    text?: string,
}

const AuthEmail = ({header, text}: props) => {
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
                <div id={'modalHeaderText'} data-testid={'modalHeaderText'}>
                    {header}
                </div>
                {/*<div id={'modalText'} data-testid={`modalText`}*/}
                {/*     className={`text-xs text-[#6c7685] w-[80%]`}*/}
                {/*     dangerouslySetInnerHTML={{ __html: (text)}}*/}
                {/*/>*/}
            </div>

        </div>
    );
};

export default AuthEmail;