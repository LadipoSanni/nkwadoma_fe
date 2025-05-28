import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeLoanDetails from '@/components/loanee-my-profile/LoaneeLoanDetails'
import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";

const Index = () => {
    return (
        <main
            id={'loaneeProfile'}
            className={`w-full  h-full`}
        >
          <LoaneeProfileHeader/>
           <div className={`flex w-full max-h-[77vh]  `}>
               <LoaneeLoanDetails/>
               <LoaneeBasicDetails/>
           </div>
        </main>
    );
};

export default Index;