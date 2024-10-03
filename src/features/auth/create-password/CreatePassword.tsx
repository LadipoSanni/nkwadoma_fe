import React from 'react';
import AuthInputField from "@/reuseable/Input/AuthInputField";
import AuthButton from "@/reuseable/buttons/AuthButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {cabinetGrotesk} from "@/app/fonts";

const CreatePassword = () => {
    return (
        <section id={'create-password-block'}
                 className={'bg-[#fff] rounded-[8px] flex w-[533px] h-[473px] py-6 px-5 flex-col  gap-[28px]'}>
            <h1 id={'create-password-title'}
                className={`${cabinetGrotesk.className} antialiased text-[#1A1A1A] font-[500] text-[30px] leading-[145%] `}>Create your password</h1>
            <form id={'create-password-form'} className={'grid gap-[28px]'}>
                <main id={'create-password-main'} className={'grid gap-[24.14px]'}>
                    <div id={'create-password-inputs'} className={'grid gap-4'}>
                        <AuthInputField label={'Password'} id={'password'} type={'password'} endAdornment={'Show'}
                                        placeholder={'password'}/>
                        <div className={'flex items-center gap-5 py-0 px-1 '}>
                            <main className={' grid gap-3'}>
                                <div className={'flex gap-2 items-center'}>
                                    <CheckCircleIcon style={{color: '#00A343', width: '16px', height: '16px'}}/>
                                    <p className={'text-[#00A343] text-[14px] font-normal leading-[20px]'}>At least 8
                                        characters</p>
                                </div>
                                <div className={'flex gap-2 items-center'}>
                                    <CheckCircleIcon style={{color: '#00A343', width: '16px', height: '16px'}}/>
                                    <p className={'text-[#00A343] text-[14px] font-normal leading-[20px]'}>At least one
                                        special character</p>
                                </div>
                            </main>
                            <main className={'grid gap-3'}>
                                <div className={'flex gap-2 items-center'}>
                                    <CheckCircleIcon style={{color: '#00A343', width: '16px', height: '16px'}}/>
                                    <p className={'text-[#00A343] text-[14px] font-normal leading-[20px]'}>At least one
                                        uppercase character</p>
                                </div>
                                <div className={'flex gap-2 items-center'}>
                                    <CheckCircleIcon style={{color: '#00A343', width: '16px', height: '16px'}}/>
                                    <p className={'text-[#00A343] text-[14px] font-normal leading-[20px]'}>At least one
                                        lowercase character</p>
                                </div>
                            </main>
                        </div>
                        <AuthInputField label={'Confirm Password'} id={'confirmPassword'} type={'password'}
                                        endAdornment={'show'}/>
                    </div>
                </main>
                {/*<AuthButton backgroundColor={''} buttonText={'Create password'} disable={true}*/}
                {/*            id={''} textColor={''} width={''}/>*/}
            </form>
        </section>
    );
};

export default CreatePassword;