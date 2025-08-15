'use client'
import React, {useState} from 'react';
import SettingTabs from "@/reuseable/tabs/settingTabs";
import Profile from "@/features/portfolio-manager/settings/Profile";
import ChangePassword from "@/features/portfolio-manager/settings/ChangePassword";
import BankDetails from "@/features/portfolio-manager/settings/bankDetails";

const Company = () => {
    const data = [
        {name: 'Profile', id: 'profile',},
        {name: 'Bank details', id: 'bankDetails',},
    ]
    const [currentTab, setCurrentTab] = useState(0)

    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return <Profile/>;
            case 1:
                return <BankDetails/>;
            default:
                return [];
        }
    };

    return (
        <div className={` w-full  bg-00 py-4 grid md:gap-[10vw]  md:flex md:justify-between  gap-6 `}>
            <SettingTabs width={` md:w-[30%] lg:w-[30%] `} tabCurrentTabIndex={currentTab} setTabCurrentTabIndex={setCurrentTab} id={'settingTab1'} tabElement={data}  />
            <div
                className={` w-full    `}
            >
                {getCurrentDataList()}
            </div>
        </div>
    );
};

export default Company;