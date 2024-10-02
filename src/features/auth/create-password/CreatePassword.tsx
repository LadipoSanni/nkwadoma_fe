import React from 'react';
import AuthInputField from "@/component/reuseableComponent/ui/Input/AuthInputField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CreatePassword = () => {
    return (
        <section id={'create-password-block'}
                 className={'bg-[#fff] rounded-[8px] flex w-[533px] h-[418px] py-6 px-5 flex-col  gap-[98px]'}>
            <form id={'create-password-form'} className={'grid gap-[99px]'}>
                <main id={'create-password-main'} className={'grid gap-[24.14px]'}>
                    <div id={'create-password-header'} className={'grid gap-1'}>
                        <h1 id={'create-password-title'}
                            className={'text-[#101828] text-[18px] font-extrabold leading-[20px]'}>Create Password</h1>
                        <p id={'create-password-welcome'}
                           className={'text-[#667085] text-[16px] font-normal leading-[20px]'}>Welcome Henry</p>
                    </div>
                    <div id={'create-password-inputs'} className={'grid gap-4'}>
                        <AuthInputField label={'Password'} id={'password'} type={'password'} endAdornment={'Show'}
                                        placeholder={'password'}/>
                        <AuthInputField label={'Confirm Password'} id={'confirmPassword'} type={'password'}
                                        endAdornment={<VisibilityOffIcon id={`visibility-icon`} style={{
                                            color: '#000000',
                                            width: '16px',
                                            height: '16px'
                                        }}/>} placeholder={'Enter password'}/>
                    </div>
                </main>
                {/*<button*/}
                {/*    id={'create-password-button'}*/}
                {/*    className={'flex w-[328px] p-[12px_8px] justify-center items-center gap-[8px] rounded-[4px] bg-[#0D9B48]'}>*/}
                {/*    <p id={'create-password-button-text'} className={'text-[#fff] text-[16px] font-normal leading-[20px]'}>Create Password</p>*/}
                {/*</button>*/}
            </form>
        </section>
    );
};

export default CreatePassword;