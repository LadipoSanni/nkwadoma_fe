import React from 'react';
import {LoanType} from "@/types/loanee";

interface Props {
    isLoading: boolean,
    handleClick: () => void,
    data: LoanType
}

const LoaneeViewLoan: React.FC<Props> = ({
    isLoading,
    handleClick,
    data
                                         }) => {
    return (
        <div>

        </div>
    );
};

export default LoaneeViewLoan;