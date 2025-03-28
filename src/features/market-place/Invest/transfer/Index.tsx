"use client"
import React from 'react';
import {useRouter} from 'next/navigation';

const Transfer = () => {
    const router = useRouter();

    const handleCont = () => {
        router.push('/marketplace/confirmTransfer');
    }
    return (
        <div>
            <button onClick={handleCont}>
                Continue

            </button>
        </div>
    );
}

export default Transfer;