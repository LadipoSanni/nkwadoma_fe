'use client'
import BackButton from '@/components/back-button';
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {inter, inter500, inter700} from "@/app/fonts";
import {formatAmount} from "@/utils/Format";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {NumericFormat} from "react-number-format";
import DatePickerInput from "@/reuseable/Input/DatePickerInput";
import StringDropdown from "@/reuseable/Dropdown/DropdownSelect";

const SetAutoRepayment = () => {
    const router = useRouter()
    const [amount, setAmount] = useState('')
    const [selectedTimePreference, setSelectedTimePreference] = useState('')
    const [selectedAccountType, setSelectedAccountType] = useState('')
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [seletedDay, setSelectedDay] = useState('Monday');
    const [selectedTime, setSelectedTime] = useState('12:00AM');

    const handleBackClick = () => {
        router.push(`/my-loan-profile`)
    }
    const [startDate, setDate] = useState<Date>();


    const  repaymentTimeButton = (text: string, isChecked: boolean, onClick: ()=> void,size:string) => {
        return(
            <Button
                onClick={onClick}
                id={'ButtonFor' + text?.replace(' ', '')}
                data-testid={'ButtonFor' + text?.replace(' ', '')}
                className={clsx(` ${size} lg:px-8  md:px-8 h-fit py-2 text-[14px] `, isChecked ? `   border-2 border-[#FDE2D2]  text-white ${inter700.className}  bg-meedlBlue  flex justify-center items-center  ` : `border border-[#C9C9D4] bg-[#F6F6F6]  ${inter.className} text-black flex justify-center items-center` )}
            >
                {text}
            </Button>
        )

    }

    const radioButton = (isChecked: boolean, text: string, onClick: ()=> void) => {
        return (
            <button onClick={onClick} id={`RadioButton` + text?.replace(' ', '')} data-testid={`RadioButton` + text?.replace(' ', '')} className={` h-fit  flex gap-1  md:gap-4  text-[#4D4E4D] text-[14px] ${inter500.className} `}>
                <div className={clsx(`  aspect-square rounded-full `,  isChecked ?  `  border-2 border-[#e6effb]` : `border-2 border-white `)}>
                    <div className={clsx(` px-2 py-2 rounded-full aspect-square `, isChecked ? ` border border-meedlBlue bg-[#e8eaee]   ` :  ` bg-white border border-[#CFCFCF] `)}>
                        <div className={clsx(`  h-2 w-2 aspect-square  ` , isChecked ? "rounded-full bg-meedlBlue h-2 w-2 aspect-square " : 'bg-white rounded-full  h-2 w-2 aspect-square ')}></div>
                    </div>
                </div>
                <p className={` mt-auto mb-auto  `}>{text}</p>
            </button>
        )
    }

    function getHalfHourIntervals(): string[] {
        const intervals: string[] = [];
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        for (let i = 0; i < 48; i++) {
            const hours = Math.floor(i / 2);
            const minutes = (i % 2) * 30;
            const time = new Date();
            time.setHours(hours, minutes, 0, 0);

            const formatted = time.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });

            intervals.push(formatted);
        }

        return intervals;
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    const monthlyRepaymentField = ( ) => {
        return(
            <div className={` grid md:gap-4 gap-2 w-full mr-auto ml-auto `}>
                <div>
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
                            className={`w-full p-3 h-[3rem] text-[#4D4E4D] text-[14px] ${inter.className}  mt-auto mb-auto border rounded focus:outline-none`}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // let value = e.target.value;
                                // value = value.replace(/\D/g, "");
                                setAmount(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <p className={` md:text-[14px]  text-[#4D4E4D] ${inter.className}  `}>Set primary source of payment</p>
                    <div className={` md:flex lg:flex grid  grid-cols-2 gap-3   `}>
                        {radioButton(selectedAccountType === 'Wallet', 'Wallet', () => {setSelectedAccountType('Wallet')})}
                        {radioButton(selectedAccountType === 'Linked accounts', 'Linked accounts', () => {setSelectedAccountType('Linked accounts')})}
                    </div>
                </div>
                <div className={` grid grid-cols-2 gap-4  md:flex lg:flex md:w-fit lg:w-fit w-full   `}>
                    <div>
                        <p className={` text-[12px] lg:text-[14px]  md:text-[14px] text-[#101828] ${inter500.className} `}>Day of the month</p>
                        <StringDropdown
                            height={' h-[3rem]  '}
                            label={seletedDay}
                            items={days}
                            onSelect={(value) => {setSelectedDay(value)}}
                        />
                    </div>
                    <div  className={` grid gap-0 `}>
                        <p className={` text-[12px] lg:text-[14px]  md:text-[14px] text-[#101828] ${inter500.className} `}>Preferred time</p>
                        <StringDropdown
                            height={' h-[3rem]  '}
                            label={selectedTime}
                            items={getHalfHourIntervals()}
                            onSelect={(value) => {setSelectedTime(value)}}
                        />
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div
            className={` w-full px-2 py-2 `}
        >
            <BackButton id={'backtoMyLoanDetails'}  text={'Back'} handleClick={handleBackClick} textColor={'meedlBlue'} iconBeforeLetters={true}/>
            <main className={` w-full px-2  md:px-8 grid gap-8   `}>
                <header
                    className={` w-full py-2 h-fit border-b border-[#D7D7D7] md:flex md:justify-between `}
                >
                    <div></div>
                    <section className={` `}>
                        <p className={` md:text-[14px] mr-0  text-meedlBlue ${inter.className} `}>Wallet balance</p>
                        <p id={'walletBalanceAmount'} data-testid={'walletBalanceAmount'} className={` md:text-[20px] text-meedlBlue ${inter500.className} `}>{formatAmount(300000000000)}</p>
                    </section>
                </header>
                <section className={` bg-red-300 max-h-[40vh] h-[40vh] grid md:flex `}>
                    <section className={` grid gap-3 w-full justify-items-center  `}>
                        <div className={` w-fit mr-auto ml-auto `}>
                            <p className={`  mr-auto ml-auto text-[#212221] md:text-[20px] ${inter500.className}  `}>Set auto repayment</p>
                            <p className={` mr-auto ml-auto text-[#4D4E4D] md:text-[12px] ${inter.className} `}>Automatically deduct repayments from your account</p>
                        </div>
                        <div className={` w-full md:w-fit grid md:justify-items-center gap-3  `}>
                            <div className={` grid gap-4 md:items-center   w-full md:grid md:gap-2 lg:grid lg:gap-2  `}>
                                <p className={`   md:flex md:items-center text-[#212221] md:text-[14px] ${inter500.className}  `}>How will you prefer to repay?</p>
                                <div className={` grid grid-cols-2 gap-2 md:gap-3 lg:gap-3 md:flex lg:flex `}>
                                    {repaymentTimeButton('Weekly', selectedTimePreference === 'Weekly', () => {setSelectedTimePreference('Weekly')}, ` w-full  `)}
                                    {repaymentTimeButton('Monthly', selectedTimePreference === 'Monthly', () => {setSelectedTimePreference('Monthly')}, ` w-full  `)}
                                </div>
                            </div>
                            {selectedTimePreference === 'Monthly' &&<div>
                                {monthlyRepaymentField()}
                            </div>}
                        </div>
                    </section>
                    <button className={clsx(` w-full self-end md:self-end lg:self-end md:w-fit lg:w-fit  px-4 py-2 h-fit rounded-md  ${inter700.className} text-[14px]  `, 2 !== 2 ? ` text ` : ` bg-meedlBlue text-white `)}>
                        Save
                    </button>
                </section>
            </main>
        </div>
    );
};

export default SetAutoRepayment;