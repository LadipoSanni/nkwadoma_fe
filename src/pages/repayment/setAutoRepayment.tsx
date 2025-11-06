'use client'
import BackButton from '@/components/back-button';
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {inter, inter500, inter700} from "@/app/fonts";
import {formatAmount} from "@/utils/Format";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {NumericFormat} from "react-number-format";

const SetAutoRepayment = () => {
    const router = useRouter()
    const [amount, setAmount] = useState('')
    const [selectedTimePrefference, setSelectedTimePrefference] = useState('')

    const handleBackClick = () => {
        router.push(`/my-loan-profile`)
    }
    const  repaymentTimeButton = (text: string, isChecked: boolean, onClick: ()=> void,size:string) => {
        return(
            <Button
                onClick={onClick}
                id={'ButtonFor' + text?.replace(' ', '')}
                data-testid={'ButtonFor' + text?.replace(' ', '')}
                className={clsx(` ${size} lg:px-8  md:px-8 h-fit py-3   border border-[#C9C9D4] bg-[#F6F6F6] text-[14px] ${inter.className} text-black flex justify-center items-center  `, {[` ${size} lg:px-8  md:px-8 h-fit py-3  border border-[#FDE2D2] text-[14px] text-white ${inter700.className}  bg-meedlBlue  flex justify-center items-center  `]: isChecked})}
            >
                {text}
            </Button>
        )

    }

    const monthlyRepaymentField = ( ) => {
        return(
            <div className={` w-fit mr-auto ml-auto `}>
                <p className={`  mr-auto ml-auto text-[#212221] md:text-[14px] ${inter500.className}  `}>Amount</p>
                <div className='w-full h-fit mt-auto  mb-auto  '>
                    <NumericFormat
                        id="amount"
                        name="amount"
                        // type="number"
                        type="text"
                        inputMode="numeric"
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale={true}
                        placeholder="Enter amount"
                        value={amount}
                        // component={CustomInputField}
                        className="w-full p-3 h-[3rem] mt-auto mb-auto border rounded focus:outline-none"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = e.target.value;
                            value = value.replace(/\D/g, "");
                            setAmount(value)
                        }}
                    />
                </div>

            </div>

        )
    }

    return (
        <div
            className={` w-full px-2 py-2 `}
        >
            <BackButton id={'backtoMyLoanDetails'}  text={'Back'} handleClick={handleBackClick} textColor={'meedlBlue'} iconBeforeLetters={true}/>
            <main className={` px-8 grid gap-8   `}>
                <header
                    className={` w-full py-2 h-fit border-b border-[#D7D7D7] md:flex md:justify-between `}
                >
                    <div></div>
                    <section className={` `}>
                        <p className={` md:text-[14px] mr-0  text-meedlBlue ${inter.className} `}>Wallet balance</p>
                        <p className={` md:text-[20px] text-meedlBlue ${inter500.className} `}>{formatAmount(300000000000)}</p>
                    </section>
                </header>
                <section className={` grid justify-items-center  `}>
                    <div className={` w-fit mr-auto ml-auto `}>
                        <p className={`  mr-auto ml-auto text-[#212221] md:text-[20px] ${inter500.className}  `}>Set auto repayment</p>
                        <p className={` mr-auto ml-auto text-[#4D4E4D] md:text-[12px] ${inter.className} `}>Automatically deduct repayments from your account</p>
                    </div>
                    <div className={` grid gap-3  `}>
                        <div className={` w-fit  `}>
                            <p className={`  mr-auto ml-auto text-[#212221] md:text-[14px] ${inter500.className}  `}>How will you prefer to repay?</p>
                            <div>
                                {repaymentTimeButton('Weekly', selectedTimePrefference === 'Weekly', () => {setSelectedTimePrefference('Weekly')}, ` w-[40%] `)}
                                {repaymentTimeButton('Monthly', selectedTimePrefference === 'Monthly', () => {setSelectedTimePrefference('Monthly')}, ` w-[40%] `)}

                            </div>
                        </div>
                        {selectedTimePrefference === 'Monthly' &&<div>
                            {monthlyRepaymentField()}
                        </div>}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SetAutoRepayment;