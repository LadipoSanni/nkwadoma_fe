'use client'
import React, { useState } from 'react';
import AuthInputField from "@/reuseable/Input/AuthInputField";
import { cabinetGrotesk } from "@/app/fonts";
import PasswordCriteria from "@/component/PasswordCriteria/PasswordCriteria";
import AuthButton from "@/reuseable/buttons/AuthButton";

const CreatePassword = () => {
    const [password, setPassword] = useState('');
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false]);
    const [confirmPassword, setConfirmPassword] = useState('');

    const criteriaMessages = [
        "Must be at least 8 characters",
        "Must contain one special character",
        "Must contain one uppercase character",
        "Must contain one lowercase character"
    ];

    const validatePassword = (password: string) => {
        const criteria = [
            password.length >= 8,
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
            /[A-Z]/.test(password),
            /[a-z]/.test(password)
        ];
        setCriteriaStatus(criteria);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const remainingCriteria = criteriaMessages.filter((_, index) => !criteriaStatus[index]);

    return (
        <section id={'create-password-block'}
                 className={'bg-[#fff] rounded-[8px] flex w-[33.3125rem] h-[473px] py-6 px-5 flex-col  gap-[28px]'}>
            <h1 id={'create-password-title'}
                className={`${cabinetGrotesk.className} antialiased text-[#1A1A1A] font-[500] text-[30px] leading-[145%] `}>Create your password</h1>
            <form id={'create-password-form'} className={'grid gap-[28px]'}>
                <main id={'create-password-main'} className={'grid gap-[24.14px]'}>
                    <div id={'create-password-inputs'} className={'grid gap-4'}>
                        <AuthInputField
                            label={'Password'}
                            id={'password'}
                            type={'password'}
                            endAdornment={'Show'}
                            placeholder={'Enter password'}
                            value={password}
                            onChange={handlePasswordChange}
                            errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                        />
                        <PasswordCriteria id={'createPasswordCriteria'} criteriaStatus={criteriaStatus} />
                        <AuthInputField
                            label={'Confirm Password'}
                            id={'confirmPassword'}
                            type={'password'}
                            endAdornment={'show'}
                            placeholder={'Enter password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                </main>
                <AuthButton
                    backgroundColor={criteriaStatus.every(Boolean) && password === confirmPassword ? '#0D9B48' : '#D0D5DD'}
                    buttonText={'Create password'}
                    disable={!criteriaStatus.every(Boolean) || password !== confirmPassword}
                    handleClick={() => {}}
                    id={"createPasswordButton"}
                    textColor={'#FFFFFF'}
                    width={'100%'}
                />
            </form>
        </section>
    );
};

export default CreatePassword;