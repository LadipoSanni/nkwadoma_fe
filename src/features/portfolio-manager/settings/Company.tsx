'use client'
import React, {useEffect, useState} from 'react';
import SettingTabs from "@/reuseable/tabs/settingTabs";
import Profile from "@/features/portfolio-manager/settings/Profile";
import BankDetails from "@/features/portfolio-manager/settings/bankDetails";
import {store, useAppSelector} from '@/redux/store';
import {setSelectedCompanyTab} from "@/redux/slice/loan/selected-loan";
import {useGetOrganizationDetailsQuery} from "@/service/admin/organization";

const Company = () => {
    const data = [
        {name: 'Profile', id: 'profile',},
        {name: 'Bank details', id: 'bankDetails',},
    ]
    const selectedCompanyTab = useAppSelector(state => state.selectedLoan.companySelectedTab)
    const [currentTab, setCurrentTab] = useState(selectedCompanyTab)
    useEffect(() => {
        store.dispatch(setSelectedCompanyTab(currentTab))
    }, [currentTab]);

    const {data:    organizationData} = useGetOrganizationDetailsQuery({})

    console.log('data', organizationData)

    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return <Profile whoseProfile={'company'} userName={''} userEmail={''}/>;
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