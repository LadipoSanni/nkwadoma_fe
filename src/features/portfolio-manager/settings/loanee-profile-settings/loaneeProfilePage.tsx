'use client'
import styles from './index.module.css'
import LoaneeProfile from './loaneeProfile';
import React, {useEffect, useState} from 'react';
import {store, useAppSelector} from '@/redux/store';
import {getItemSessionStorage} from "@/utils/storage";
import TwoFAa from "@/features/portfolio-manager/settings/TwoFAa";
import LoaneeSettingTabs from '@/reuseable/tabs/loaneeSettingTabs';
import { setSelectedGeneralTab } from '@/redux/slice/loan/selected-loan';
import ChangePassword from "@/features/portfolio-manager/settings/ChangePassword";

export const LoaneeProfilePage = () => {
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
                return <LoaneeProfile  whoseProfile={'user'} userEmail={userEmail} userName={userFullName}/>;
            case 1:
                return <ChangePassword/>;
            case 2:
                return <TwoFAa  setCurrentTab={setCurrentTab}/>;

            default:
                return [];
        }
    };

    return (
        <div className={` w-full px-5 bg-00 py-4 grid md:gap-[10vw]  md:flex md:justify-between  gap-6 `}>
            <LoaneeSettingTabs width={` md:w-[30%] lg:w-[30%] `} tabCurrentTabIndex={currentTab} setTabCurrentTabIndex={setCurrentTab} id={'settingTab1'} tabElement={data}  />
            <div
                className={` w-full h-full ${styles.scrollab} max-h-[70vh]  overflow-y-scroll   `}
            >
                {getCurrentDataList()}
           </div>
        </div>
    );
};

