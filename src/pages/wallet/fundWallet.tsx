'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import {inter, inter500, inter700} from "@/app/fonts";
import {formatAmount} from "@/utils/Format";
import FundWalletBigIcon from "@/components/icons/FundWalletBigIcon";
import {clsx} from "clsx";
import {NumericFormat} from "react-number-format";
import SearchableDropdown, {DropdownItem} from "@/reuseable/Dropdown/SearchableDropDown";
import Image from "next/image";
import RadioCheckButton from "@/reuseable/buttons/RadioCheckButton";
import {useAppSelector} from "@/redux/store";

const FundWallet = () => {
    const router = useRouter()
    const [amount, setAmount] = useState('')
    const [fundWalletVia, setFundWalletVia] = React.useState<string>('Paystack');
    const [selectedAccount, setSelectedAccount] = useState<{id: string | number, accountName: string, accountNumber: string, bankImage: React.ReactNode}>()
    const isDisable = fundWalletVia === 'Linked accounts' ? !selectedAccount || !amount : !amount;
    const [previewPayment, setPreviewPayment] = useState(false);
    const fromWhere = useAppSelector(state => state.walletFlow.fundWalletFrom);
    const handleBackClick = () => {
        if (fromWhere === 'payment') {
            router.push('/payment')
        }else {
            router.push(`/wallet`)
        }
    }





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

    ];

    const fundViaPaystack = () => {
        return(
            <main  className={` h-full grid  `}>
                    <div>
                        <p className={`  mr-auto ml-auto text-[#212221] md:text-[14px] ${inter500.className}  `}>Amount</p>
                        <div className='w-full h-fit mt-auto  mb-auto  '>
                            <NumericFormat
                                id="amount"
                                name="amount"
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
                                onValueChange={(values) => {
                                    // values.value is the raw numeric string (without commas or ₦)
                                    const rounded = Math.round(parseFloat(values.value || "0") * 100) / 100;
                                    setAmount(rounded.toString());
                                }}
                            />
                        </div>
                    </div>

                    <div className={`  w-full self-end flex items-end mt-auto      `}>
                        <button
                            id={`continue`}
                            data-testid={`continue`}
                            onClick={() => {setPreviewPayment(true)}}
                            disabled={isDisable}
                            className={clsx(` lg:ml-auto lg:mt-auto  md:mr-0 md:mb-0 w-full  md:w-fit lg:w-fit  md:px-6 py-2 h-fit rounded-md  ${inter700.className} text-[14px]  `, isDisable ? `bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white ` : ` bg-meedlBlue text-white `)}>
                            Continue
                        </button>
                    </div>
            </main>
        )
    }
    const renderForLinkedAccount = () => {
        return(
            <main className={` h-full  `}>
                { previewPayment ?
                    <div className={` grid h-full  `}>
                       <div className={` grid h-fit gap-6  `}>
                           <p className={` text-[#4D4E4D] ${inter500.className} text-lg `}>Review your transaction</p>
                           <div className={` grid gap-4 h-fit   `}>
                            <span>
                                <p className={` text-[#4D4E4D] ${inter.className} text-[10px] `}>Amount</p>
                                <p className={` text-[#212221] text-sm ${inter500.className} `}>{formatAmount(amount)}</p>
                            </span>
                               <div>
                                   <p className={` text-[#4D4E4D] ${inter.className} text-[10px] `}>Payment method</p>
                                   <div className={` flex gap-2  text-sm ${inter500.className} text-[#212221]  `}>
                                       <span className={` mt-auto mb-auto rounded-full w-fit h-fit  `}>{selectedAccount?.bankImage}</span>
                                       <span className={` flex gap-1  `}>{selectedAccount?.accountName} - {selectedAccount?.accountNumber}</span>
                                       {/*<span>{selectedAccount?.accountNumber}</span>*/}
                                   </div>
                               </div>
                           </div>
                       </div>
                        <div className={`  w-full self-end flex items-end mt-auto      `}>
                            <button
                                id={`continueToPayment`}
                                data-testid={`continueToPayment`}
                                disabled={isDisable}
                                className={clsx(` lg:ml-auto lg:mt-auto  md:mr-0 md:mb-0 w-full  md:w-fit lg:w-fit  md:px-6 py-2 h-fit rounded-md  ${inter700.className} text-[14px]  `, isDisable ? `bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white ` : ` bg-meedlBlue text-white `)}>
                                Continue to payment
                            </button>
                        </div>
                    </div>
                    :
                  <div className={` h-full  grid `}>
                    <div className={` h-fit grid gap-6  `}>
                        <div>
                            <p className={`  mr-auto ml-auto text-[#212221] md:text-[14px] ${inter500.className}  `}>Amount</p>
                            <div className='w-full h-fit mt-auto  mb-auto  '>
                                <NumericFormat
                                    id="amount"
                                    name="amount"
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
                                    onValueChange={(values) => {
                                        // values.value is the raw numeric string (without commas or ₦)
                                        const rounded = Math.round(parseFloat(values.value || "0") * 100) / 100;
                                        setAmount(rounded.toString());
                                    }}
                                />
                            </div>
                        </div>
                        <div className={` grid gap-1 w-full`}>
                            <p className={` text-[12px] lg:text-[14px]  md:text-[14px] text-[#101828] ${inter500.className} `}>Select
                                account to pay from</p>
                            <SearchableDropdown
                                items={items}
                                widthClass={` w-[100%] !w-[100%] !max-w-[100%] md:w-[100%] md:!w-[100%] md:!max-w-[100%]   `}
                                placeholderStyle={` ${inter.className} text-sm text-[#4D4E4D]  `}
                                onSelect={(item) => setSelectedAccount({id:item?.id, accountName: item?.label, accountNumber: item?.subLabel || '',bankImage: item?.icon})}
                                placeholder="Select account"
                                footerNote="You can pay from one or more linked accounts."
                            />
                        </div>
                    </div>
                    <div className={`  w-full self-end flex items-end mt-auto      `}>
                        <button
                            id={`continue`}
                            data-testid={`continue`}
                            onClick={() => {setPreviewPayment(true)}}
                            disabled={isDisable}
                            className={clsx(` lg:ml-auto lg:mt-auto  md:mr-0 md:mb-0 w-full  md:w-fit lg:w-fit  md:px-6 py-2 h-fit rounded-md  ${inter700.className} text-[14px]  `, isDisable ? `bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white ` : ` bg-meedlBlue text-white `)}>
                            Continue
                        </button>
                    </div>
                </div>
                }
            </main>
        )
    }


    return (
        <div
            className={` w-full px-2 py-2 grid gap-4 `}
        >
            <BackButton id={'backtoWallet'}  text={'Back'} handleClick={handleBackClick} textColor={'meedlBlue'} iconBeforeLetters={true}/>
            <main className={` w-full px-2  md:px-8 grid gap-8   `}>
                <header
                    className={` w-full py-2 h-fit border-b border-[#D7D7D7] md:flex md:justify-between `}
                >
                    <div>
                        <FundWalletBigIcon/>
                        <p className={` text-[20px] ${inter500.className} text-[#212221]  `}>Fund wallet</p>
                    </div>
                    <section className={`  h-fit mt-auto  `}>
                        <p className={` md:text-[14px] mr-0  text-meedlBlue ${inter.className} `}>Wallet balance</p>
                        <p id={'walletBalanceAmount'} data-testid={'walletBalanceAmount'} className={` md:text-[20px] text-meedlBlue ${inter500.className} `}>{formatAmount(300000000000)}</p>
                    </section>
                </header>
                <section
                    className={` md:flex  lg:flex md:justify-between lg:justify-between  md:w-[80%] mr-auto ml-auto grid   h-[60vh]    max-h-[60vh] md:max-h-[60vh]  `}
                >
                    <div className={` grid gap-2 h-fit `}>
                        <p className={` text-[#4D4E4D] text-[14px] ${inter.className} `}>Fund via</p>
                        <RadioCheckButton isChecked={fundWalletVia === 'Paystack'}  text={'Paystack'} onClick={() => {setFundWalletVia('Paystack')}} />
                        <RadioCheckButton isChecked={fundWalletVia === 'Linked accounts'} text={'Linked accounts' } onClick={() => {
                            setPreviewPayment(false)
                            setFundWalletVia('Linked accounts')
                        }} />
                    </div>
                    <div className={` grid  md:w-[70%] lg:w-[70%] md:px-8 lg:px-8 md:py-8 lg:py-8  h-[50vh]  border max-h-[60vh] md:border md:border-[#D7D7D7] rounded-md  `}>
                        {fundWalletVia === 'Linked accounts' ?
                            renderForLinkedAccount()
                            :
                            fundViaPaystack()
                        }
                    </div>

                </section>
            </main>
        </div>
    );
};

export default FundWallet;