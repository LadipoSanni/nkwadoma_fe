import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeLoanDetails from '@/components/loanee-my-profile/LoaneeLoanDetails'

const Index = () => {
    return (
        <main
            id={'loaneeProfile'}
            className={`w-full h-full`}
        >
          <LoaneeProfileHeader/>
           <div className={`flex w-full h-full`}>
               <LoaneeLoanDetails/>
           </div>
        </main>
    );
};

export default Index;