import React from 'react';
import {MdOutlineDocumentScanner, MdOutlineCameraAlt} from "react-icons/md";

const IdentityVerification = () => {
    return (
        <div className={'rounded-md grid gap-7 p-5 bg-grey105'}>
            <div className={'grid gap-5'}>
                <p className={'text-black400 text-[14px] leading-[150%] font-normal'}>To complete this process, you will
                    provide the following:</p>
                <div className={'flex gap-3 items-center'}>
                    <div className={'bg-lightBlue500 rounded-[1.875rem] flex items-center gap-2 py-1 px-3'}>
                        <MdOutlineDocumentScanner className={'h-4 w-4 text-meedlBlue'}/>
                        <p className={'text-meedlBlue text-[14px] leading-[150%] font-normal'}>Government ID</p>
                    </div>
                    <div className={'bg-lightBlue500 rounded-[1.875rem] flex items-center gap-2 py-1 px-3'}>
                        <MdOutlineCameraAlt className={'h-4 w-4 text-meedlBlue'}/>
                        <p className={'text-meedlBlue text-[14px] leading-[150%] font-normal'}>Selfie</p>
                    </div>
                </div>

            </div>
            <div className={'grid gap-3'}>
                <h2 className={'text-black500 text-[14px] font-medium leading-[150%]'}>
                    Instructions
                </h2>
                <ul className={'list-disc list-inside'}>
                    <li>Ensure there is proper lighting in your environment, and ensure your selfie is clear and not
                        blurred.
                    </li>
                    <li>Verify that your ID is still valid and has not expired.</li>
                    <li>Complete a liveness capture as part of the verification process.</li>
                </ul>
            </div>

        </div>
    );
};

export default IdentityVerification;