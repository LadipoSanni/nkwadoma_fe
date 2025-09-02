import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";

const Index = () => {

    const router = useRouter();
    const backToLoanRequest = () => {
        router.push("/loan/loan-request")
    }


    return (
        <div
            id={'createLoanOffer'}
            data-testid={'createLoanOffer'}
            className={` w-full h-full px-3 py-3  `}
        >
            <BackButton handleClick={backToLoanRequest} iconBeforeLetters={true} text={"Back"}
                        id={"loanRequestDetailsBackButton"} textColor={'#142854'}/>
            
        </div>
    );
};

export default Index;