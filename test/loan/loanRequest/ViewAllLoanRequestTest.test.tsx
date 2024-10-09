import React from "react";
import {render, screen, fireEvent,cleanup, } from "@testing-library/react";
import "@testing-library/react";
import { LoanRequestTable } from "@/utils/LoanRequestMockData/Index";
import ViewAllLoanRequest from "@/pages/portFolioManager/loan/Index";;
import { useRouter } from 'next/navigation';


describe("ViewAllLoanRequest", ()=>{
    const mockPush = jest.fn();

    beforeEach(() => {

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
    })
    
    beforeEach(() => {
        cleanup()
    })
   


    beforeEach(() => {
        render(<ViewAllLoanRequest />)
    })

   

    it("should test that viewAllLoanRequest exist", ()=>{
        const {queryByTestId} = render(<ViewAllLoanRequest/>)
        const emptyState = screen.getAllByTestId('mainDivContainer')
        expect(emptyState[0]).toBeInTheDocument();
    })
    
    it('should render empty state when there are no loan requests', () => {
        const originalLoanRequestTable = LoanRequestTable;
        LoanRequestTable.length = 0;
        render(<ViewAllLoanRequest />);
        expect(screen.getByTestId('emptyStateDiv')).toBeInTheDocument();
        LoanRequestTable.length = originalLoanRequestTable.length;
    });
})