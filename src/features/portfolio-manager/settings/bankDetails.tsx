'use client'
import React from 'react';
import {inter, inter500} from "@/app/fonts";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BankDetails = () => {
    const [bank, setBank ] = React.useState('')
    const [accountNumber, setAccountBank ] = React.useState()

    const handleAccountNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()


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
               <div>
                   <label className={` ${inter500.className} text-[#101828] text-[14px] `}>Bank </label>
                   <Input
                       id={'bank'}
                       data-testid={'bank'}
                       className={``}
                       type={'text'}
                       placeholder={''}
                   />
               </div>
                <div>
                    <label className={` ${inter500.className} text-[#101828] text-[14px] `} >Account number </label>
                    <Input
                        className={` focus:ring focus:ring-[#D0D5DD] `}
                        type={'number'}
                        id={'accountNumber'}
                        data-testid={'accountNumber'}
                        placeholder={''}

                        onChange={(e) => handleAccountNumberInputChange(e)}
                    />
                </div>
                <Button
                    className={` text-white bg-meedlBlue`}
                >Save</Button>
            </div>
        </section>
    );
};

export default BankDetails;