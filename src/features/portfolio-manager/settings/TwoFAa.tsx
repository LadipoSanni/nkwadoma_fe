'use client'
import {inter600, inter, inter500} from '@/app/fonts';
import React, {useEffect} from 'react';
import AuthInput from "@/reuseable/Input/AuthInputField";
import {getItemSessionStorage} from "@/utils/storage";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {validateEmailInput} from "@/utils/GlobalMethods";
import PhoneNumberSelect from "@/reuseable/select/phoneNumberSelect/Index";
import {useToast} from "@/hooks/use-toast";
import { useEnableTwoFAMutation } from '@/service/users/api';
import { useAppSelector} from "@/redux/store";


interface Props {
    setCurrentTab: (tabIndex: number) => void;
}
const TwoFAa = ({setCurrentTab}:Props) => {
    const [twoFactorType, setTwoFactorType] = React.useState<string>('')
    const userEmail = getItemSessionStorage('user_email')
    const [phoneNumber, setPhoneNumber] = React.useState<string>('')
    const [email, setEmail] = React.useState(userEmail ? userEmail : '')
    const [enableTwoFa, {isLoading}] = useEnableTwoFAMutation()
    const [buttonText, setButtonText] = React.useState<string>('Enable 2FA security')
    const user2FState = useAppSelector(state => state.ids.user2faState)

    const [disable, setDisable]= React.useState(true)

    const handleBoxClick = (type: 'email' | 'phoneNumber') => {
        setTwoFactorType(type)
    }

    const diableButton = () => {
       if (user2FState === 'PHONE_NUMBER_MFA' || user2FState === 'EMAIL_MFA'){
           setDisable(false)
       }else {
           if (twoFactorType === 'phoneNumber') {
               if (phoneNumber?.replaceAll(" ", '')?.length > 11 || phoneNumber?.replaceAll(" ", '')?.length < 11 ) {
                   setDisable(true)
               }else {
                   setDisable(false)
               }
           }else if(twoFactorType === 'email'){
               if (validateEmailInput(email)){
                   setDisable(false)
               }else {
                   setDisable(true)
               }
           }
       }

    }
    const updateButtonText = () => {
        if (user2FState === 'PHONE_NUMBER_MFA' ){
            setButtonText('Disable phone number 2FA security')
        }else if(user2FState === 'EMAIL_MFA'){
            setButtonText('Disable email 2FA security')
        } else{
            setButtonText('Enable 2FA security')
        }
    }


    useEffect(() => {
        updateButtonText()
        diableButton();

    }, [email, phoneNumber, twoFactorType, user2FState])

    const handleCurrentPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault()
        setEmail(event?.target?.value)
        // setCurrentPassword(event.target.value)

    }
    const {toast} = useToast()

    const enableTwoFA = async (e?:React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        const phoneNumberProp = {
            mfaPhoneNumber: phoneNumber?.replaceAll(' ', ''),
            mfaType: "PHONE_NUMBER_MFA"
        }
        const emailProp = {
            mfaType: "EMAIL_MFA"
        }
        const disableProp = {
            mfaType: 'MFA_DISABLED'
        }
        const enableProps = twoFactorType === 'phoneNumber' ? phoneNumberProp : emailProp;
        const props = user2FState === 'EMAIL_MFA' || user2FState === 'PHONE_NUMBER_MFA' ? disableProp : enableProps;
            const response = await enableTwoFa(props);
            if (response?.data){
                toast({
                    description: response?.data?.message,
                    status: "success",
                })
            }else{
                toast({
                    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    description: response?.error?.data?.message,
                    status: "error",
                })
            }
        setCurrentTab(0)


    }
    const handle = () => {

    }

        return (
        <div
            className={`md:min-w-fit md:max-w-[45%] h-[100%]   grid gap-6 `}
        >
            <span className={` grid w-full  gap-1 pb-4   border-b border-b-[#D7D7D7]  `}>
                <p className={` ${inter500.className} text-[16px] text-black `}>2FA Security</p>
                <p className={` text-[14px] ${inter.className} text-[#4D4E4D]   `}>Enable two-factor authentication to your account</p>
            </span>
            <div
                className={` w-full h-fit py-4 px-4 grid gap-3 rounded-md border ${twoFactorType === 'email' ? 'border-meedlBlue' : 'border-[#D7D7D7]'}   `}
            >
               <div
                   onClick={() => handleBoxClick('email')}
                   className={`text-[16px] h-fit   ${twoFactorType === 'email' ? `` : ''} w-full flex justify-between`}
               >
                   <article
                       className={` grid    `}
                      >
                       <p className={`text-[16px] place-self-start ${inter600.className}`}>Email code</p>
                       <p className={` w-[70%] text-[14px] ${inter.className} `}>Get a temporary verification code sent to your email for added security</p>
                   </article>
                   <div
                       className={` w-4 h-4 bg-white px-0.5 py-0.5 rounded-full  border ${twoFactorType === 'email' ? 'border-meedlBlue' : 'border-[#D7D7D7]'}  `}
                   >
                       <div className={` w-full h-full ${twoFactorType === 'email' ? 'bg-meedlBlue' : 'bg-white' } rounded-full    `}></div>
                   </div>
               </div>
                {twoFactorType === 'email' &&(
                    <AuthInput
                        value={email} type={'email'} data-testid={'email'}
                        label={''}
                        id={'email'}
                        mediumHeight={true}
                        onChange={handleCurrentPasswordInput}
                        endAdornment={false}
                        tightBorder={false}
                        placeholder={email}
                    >

                    </AuthInput>
                )}
            </div>
            <div
                className={` w-full h-fit py-4 px-4 grid gap-3 rounded-md border ${twoFactorType === 'phoneNumber' ? 'border-meedlBlue' : 'border-[#D7D7D7]'}   `}
            >
                <div
                    onClick={() => handleBoxClick('phoneNumber')}
                    className={`text-[16px] h-fit   w-full flex justify-between`}
                >
                   <span className={` grid    `}>
                       <p className={`text-[16px] place-self-start ${inter600.className}`}>SMS code</p>
                       <p className={` text-[14px] w-[60%] place-self-start ${inter.className} `}>Receive a one-time verification code via SMS to enter during login</p>
                   </span>
                    <div
                        className={` w-4 h-4 bg-white px-0.5 py-0.5 rounded-full mt-auto mb-auto   border ${twoFactorType === 'phoneNumber' ? 'border-meedlBlue' : 'border-[#D7D7D7]'}  `}
                    >
                        <div className={` w-full h-full ${twoFactorType === 'phoneNumber' ? 'bg-meedlBlue' : 'bg-white' } rounded-full    `}></div>
                    </div>
                </div>
                {twoFactorType === 'phoneNumber' &&(
                    <PhoneNumberSelect
                        selectedCountryCode={'NG'}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={(num) => setPhoneNumber(num)}
                        label=""
                        placeholder="Select code"
                        id="phoneNumber"
                        setFieldError={handle}
                        name="phoneNumber"
                        onBlur={handle}
                        setError= {handle}
                        // setSelectedCountryCode={setCountryCode}
                    />
                )}
            </div>
            <AuthButton
                disable={disable}
                backgroundColor={'#142854'} textColor={"white"}
                id={"enable2fASecurity"}
                data-testid={`enable2fASecurity`}
                buttonText={buttonText} width={"fit"}
                isLoading={isLoading}
                handleClick={(e) => {enableTwoFA(e)}}>


            </AuthButton>
        </div>
    );
};

export default TwoFAa;