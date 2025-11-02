'use client'
import BackButton from '@/components/back-button';
import React from 'react';
import WalletBalance from "@/reuseable/cards/WalletBalance";

const Wallet = () => {

    const hah = () => {

    }
    return (
        <div
            id={'loaneeWalletComponent'}
            data-test-id="loaneeWalletComponent"
            className={` px-4 pt-4  `}
        >
            <BackButton
                id={'backButton'}
                iconBeforeLetters={true}
                handleClick={hah}
                text={'Back'}
                textColor={'meedlBlue'}
            />
            <WalletBalance/>
        </div>
    );
};

export default Wallet;