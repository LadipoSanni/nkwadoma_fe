'use client'
import BackButton from '@/components/back-button';
import React from 'react';
import WalletBalance from "@/reuseable/cards/WalletBalance";
import LinkAccount from "@/features/loaneeViews/payment/Link-account";
import {bankAccounts} from "@/features/loaneeViews/payment/Payment";

const Wallet = () => {

    const hah = () => {

    }
    const bankAccount = {
        bankName: "Access Bank Nigeria Limited",
        logo: "https://www.processmaker.com/wp-content/uploads/2019/10/Access_Bank_Logo.png",
        accountNumber: "0701234567",
    }
    return (
        <div
            id={'loaneeWalletComponent'}
            data-test-id="loaneeWalletComponent"
            className={` px-2 pt-2 gap-2  md:px-4 md:pt-4 grid md:gap-4  `}
        >
            <BackButton
                id={'backButton'}
                iconBeforeLetters={true}
                handleClick={hah}
                text={'Back'}
                textColor={'meedlBlue'}
            />
            <WalletBalance balance={200000}/>
            <LinkAccount bankAccount={bankAccount} numberOfAccounts={bankAccounts?.length} handleRouteClick={hah}/>


        </div>
    );
};

export default Wallet;