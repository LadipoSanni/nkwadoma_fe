'use client'
import React, {useState} from 'react';
import SettingTabs from "@/reuseable/tabs/settingTabs";
import ChangePassword from "@/features/portfolio-manager/settings/ChangePassword";
import Profile from "@/features/portfolio-manager/settings/Profile";

export const Generals = () => {
    const data = [
        {name: 'Profile', id: 'profile',},
        {name: 'Change password', id: 'changePassword'},
        {name: '2FA Security', id: '2FaSecurity'},
    ]
    const [currentTab, setCurrentTab] = useState(0)

    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return <Profile/>;
            case 1:
                return <ChangePassword/>;
            case 2:
                return 'alternate';

            default:
                return [];
        }
    };

    return (
        <div className={` w-full md:w-[60%] bg-00 mt-4 grid   md:flex md:justify-between  gap-6 md:gap-0`}>
            <SettingTabs width={` md:w-[30%] lg:w-[30%] `} tabCurrentTabIndex={currentTab} setTabCurrentTabIndex={setCurrentTab} id={'settingTab1'} tabElement={data}  />
            <div
                className={` w-full   md:w-[50%] `}
            >
                {getCurrentDataList()}
           </div>
        </div>
    );
};

