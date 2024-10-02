import React from 'react';
import CustomInputField from "@/component/reuseableComponent/ui/Input/CustomInputField";

const CreatePasswordForm = () => {
    return (
        <section id={'create-password-block'}
                 className={'bg-[#fff] rounded-[8px] flex w-[460px] h-[418px] p-[25.68px_66px_42px_66px] flex-col  gap-[98px]'}>
            <form id={'create-password-form'} className={'grid gap-[99px]'}>
                <main id={'create-password-main'} className={'grid gap-[24.14px]'}>
                    <div id={'create-password-header'} className={'grid gap-1'}>
                        <h1 id={'create-password-title'} className={'text-[#101828] text-[18px] font-extrabold leading-[20px]'}>Create Password</h1>
                        <p id={'create-password-welcome'} className={'text-[#667085] text-[16px] font-normal leading-[20px]'}>Welcome Henry</p>
                    </div>
                    <div id={'create-password-inputs'} className={'grid gap-4'}>
                        <CustomInputField label={'Password'} id={'password'} type={'password'}/>
                        <CustomInputField label={'Confirm Password'} id={'confirmPassword'} type={'password'}/>
                    </div>
                </main>
                <button
                    id={'create-password-button'}
                    className={'flex w-[328px] p-[12px_8px] justify-center items-center gap-[8px] rounded-[4px] bg-[#0D9B48]'}>
                    <p id={'create-password-button-text'} className={'text-[#fff] text-[16px] font-normal leading-[20px]'}>Create Password</p>
                </button>
            </form>
        </section>
    );
};

export default CreatePasswordForm;