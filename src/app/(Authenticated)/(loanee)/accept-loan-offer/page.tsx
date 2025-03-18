import React from 'react';
import AcceptLoanOfferDetails from '@/pages/loanee/AcceptLoanOfferDetails/Index';
import CustomAuthorization from "@/features/auth/authorization";

const AcceptLoanOfferPage = () => {
  return(
      <CustomAuthorization authorizedRoles={['LOANEE']}>
        <AcceptLoanOfferDetails  />
      </CustomAuthorization>
)
};

export default AcceptLoanOfferPage;