'use client'
import React, {useState} from 'react';
import SettingTabs from "@/reuseable/tabs/settingTabs";
import {inter500} from  '@/app/fonts'
import AuthInputField from "@/reuseable/Input/AuthInputField";
import AuthInput from "@/reuseable/Input/AuthInputField";

export const Generals = () => {
    const data = [
        {name: 'Profile', id: 'profile',},
        {name: 'Change password', id: 'changePassword'},
        {name: '2FA Security', id: '2FaSecurity'},
    ]

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const [disableButton, setDisableButton] = useState(true)
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false]);


    return (
        <div className={` w-full  mt-4 flex gap-10`}>
            <SettingTabs currentIndex={0} id={'settingTab1'} tabElement={data}  />
            <div
                className={` w-full grid gap-4  md:w-fit `}
            >
                <div className={` grid w-full  gap-3 pb-4   border-b border-b-[#D7D7D7]  `}>
                    <span className={` ${inter500.className} text-[16px] text-black `}>Change password</span>
                    <span className={` text-[] `}>Update password for enhanced account security</span>
                </div>
                <div>
                    <AuthInput value={newPassword} type={'password'} data-testid={'resetNewPasswordInput'}
                               label={'New password'}
                               id={'resetNewPasswordInput'} onChange={handleChangeNewPassword}
                               endAdornment={'Hide'}
                               errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                               placeholder={'Enter password'}></AuthInput>
                    <AuthInput value={newPassword} type={'password'} data-testid={'resetNewPasswordInput'}
                               label={'New password'}
                               id={'resetNewPasswordInput'} onChange={handleChangeNewPassword}
                               endAdornment={'Hide'}
                               errorMessage={'meem'}
                               // errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                               placeholder={'Enter password'}></AuthInput>
                    {/*<PasswordCriteria id={'createPasswordCriteria'} criteriaStatus={criteriaStatus} />*/}
                    <AuthInput value={confirmPassword} type={'password'} data-testid={'resetConfirmPasswordInput'}
                               label={'Confirm password'}
                               id={'resetPasswordConfirmInput'} onChange={handleChangeConfirmPassword}
                               endAdornment={'Hide'}
                               placeholder={'Enter password'}></AuthInput>
                </div>

           </div>
        </div>
    );
};

