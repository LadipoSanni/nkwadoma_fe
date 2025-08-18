import React, {useState} from 'react';
import {inter, inter500, inter700} from "@/app/fonts";
import AuthInput from "@/reuseable/Input/AuthInputField";
import {Button} from "@/components/ui/button";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {encryptText} from "@/utils/encrypt";
import PasswordCriteria from '@/components/passwordCriteria/Index';
import { useChangePasswordMutation } from '@/service/users/api';
import {useToast} from "@/hooks/use-toast";
import {Error} from "@/types/auth";
import styles from '@/components/loanee-my-profile/index.module.css'
const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // const [disableButton, setDisableButton] = useState(true)
    const [criteriaStatus, setCriteriaStatus] = useState([false, false, false, false]);
    const encryptedPassword =  encryptText(password) ? encryptText(password) : '';
    const encryptedCurrentPassword = encryptText(currentPassword) ? encryptText(currentPassword): ''

    const [changePassword, {isLoading, isError, error, isSuccess}] = useChangePasswordMutation()

    const disable = !criteriaStatus.every(Boolean) || password !== confirmPassword || !currentPassword ;
    const validatePassword = (password: string) => {
        const criteria = [
            password.length >= 8,
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password)
        ];
        setCriteriaStatus(criteria);
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value
        setPassword(userInput)
        // setNewPassword(password)
        validatePassword(userInput);

    };

    const criteriaMessages = [
        "Must be at least 8 characters",
        "Must contain one special character",
        "Must contain one uppercase character",
        "Must contain one lowercase character",
        "Must contain one digit"
    ];


    const clear = () => {
        setCurrentPassword("");
        setConfirmPassword("");
        setPassword('')
    }


    const handleCurrentPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value)

    }

    const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
    }
    const remainingCriteria = criteriaMessages.filter((_, index) => !criteriaStatus[index]);


    const handlePasswordChanged = async (e?:React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        const props = {password: encryptedCurrentPassword,newPassword:encryptedPassword};
        const response =  await changePassword(props);
        // console.log('props: ', props)
        // console.log('response:',response)
        // console.log('error: ', error)
        clear()
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const changePasswordError : Error = error
        if (isError){
            console.log('error has occured')
            toast({
                description: changePasswordError?.data?.message,
                status: "error",
            })
        }
        if (isSuccess){
            toast({
                description: response?.data?.message,
                status: "success",
            })
        }


    }

    const {toast} = useToast()


    return (
        <form
            onSubmit={(e) => handlePasswordChanged(e)}
            className={` md:min-w-fit md:w-[45%]   bg-re-100 grid gap-6   `}
        >
            <div className={` grid w-full  gap-1 pb-4   border-b border-b-[#D7D7D7]  `}>
                <p className={` ${inter500.className} text-[16px] text-black `}>Change password</p>
                <p className={` text-[14px] ${inter.className} text-[#4D4E4D]   `}>Update password for enhanced account security</p>
            </div>
            <div className={` grid gap-4 ${styles.container} `}>
                <AuthInput value={currentPassword} type={'password'} data-testid={'resetNewPasswordInput'}
                           label={'Current password'}
                           id={'resetNewPasswordInput'}
                           mediumHeight={true}
                           onChange={handleCurrentPasswordInput}
                           endAdornment={'Hide'}
                           tightBorder={false}
                           placeholder={'Enter password'}></AuthInput>
                <AuthInput value={password} type={'password'} data-testid={'resetNewPasswordInput'}
                           label={'New password'}
                           id={'resetNewPasswordInput'}
                           mediumHeight={true}
                           onChange={handlePassword}
                           endAdornment={'Hide'}
                           errorMessage={remainingCriteria.length === 1 ? remainingCriteria[0] : ''}
                           placeholder={'Enter password'}></AuthInput>
                {remainingCriteria.length !== 0  && <PasswordCriteria id={'createPasswordCriteria'} criteriaStatus={criteriaStatus}/>}
                <AuthInput value={confirmPassword} type={'password'} data-testid={'resetConfirmPasswordInput'}
                           label={'Confirm password'}
                           mediumHeight={true}
                           id={'resetPasswordConfirmInput'}
                           onChange={handleConfirmPassword}
                           endAdornment={'Hide'}
                           placeholder={'Enter password'}></AuthInput>
            </div>
            <div className={`w-full flex justify-between `}>
                <Button
                    id={"discard"}
                    data-testid={`discard`}
                    className={` ${inter700.className} py-3  px-5 text-[14px] rounded-md h-fit  w-fit bg-white border border-[#142854]  text-[#142854]   `}
                    onClick={clear}>
                    Discard
                </Button>
                <AuthButton
                    disable={disable}
                    backgroundColor={'#142854'} textColor={"white"}
                    id={"saveChanges"}
                    data-testid={`saveChanges`}
                    buttonText={" Save changes"} width={"fit"}
                    isLoading={isLoading}
                    handleClick={(e) => {handlePasswordChanged(e)}}>


                </AuthButton>

            </div>

        </form>
    );
};

export default ChangePassword;