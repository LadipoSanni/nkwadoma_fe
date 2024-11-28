import React from 'react';
import {Checkbox} from '@/components/ui/checkbox';

const ConfirmLoanReferralAcceptance = () => {
    return (
        <div className="flex items-start gap-4">
            <Checkbox id="confirmCheckbox" className="data-[state=checked]:bg-[#142854]"/> <label
            htmlFor="confirmCheckbox" className="w-[479px] text-black500 text-[14px] font-normal leading-[150%]">
            By ticking the box and clicking <span className={'font-semibold'}>confirm</span>, you acknowledge that all
            the information entered is accurate to
            the best of your knowledge. This includes personal details, financial information, and any supporting
            documentation submitted.
        </label>
        </div>
    );
};

export default ConfirmLoanReferralAcceptance;