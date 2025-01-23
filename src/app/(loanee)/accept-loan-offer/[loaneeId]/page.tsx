'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import AcceptLoanOfferDetails from '@/pages/loanee/AcceptLoanOfferDetails/Index';

const AcceptLoanOfferPage = () => {
    const params = useParams();
    const loaneeId = params?.loaneeId;
    return <AcceptLoanOfferDetails loaneeId={loaneeId as string} />;
};

export default AcceptLoanOfferPage;