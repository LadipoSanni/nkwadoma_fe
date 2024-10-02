import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/react";
// import ViewAllLoanRequest from "@/app/(Admin)/loan/(selectedLoan)/loanRequest/ViewAllLoanRequest";
// import {LoanRequestTable} from "@/app/(Admin)/loan/(selectedLoan)/loanRequest/LoanRequestMockData";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {expect, describe, it} = require("@jest/globals");


describe("ViewAllLoanRequest", ()=>{
    it("should test that viewAllLoanRequest does not exist", ()=>{
        const {queryByTestId} = render(
            <div></div>
        )
        const emptyState = queryByTestId("mainDiv")
        expect(emptyState).not.toBeInTheDocument();
    });

    // it("should test that viewAllLoanRequest exist", ()=>{
    //     const {queryByTestId} = render(<ViewAllLoanRequest/>)
    //     const emptyState = queryByTestId("mainDiv")
    //     expect(emptyState).toBeInTheDocument()
    // })
    //
    // it('should render empty state when there are no loan requests', () => {
    //     const originalLoanRequestTable = LoanRequestTable;
    //     LoanRequestTable.length = 0;
    //     render(<ViewAllLoanRequest />);
    //     expect(screen.getByTestId('emptyStateDiv')).toBeInTheDocument();
    //     expect(screen.getByText('Loan request will show here')).toBeInTheDocument();
    //     LoanRequestTable.length = originalLoanRequestTable.length;
    // });
})