'use client'
import BackButton from '@/components/back-button';
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {inter, inter500, inter700} from "@/app/fonts";
import {formatAmount} from "@/utils/Format";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {NumericFormat} from "react-number-format";
import StringDropdown from "@/reuseable/Dropdown/DropdownSelect";
import SearchableDropdown ,{DropdownItem} from "@/reuseable/Dropdown/SearchableDropDown";
import Image from "next/image";
import { GoCheckCircle } from "react-icons/go";
import Calender from "@/components/icons/Calender";

const SetAutoRepayment = () => {
    const router = useRouter()
    const [amount, setAmount] = useState('')
    const [selectedTimePreference, setSelectedTimePreference] = useState('Weekly')
    const [selectedAccountType, setSelectedAccountType] = useState('')
    // const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [seletedDay, setSelectedDay] = useState('Monday');
    const [selectedTime, setSelectedTime] = useState('12:00am');
    const [selectedAccount, setSelectedAccount] = useState('')
    const isAccountSelected = selectedAccountType === 'Wallet' ? false : selectedAccount?.length < 1
    const isDisable = selectedTimePreference === 'Weekly' ? (!amount || !selectedTime || !seletedDay || !selectedAccountType || isAccountSelected ) : false;

    const handleBackClick = () => {
        router.push(`/my-loan-profile`)
    }
    // const [startDate, setDate] = useState<Date>();


    const  repaymentTimeButton = (text: string, isChecked: boolean, onClick: ()=> void,size:string) => {
        return(
            <Button
                onClick={onClick}
                id={'ButtonFor' + text?.replace(' ', '')}
                data-testid={'ButtonFor' + text?.replace(' ', '')}
                className={clsx(` ${size} rounded-md h-fit px-2 py-1.5  text-[14px] `, isChecked ? ` rounded-md  border-4 border-[#FDE2D2]  text-white ${inter700.className}  bg-meedlBlue  flex   ` : `border border-[#C9C9D4] bg-[#F6F6F6] mt-auto mb-auto  ${inter.className} text-black flex ` )}
            >
                <span className={` flex justify-center items-center py-2 w-full  `}>{text}</span>
                {isChecked && <span className={` self-start bg-white rounded-full w-fit h-fit  `}><GoCheckCircle className={` text-meedlBlue  `}/></span>}
            </Button>
        )

    }

    const radioButton = (isChecked: boolean, text: string, onClick: ()=> void) => {
        return (
            <button onClick={onClick} id={`RadioButton` + text?.replace(' ', '')} data-testid={`RadioButton` + text?.replace(' ', '')} className={` h-fit w-fit   flex gap-1  md:gap-4  text-[#4D4E4D] text-[14px] ${inter500.className} `}>
                <div className={clsx(` h-fit aspect-square rounded-full `,  isChecked ?  `  border-2 border-[#e6effb]` : `border-2 border-white `)}>
                    <div className={clsx(` px-2 py-2 rounded-full aspect-square `, isChecked ? ` border h-fit border-meedlBlue bg-[#e8eaee]   ` :  ` bg-white border border-[#CFCFCF] `)}>
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

            intervals.push(formatted?.toLowerCase());
        }

        return intervals;
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const items: DropdownItem[] = [
        {
            id: 1,
            label: "Access Bank Nigeria Limited",
            subLabel: "4145358587",
            icon: <Image src="/accessbanglogo.png" alt="Access Bank" width={24} height={24} />,
        },
        {
            id: 2,
            label: "Guaranty Trust Holding Company Plc,Guaranty Trust Guaranty Trust ",
            subLabel: "4145358587",
            icon: <Image src="/gtbanklogo.png" alt="GTBank" width={24} height={24} />,
        },
        // {
        //     id:3,
        //     label: "Guaranty Trust Holding Company Plc,Guaranty Trust Guaranty Trust ",
        //     subLabel: "4145358587",
        //     icon: <Image src="/gtbanklogo.png" alt="GTBank" width={24} height={24} />,
        //
        // },
        // {
        //     id:4,
        //     label: "Guaranty Trust Holding Company Plc,Guaranty Trust Guaranty Trust ",
        //     subLabel: "4145358587",
        //     icon: <Image src="/gtbanklogo.png" alt="GTBank" width={24} height={24} />,
        //
        // },
        // {
        //     id:5,
        //     label: "Guaranty Trust Holding Company Plc,Guaranty Trust Guaranty Trust ",
        //     subLabel: "4145358587",
        //     icon: <Image src="/gtbanklogo.png" alt="GTBank" width={24} height={24} />,
        //
        // },
        // {
        //     id:6,
        //     label: "Guaranty Trust Holding Company Plc,Guaranty Trust Guaranty Trust ",
        //     subLabel: "4145358587",
        //     icon: <Image src="/gtbanklogo.png" alt="GTBank" width={24} height={24} />,
        //
        // },
    ];


    const repaymentField = ( ) => {
        return(
            <div className={` grid md:gap-4 gap-2 w-full mr-auto ml-auto `}>
                <div>
                    <p className={`  mr-auto ml-auto text-[#212221] md:text-[14px] ${inter500.className}  `}>Amount</p>
                    <div className='w-full h-fit mt-auto  mb-auto  '>
                        <NumericFormat
                            id="amount"
                            name="amount"
                            // type="number"
                            prefix={'₦'}
                            type="text"
                            inputMode="numeric"
                            thousandSeparator=","
                            decimalScale={2}
                            allowNegative={false}
                            placeholder="Enter amount"
                            value={amount}
                            fixedDecimalScale
                            className={`w-full p-3 h-[3rem] text-[#4D4E4D] text-[14px] ${inter.className}  mt-auto mb-auto border rounded focus:outline-none`}
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            //     setAmount(e.target.value)
                            // }}
                            onValueChange={(values) => {
                                // values.value is the raw numeric string (without commas or ₦)
                                const rounded = Math.round(parseFloat(values.value || "0") * 100) / 100;
                                setAmount(rounded.toString());
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
                {selectedAccountType === 'Linked accounts' &&
                    <div className={` grid gap-1 w-full`}>
                        <p className={` text-[12px] lg:text-[14px]  md:text-[14px] text-[#101828] ${inter500.className} `}>Select account  to pay from</p>
                        <SearchableDropdown
                            items={items}
                            widthClass={` w-[100%] !w-[100%] !max-w-[100%] md:w-[30rem] md:!w-[30rem] md:!max-w-[30vw]   `}
                            placeholderStyle={` ${inter.className} text-sm text-[#4D4E4D]  `}
                            onSelect={(item) => setSelectedAccount(item?.label || '')}
                            placeholder="Select account"
                            footerNote="You can pay from one or more linked accounts."
                        />
                    </div>
                }
                <div className={` grid grid-cols-2 gap-4  md:flex lg:flex  w-full   `}>
                    <div className={` grid gap-1 md:w-[65%] w-full`}>
                        <p className={` text-[12px] lg:text-[14px]  md:text-[14px] text-[#101828] ${inter500.className} `}>Day of the month</p>
                        <StringDropdown
                            dropDownStyles={' w-full w-full  h-[2.5rem]  '}
                            label={seletedDay}
                            items={days}
                            onSelect={(value) => {setSelectedDay(value)}}
                            dropdownMenuContentStyles={` md:w-[14rem] md:!w-[14rem] w-[40vw] !w-[40vw] `}
                            dropDownItemsStyles={` w-full text-[#4D4E4D] h-fit py-4  border-b border-[#ECECEC]  `}
                        />
                    </div>
                    <div  className={` grid gap-1 w-full  md:w-[35%]  `}>
                        <p className={` text-[12px] lg:text-[14px]  md:text-[14px] text-[#101828] ${inter500.className} `}>Preferred time</p>
                        <StringDropdown
                            dropDownStyles={' h-[2.5rem] w-full !w-full   '}
                            label={selectedTime}
                            items={getHalfHourIntervals()}
                            onSelect={(value) => {setSelectedTime(value)}}
                            dropdownMenuContentStyles={` md:w-[14rem] md:!w-[14rem] w-[20vw] !w-[20vw] `}
                            dropDownItemsStyles={` w-full text-[#4D4E4D] h-fit py-4  border-b border-[#ECECEC]  `}
                        />
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div
            className={` w-full px-2 py-2 grid gap-4 `}
        >
            <BackButton id={'backtoMyLoanDetails'}  text={'Back'} handleClick={handleBackClick} textColor={'meedlBlue'} iconBeforeLetters={true}/>
            <main className={` w-full px-2  md:px-8 grid gap-8   `}>
                <header
                    className={` w-full py-2 h-fit border-b border-[#D7D7D7] md:flex md:justify-between `}
                >
                    <Calender
                        // height={'20'} width={'20'}
                    />
                    <section className={` `}>
                        <p className={` md:text-[14px] mr-0  text-meedlBlue ${inter.className} `}>Wallet balance</p>
                        <p id={'walletBalanceAmount'} data-testid={'walletBalanceAmount'} className={` md:text-[20px] text-meedlBlue ${inter500.className} `}>{formatAmount(300000000000)}</p>
                    </section>
                </header>
                <section className={`  w-full max-h-[60vh] h-[60vh] grid md:flex `}>
                    <section className={` grid gap-3 h-fit   w-full justify-items-center  `}>
                        <div className={` w-fit grid justify-items-center `}>
                            <p className={`   text-[#212221] md:text-[20px] ${inter500.className}  `}>Set auto repayment</p>
                            <p className={`  text-[#4D4E4D] md:text-[12px] ${inter.className} `}>Automatically deduct repayments from your account</p>
                        </div>
                        <div className={` w-full md:w-[30vw] md:max-w-[30vw] lg:w-[30vw] lg:max-w-[30vw]  grid md:justify-items-center gap-3  `}>
                            <div className={` grid gap-4 md:items-center   w-full md:grid md:gap-2 lg:grid lg:gap-2  `}>
                                <p className={`   md:flex md:items-center text-[#212221] md:text-[14px] ${inter500.className}  `}>How will you prefer to repay?</p>
                                <div className={` grid grid-cols-2 gap-2 md:gap-3 lg:gap-3 md:flex lg:flex `}>
                                    {repaymentTimeButton('Weekly', selectedTimePreference === 'Weekly', () => {setSelectedTimePreference('Weekly')}, ` w-full  `)}
                                    {repaymentTimeButton('Monthly', selectedTimePreference === 'Monthly', () => {setSelectedTimePreference('Monthly')}, ` w-full  `)}
                                </div>
                            </div>
                            {<div className={` w-full  `}>
                                {repaymentField()}
                            </div>}
                        </div>
                    </section>
                    <button className={clsx(` mt-4 md:mt-0 lg:mt-0 w-full self-end md:self-end lg:self-end md:w-fit lg:w-fit  px-4 py-2 h-fit rounded-md  ${inter700.className} text-[14px]  `, isDisable ? `bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white ` : ` bg-meedlBlue text-white `)}>
                        Save
                    </button>
                </section>
            </main>
        </div>
    );
};

export default SetAutoRepayment;