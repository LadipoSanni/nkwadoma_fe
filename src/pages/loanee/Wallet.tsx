'use client'
import BackButton from '@/components/back-button';
import React from 'react';
import WalletBalance from "@/reuseable/cards/WalletBalance";
import Connect from "@/components/icons/Connect";
import {inter500, inter} from "@/app/fonts";
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
            className={` px-4 pt-4 grid gap-4  `}
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
            {/*<div*/}
            {/*    id={'linkedAccountBanner'}*/}
            {/*    data-testid={'linkedAccountBanner'}*/}
            {/*    className={` w-full rounded-lg h-fit py-6 px-4 bg-[#E8EAEE] flex gap-4 items-center justify-between   `}*/}
            {/*>*/}
            {/*    <div className={` flex gap-4  `}>*/}
            {/*        <Connect/>*/}
            {/*        <div className={`grid gap-2 h-fit  `}>*/}
            {/*            <p className={` text-base ${inter500.className} text-meedlBlue `}>Linked accounts</p>*/}
            {/*            <p className={` text-xs ${inter.className} text-[#4D4E4D] `} >Enjoy secure, automatic payments</p>*/}
            {/*        </div>*/}
            {/*        <div className={` h-[2rem]  w-[1.4px] bg-meedlBlue  `}></div>*/}

            {/*    </div>*/}
            {/*    <BackButton id={'viewLinkedCard'} textColor={'meedlBlue'} iconBeforeLetters={false} text={'View'} handleClick={hah}/>*/}
            {/*</div>*/}
        </div>
    );
};

export default Wallet;