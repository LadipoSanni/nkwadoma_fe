import React from 'react';
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";

const Index = () => {
    return (
        <main
            id={'loaneeProfile'}
            className={`w-full h-full`}
        >
          <LoaneeProfileHeader/>
        </main>
    );
};

export default Index;