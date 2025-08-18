import React from 'react';
import {inter, inter500} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import {getItemSessionStorage} from "@/utils/storage";
import styles from './index.module.css'
const Profile = () => {

    const  userFullName = getItemSessionStorage('user_name')
    const userEmail = getItemSessionStorage('user_email')
    const userDetails = [
        {details: 'Full name', value: userFullName ? userFullName : '', id: 'userFullName'},
        {details: 'Email address', value: userEmail ? userEmail :'', id: 'userEmail'},
    ]
    function extractFirstCharacters(text: string ): string {
        return text
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();
    }
    return (
        <div
            data-testid={'userProfile'}
            className={`w-full md:min-w-fit md:w-[40%] ${styles.scrollab} grid gap-3  `}
            id={'userProfile'}>
            <div
                className={` flex gap-3 pb-5 border-b border-b-[#D7D7D7]  `}
            >
                <div
                    id={'userIcon'}
                    data-testid={'userIcon'}
                    className={` w-[4rem] h-[4rem] flex  items-center justify-center  text-[#D42620]   rounded-full bg-red-200 items`}
                >
                    <p id={'userIntials'} data-testid={'userInitials'} className={` text-error450  `}>{extractFirstCharacters(userFullName ? userFullName : '')}</p>
                </div>
                <div className={` grid gap-3 `}>
                   <div>
                       <p className={` text-[14px] ${inter500.className} text-black `}>Upload image</p>
                       <p className={`text-[14px] ${inter.className} text-[#6A6B6A]`}>PNG or JPG (max. 800x400px) </p>
                   </div>
                    <Button
                        className={`w-fit h-fit py-2 px-4  border border-meedlBlue text-meedlBlue  `}
                    >Upload</Button>
                </div>
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