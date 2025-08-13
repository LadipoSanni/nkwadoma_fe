import React, {useState} from 'react';
import {inter, inter500, inter700} from "@/app/fonts";
import AuthInput from "@/reuseable/Input/AuthInputField";
import {Button} from "@/components/ui/button";
import AuthButton from "@/reuseable/buttons/AuthButton";

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const [disableButton, setDisableButton] = useState(true)
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false]);

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };
    return (
        <div
            className={` w-full bg-re-100 grid gap-6   `}
        >
            <div className={` grid w-full  gap-3 pb-4   border-b border-b-[#D7D7D7]  `}>
                <span className={` ${inter500.className} text-[16px] text-black `}>Change password</span>
                <span className={` text-[14px] ${inter.className} text-[#4D4E4D]   `}>Update password for enhanced account security</span>
            </div>
            <div className={` grid gap-4 `}>
                <AuthInput value={newPassword} type={'password'} data-testid={'resetNewPasswordInput'}
                           label={'Current password'}
                           id={'resetNewPasswordInput'}
                           mediumHeight={true}
                           onChange={handlePassword}
                           endAdornment={'Hide'}
                    // errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                           placeholder={'Enter password'}></AuthInput>
                <AuthInput value={newPassword} type={'password'} data-testid={'resetNewPasswordInput'}
                           label={'New password'}
                           id={'resetNewPasswordInput'}
                           mediumHeight={true}
                           onChange={handlePassword}
                           endAdornment={'Hide'}
                    // errorMessage={'meem'}
                    // errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                           placeholder={'Enter password'}></AuthInput>
                {/*<PasswordCriteria id={'createPasswordCriteria'} criteriaStatus={criteriaStatus} />*/}
                <AuthInput value={confirmPassword} type={'password'} data-testid={'resetConfirmPasswordInput'}
                           label={'Confirm password'}
                           mediumHeight={true}
                           id={'resetPasswordConfirmInput'}
                           onChange={handlePassword}
                           endAdornment={'Hide'}
                           placeholder={'Enter password'}></AuthInput>
            </div>
            <div className={`w-full flex justify-between `}>
                <Button
                    // backgroundColor={'white'} textColor={"#142854"}
                    id={"discard"}
                    data-testid={`discard`}
                    // buttonText={"Discard"} width={"fit"}
                    // isLoading={false}
                    // borderColor={'#142854'}
                    className={` ${inter700.className} py-3  px-5 text-[14px] rounded-md h-fit  w-fit bg-white border border-[#142854]  text-[#142854]   `}
                    // disable={false}
                    onClick={(e)=>{console.log(e)}}>
                    Discard
                </Button>
                <AuthButton
                    disable={false}
                    backgroundColor={'#142854'} textColor={"white"}
                    id={"saveChanges"}
                    data-testid={`saveChanges`}
                    buttonText={" Save changes"} width={"fit"}
                    isLoading={false}
                    handleClick={(e)=>{console.log(e)}}>


                </AuthButton>

            </div>

        </div>
    );
};

export default ChangePassword;