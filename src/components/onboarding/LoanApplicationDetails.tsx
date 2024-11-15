import React from 'react'
import {cabinetGrotesk, inter} from '@/app/fonts'
import Connector from "@/components/common/Connector";
import {Button} from "@/components/ui/button";

const steps = [
    'Loan application details',
    'Verify your identity',
    'Additional information',
    'Confirm loan application'
]

const LoanApplicationDetails = () => {
    return (
        <div className={`grid md:gap-[58px] gap-6 ${inter.className}`}>
            <header className={'flex items-start border-b-lightBlue250 border-b border-solid w-full  py-5'}>
                <h1 className={`${cabinetGrotesk.className} md:text-[28px] text-[16px] leading-[120%]`}>Loan referral acceptance
                    process</h1>
            </header>
            <div className={'md:flex md:justify-between grid gap-5 md:gap-0'}>
                <aside className={'inline-flex flex-col items-start gap-1'}>
                    {
                        steps.map((step, index) => (
                            <div key={index} className={'flex gap-2'}>
                                <Connector showLine={index < steps.length - 1}/>
                                <p className={'text-meedlBlue text-[14px] leading-[150%]'}>{step}</p>
                            </div>
                        ))
                    }
                </aside>
                <section className={'grid md:p-5 py-5 px-3 md:gap-[22px] gap-5 md:w-[36.75rem] w-full rounded-md border border-lightBlue250 '}>
                    <h2 className={`${cabinetGrotesk.className} text-labelBlue md:text-[20px] text-[16px] leading-[120%]`}>Loan application
                        details</h2>
                    <div className={'rounded-md grid gap-9 p-5 bg-grey105'}>
                        <div className={'md:flex md:justify-between grid gap-3'}>
                            <h3 className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Tuition amount</h3>
                            <p className={`text-black500 text-[14px] leading-[150%]`}>₦3,500,000.00</p>
                        </div>
                        <div className={'md:flex md:justify-between grid gap-3'}>
                            <h3 className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Start date</h3>
                            <p className={`text-black500 text-[14px] leading-[150%]`}>13 Dec, 2023</p>
                        </div>
                        <div className={'md:flex md:justify-between grid gap-3'}>
                            <h3 className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Loan amount requested</h3>
                            <p className={`text-black500 text-[14px] leading-[150%]`}>₦3,000,000.00</p>
                        </div>
                        <div className={'md:flex md:justify-between grid gap-3'}>
                            <h3 className={`text-grey300 font-normal text-[14px] leading-[120%]`}>Deposit</h3>
                            <p className={`text-black500 text-[14px] leading-[150%]`}>₦35,000</p>
                        </div>
                    </div>
                    <Button
                        className={'bg-meedlBlue rounded-md h-[45px] w-[102px] self-end justify-self-end hover:bg-meedlBlue focus:bg-meedlBlue'}>Continue</Button>
                </section>
            </div>
        </div>
    )
}
export default LoanApplicationDetails