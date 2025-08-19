'use client'
import {inter600, inter, inter500} from '@/app/fonts';
import React, {useEffect} from 'react';
import AuthInput from "@/reuseable/Input/AuthInputField";
import {getItemSessionStorage} from "@/utils/storage";
import AuthButton from "@/reuseable/buttons/AuthButton";
import {validateEmailInput} from "@/utils/GlobalMethods";
import PhoneNumberSelect from "@/reuseable/select/phoneNumberSelect/Index";
import styles from './index.module.css'
import {useToast} from "@/hooks/use-toast";
import { useEnableTwoFAMutation } from '@/service/users/api';
const TwoFAa = () => {
    const [twoFactorType, setTwoFactorType] = React.useState<string>('')
    const userEmail = getItemSessionStorage('user_email')
    const [phoneNumber, setPhoneNumber] = React.useState<string>('')
    const [email, setEmail] = React.useState(userEmail ? userEmail : '')
    const [enableTwoFa, {isLoading}] = useEnableTwoFAMutation()

    const [disable, setDisable]= React.useState(true)

    const handleBoxClick = (type: 'email' | 'phoneNumber') => {
        if (twoFactorType === 'email' || twoFactorType === 'phoneNumber') {
            setTwoFactorType('');
        }else{
            setTwoFactorType(type)

        }
    }
    const diableButton = () => {
        if (twoFactorType === 'phoneNumber') {
            if (phoneNumber?.length > 11 ){
                setDisable(false)
            }
        }else if(twoFactorType === 'email'){
            if (validateEmailInput(email)){
                setDisable(false)
            }
        }else {
            setDisable(true)
        }

    }
    useEffect(() => {
        diableButton()
    }, [email, phoneNumber, twoFactorType])

    const handleCurrentPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault()
        setEmail(event?.target?.value)
        // setCurrentPassword(event.target.value)

    }
    const {toast} = useToast()

    const enableTwoFA = async (e?:React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (twoFactorType === 'phoneNumber') {
          const prop = {
              mfaPhoneNumber:phoneNumber ,
              mfaType: "PHONE_NUMBER_MFA"
          }
          const response = await enableTwoFa(prop);
          if (response?.data){
              toast({
                  description: response?.data?.message,
                  status: "success",
              })
              setTwoFactorType("")
          }else{
              toast({
                  description: 'error occurred',
                  status: "error",
              })
          }
      }else {

          const prop = {
              mfaType: "EMAIL_MFA"
          }
          const response = await enableTwoFa(prop);
          if (response?.data){
              toast({
                  description: response?.data?.message,
                  status: "success",
              })
          }else{
              toast({
                  description: 'error occurred',
                  status: "error",
              })
          }
      }

    }
    const handle = () => {

    }

        return (
        <div
            className={`md:min-w-fit md:max-w-[45%] h-full ${styles.scrollab}  grid gap-6 `}
        >
            <span className={` grid w-full  gap-1 pb-4   border-b border-b-[#D7D7D7]  `}>
                <p className={` ${inter500.className} text-[16px] text-black `}>2FA Security2FA Security</p>
                <p className={` text-[14px] ${inter.className} text-[#4D4E4D]   `}>Enable two-factor authentication to your account</p>
            </span>
            <div
                className={` w-full h-fit py-4 px-4 grid gap-3 rounded-md border ${twoFactorType === 'email' ? 'border-meedlBlue' : 'border-[#D7D7D7]'}   `}
            >
               <div
                   onClick={() => handleBoxClick('email')}

               >
                   <p className={`text-[16px] ${inter600.className}`}>Email code</p>
                   <div
                       className={`text-[16px] h-fit   ${twoFactorType === 'email' ? `` : ''} w-full flex justify-between`}>
                       <p className={`w-[70%] text-[14px] ${inter.className} `}>Get a temporary verification code sent to your email for added security</p>
                       <div
                           className={` w-4 h-4 bg-white px-0.5 py-0.5 rounded-full  border ${twoFactorType === 'email' ? 'border-meedlBlue' : 'border-[#D7D7D7]'}  `}
                       >
                           <div className={` w-full h-full ${twoFactorType === 'email' ? 'bg-meedlBlue' : 'bg-white' } rounded-full    `}></div>
                       </div>
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

                >
                    <p className={`text-[16px] ${inter600.className}`}>SMS code</p>
                    <div
                        className={`text-[16px] h-fit   ${twoFactorType === 'email' ? `` : ''} w-full flex justify-between`}>
                        <p className={`w-[70%] text-[14px] ${inter.className} `}>Receive a one-time verification code via SMS to enter during login</p>
                        <div
                            className={` w-4 h-4 bg-white px-0.5 py-0.5 rounded-full  border ${twoFactorType === 'phoneNumber' ? 'border-meedlBlue' : 'border-[#D7D7D7]'}  `}
                        >
                            <div className={` w-full h-full ${twoFactorType === 'phoneNumber' ? 'bg-meedlBlue' : 'bg-white' } rounded-full    `}></div>
                        </div>
                    </div>
                </div>
                {twoFactorType === 'phoneNumber' &&(
                    <PhoneNumberSelect
                        selectedCountryCode={'NG'}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={(num) => setPhoneNumber( num)}
                        label="Next of kin's phone number"
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
                buttonText={"Enable 2FA security"} width={"fit"}
                isLoading={isLoading}
                handleClick={(e) => {enableTwoFA(e)}}>


            </AuthButton>
        </div>
    );
};

export default TwoFAa;