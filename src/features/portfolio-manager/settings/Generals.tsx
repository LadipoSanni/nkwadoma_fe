'use client'
import React, {useEffect, useState} from 'react';
import SettingTabs from "@/reuseable/tabs/settingTabs";
import ChangePassword from "@/features/portfolio-manager/settings/ChangePassword";
import TwoFAa from "@/features/portfolio-manager/settings/TwoFAa";
import { setSelectedGeneralTab } from '@/redux/slice/loan/selected-loan';
import {store, useAppSelector} from '@/redux/store';
import {getItemSessionStorage} from "@/utils/storage";
import styles from './index.module.css'
import LoaneeSettingTabs from '@/reuseable/tabs/loaneeSettingTabs';
import LoaneeProfile from './loanee-profile-settings/loaneeProfile';
import Profile from './profile';



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
    const userRole  = getItemSessionStorage("user_role")

    useEffect(() => {
        store.dispatch(setSelectedGeneralTab(currentTab))
    }, [currentTab])

    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return userRole === 'LOANEE' ? <LoaneeProfile whoseProfile={'user'} /> :
                    <Profile  whoseProfile={'user'} userEmail={userEmail} userName={userFullName}/>;
            case 1:
                return <ChangePassword/>;
            case 2:
                return <TwoFAa  setCurrentTab={setCurrentTab}/>;

            default:
                return [];
        }
    };

    return (
        <div className={` w-full  bg-00 py-4 px-2 grid md:gap-[10vw]  md:flex md:justify-between md:px-16 md:py-12 gap-6 `}>
            { userRole === 'LOANEE' ? <LoaneeSettingTabs width={` md:w-[30%] lg:w-[30%] `} tabCurrentTabIndex={currentTab} setTabCurrentTabIndex={setCurrentTab} id={'settingTab1'} tabElement={data}/> :
                <SettingTabs width={` md:w-[30%] lg:w-[30%] `} tabCurrentTabIndex={currentTab} setTabCurrentTabIndex={setCurrentTab} id={'settingTab1'} tabElement={data}/>
            }
            <div
                className={` w-full h-full ${styles.scrollab} max-h-[70vh]  overflow-y-scroll   `}
            >
                {getCurrentDataList()}
           </div>
        </div>
    );
};
