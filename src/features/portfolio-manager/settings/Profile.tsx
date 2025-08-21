import React from 'react';
import {inter, inter500} from "@/app/fonts";
import styles from './index.module.css'
import UploadButton from "@/reuseable/buttons/UploadButton";

interface PrpfileProps {
    whoseProfile: "company" | "user",
    userName: string | undefined,
    userEmail: string | undefined,
    companyUrl?: string ;
}

const Profile = ({whoseProfile, userEmail, userName,companyUrl}: PrpfileProps) => {


    const userDetails = [
        {details: 'Full name', value: userName ? userName : '', id: 'userFullName'},
        {details: 'Email address', value: userEmail ? userEmail :'', id: 'userEmail'},
    ]


    return (
        <div
            data-testid={'userProfile'}
            className={`w-full md:min-w-fit md:w-[40%] ${styles.scrollab} grid gap-3  `}
            id={'userProfile'}>
            <div
                className={` flex gap-3 pb-5 border-b border-b-[#D7D7D7]  `}
            >

                    <UploadButton url={companyUrl} whose={whoseProfile} />
            </div>
            <div className={`full grid gap-4  `}>
                {userDetails?.map((item: {details: string, value: string, id: string}, index: number) => (
                    <div key={item.id + index}
                         className={` w-full md:min-w-fit   grid gap-2 `}
                         id={item.id} data-testid={item.id}>
                        <p className={` ${inter500.className} text-[14px] `}>{item.details}</p>
                        <div
                            className={`w-full pl-3 mo  h-fit py-3 text-[14px] ${inter.className} border border-[#D7D7D7] rounded-md `}
                        >
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Profile;