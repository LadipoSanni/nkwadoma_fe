'use client'
import React, {useEffect, useState} from 'react';
import SettingTabs from "@/reuseable/tabs/settingTabs";
import ChangePassword from "@/features/portfolio-manager/settings/ChangePassword";
import Profile from "@/features/portfolio-manager/settings/Profile";
import TwoFAa from "@/features/portfolio-manager/settings/TwoFAa";
import { setSelectedGeneralTab } from '@/redux/slice/loan/selected-loan';
import {store, useAppSelector} from '@/redux/store';
import {getItemSessionStorage} from "@/utils/storage";
import styles from './index.module.css'

export const Generals = () => {
    const data = [
        {name: 'Profile', id: 'profile',},
        {name: 'Change password', id: 'changePassword'},
        {name: '2FA Security', id: '2FaSecurity'},
    ]
    const selectedCompanyTab = useAppSelector(state => state.selectedLoan.selectedGeneralTab)
    const [currentTab, setCurrentTab] = useState(selectedCompanyTab)

    const  userFullName = getItemSessionStorage('user_name')
    const userEmail = getItemSessionStorage('user_email')

    useEffect(() => {
        store.dispatch(setSelectedGeneralTab(currentTab))
    }, [currentTab])

    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return <Profile whoseProfile={'user'} userEmail={userEmail} userName={userFullName}/>;
            case 1:
                return <ChangePassword/>;
            case 2:
                return <TwoFAa/>;

            default:
                return [];
        }
    };

    return (
        <div className={` w-full  bg-00 py-4 grid md:gap-[10vw]  md:flex md:justify-between  gap-6 `}>
            <SettingTabs width={` md:w-[30%] lg:w-[30%] `} tabCurrentTabIndex={currentTab} setTabCurrentTabIndex={setCurrentTab} id={'settingTab1'} tabElement={data}  />
            <div
                className={` w-full h-full ${styles.scrollab} max-h-[70vh]  overflow-y-scroll   `}
            >
                {getCurrentDataList()}
           </div>
        </div>
    );
};

