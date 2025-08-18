'use client'
import React from 'react';
import {inter, inter500, inter700} from "@/app/fonts";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BankDetails = () => {
    const [bank, setBank ] = React.useState('')
    const [accountNumber, setAccountBank ] = React.useState('')
    // const [disableButton , setDisableButton] = React.useState(true);
    const disableButton = accountNumber?.length !== 10 && bank?.length !== 3

    const handleAccountNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        // /\d/.test(e.target.value)
        // /^\d{10}$/.test(name)
        const userInput = e.target.value
        const regex = /^\d{10}$/;
        if (accountNumber?.length !== 10){
            if (regex.test(userInput)) {
                setAccountBank(userInput)
            }
        }
    }

    const handleBanKInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setBank(e.target.value)
    }

    return (
        <section
            id={'bankDetails'}
            className={` md:min-w-fit md:w-[45%]  grid gap-6 `}
        >
            <span className={` grid w-full  gap-1 pb-4   border-b border-b-[#D7D7D7]  `}>
                <p className={` ${inter500.className} text-[16px] text-black `}>Bank details</p>
                <p className={` text-[14px] ${inter.className} text-[#4D4E4D]   `}>Please provide bank details for your organization</p>
            </span>
            <div className={` grid gap-4 `}>
               <div className={` grid gap-1 `}>
                   <label className={` ${inter500.className}  text-[#101828] text-[14px] `}>Bank </label>
                   <Input
                       id={'bank'}
                       data-testid={'bank'}
                       className={` h-fit py-2.5 `}
                       type={'text'}
                       placeholder={''}
                       onChange={(e) => handleBanKInput(e)}
                   />
               </div>
                <div className={` grid gap-1`}>
                    <label className={` ${inter500.className} text-[#101828] text-[14px] `} >Account number </label>
                    <Input
                        className={` focus:ring text-[14px] h-fit py-2.5    ${inter.className} focus:ring-[#D0D5DD] `}
                        type={'number'}
                        id={'accountNumber'}
                        data-testid={'accountNumber'}
                        placeholder={''}

                        onChange={(e) => handleAccountNumberInputChange(e)}
                    />
                </div>
                <Button
                    disabled={disableButton}
                    className={` text-white w-full h-fit py-3  ${disableButton ? `bg-[#D7D7D7] ` : ` bg-meedlBlue `} text-[14px] ${inter700.className} `}
                >Save</Button>
            </div>
        </section>
    );
};

export default BankDetails;