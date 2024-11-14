import React from 'react'
import {cabinetGrotesk} from '@/app/fonts'
import Connector from "@/components/common/Connector";

const LoanApplicationDetails = () => {
    return (
        <div className={'grid gap-[58px]'}>
            <header className={'flex items-start border-b-lightBlue250 border-b border-solid w-full  py-5'}>
                <h1 className={`${cabinetGrotesk.className} text-[28px] leading-[120%]`}>Loan referral acceptance
                    process</h1>
            </header>
            <div className={'flex gap-2'}>
                <Connector />
                <div>Loan application details</div>
            </div>
        </div>
    )
}
export default LoanApplicationDetails