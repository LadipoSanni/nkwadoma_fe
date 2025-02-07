import React from 'react';

const LoanTermsAndConditions = () => {
    return (
        <main className={'p-5'}>
            <section className={'grid gap-3'}>
                <h1 className={'text-black500 text-[14px] font-medium leading-[150%]'}>Default terms</h1>
                <ul className={'list-disc text-black400 font-normal text-[14px] leading-[150%]'}>
                    <li>If the loanee fails to make payments for three consecutive months, the lender reserves the right
                        to demand immediate repayment of the outstanding balance.
                    </li>
                    <li>The loanee will be responsible for any legal fees incurred by the lender to recover the loan
                        amount.
                    </li>
                </ul>

            </section>

        </main>
    );
};

export default LoanTermsAndConditions;