'use client'
import React from 'react';
import BackButton from "@/components/back-button";
import LoaneeProfileHeader from "@/components/loanee-my-profile/loaneeProfileHeader";
import LoaneeLoanDetails from "@/components/loanee-my-profile/LoaneeLoanDetails";
import LoaneeBasicDetails from "@/components/loanee-my-profile/LoaneeBasicDetails";

const OrganizationViewLoaneeProfile = () => {
    const  handleBack = () => {

    }
    return (
        <div
            className={` w-full h-full px-4 py-2`}
        >
            <BackButton sx={'pl-5 pt-2 pb-4'} id={'backToViewLoanee'} handleClick={handleBack} iconBeforeLetters={true} textColor={'meedlBlue'} text={'Back'} />
            <LoaneeProfileHeader userName={'Margaret Ezeoke'} program={'COLOC'} cohort={'ASS'}/>
            <div className={`flex w-full  max-h-[65vh]  `}>
                <LoaneeLoanDetails />
                <LoaneeBasicDetails />
            </div>
        </div>
    );
};

export default OrganizationViewLoaneeProfile;