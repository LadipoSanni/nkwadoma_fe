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
import LoaneeSettingTabs from '@/reuseable/tabs/loaneeSettingTabs';
import LoaneeProfile from './loanee-profile-settings/loaneeProfile';


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
            case 0: <div> 
                        { userRole === 'LOANEE' ? <LoaneeProfile whoseProfile={'user'} userEmail={userEmail} userName={userFullName} /> :
                            <Profile  whoseProfile={'user'} userEmail={userEmail} userName={userFullName}/>
                        }
                    </div>
            case 1:
                return <ChangePassword/>;
            case 2:
                return <TwoFAa  setCurrentTab={setCurrentTab}/>;

            default:
                return [];
        }
    };

    return (
        <div className={` w-full  bg-00 py-12 px-16 grid md:gap-[10vw]  md:flex md:justify-between  gap-6 `}>
            { userRole === 'LOANEE' ? <LoaneeSettingTabs width={` md:w-[30%] lg:w-[30%] `} tabCurrentTabIndex={currentTab} setTabCurrentTabIndex={setCurrentTab} id={'settingTab1'} tabElement={data}/> :

                <SettingTabs width={` md:w-[30%] lg:w-[30%] `} tabCurrentTabIndex={currentTab} setTabCurrentTabIndex={setCurrentTab} id={'settingTab1'} tabElement={data}  />
            }
            <div
                className={` w-full h-full ${styles.scrollab} max-h-[70vh]  overflow-y-scroll   `}
            >
                {getCurrentDataList()}
           </div>
        </div>
    );
};

