'use client'
import React from 'react';
import Transaction from "@/pages/Transaction";
import {generateMockData} from "@/types/ButtonTypes";
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation';

const LoaneeTransactions = () => {

    const router = useRouter()
    const hah = () => {
        router.push('/wallet')
    }

    return (
        <main className={` w-full h-[90vh] pt-2 grid gap-2   md:h-[80vh]  o  md:px-4 `}>
            <BackButton
                id={'backButton'}
                iconBeforeLetters={true}
                handleClick={hah}
                text={'Back'}
                textColor={'meedlBlue'}
            />
            <div className={` px-2   `}>
                <Transaction viewLittle={false} data={generateMockData(100)}/>
            </div>
        </main>
    );
};

export default LoaneeTransactions;