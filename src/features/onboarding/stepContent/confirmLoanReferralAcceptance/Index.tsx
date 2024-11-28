import React, {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';

const ConfirmLoanReferralAcceptance = () => {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
                <Checkbox
                    id="confirmCheckbox"
                    className="data-[state=checked]:bg-[#142854]"
                    checked={isCheckboxChecked}
                    onCheckedChange={(checked) => setIsCheckboxChecked(checked === true)}
                />
                <label
                    htmlFor="confirmCheckbox"
                    className="w-[479px] text-black500 text-[14px] font-normal leading-[150%]"
                >
                    By ticking the box and clicking <span className={'font-semibold'}>confirm</span>, you acknowledge
                    that all
                    the information entered is accurate to the best of your knowledge. This includes personal details,
                    financial information, and any supporting documentation submitted.
                </label>
            </div>
            <Button
                id="continueButton"
                className={`text-meedlWhite text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem] ${!isCheckboxChecked ? 'bg-blue50 ' : 'bg-meedlBlue hover:bg-meedlBlue focus:bg-meedlBlue'}`}
                disabled={!isCheckboxChecked}
            >
                Continue
            </Button>
        </div>
    );
};

export default ConfirmLoanReferralAcceptance;