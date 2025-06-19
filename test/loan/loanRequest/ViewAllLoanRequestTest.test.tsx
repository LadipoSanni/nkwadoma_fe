import React from "react";
import {render, screen,cleanup, } from "@testing-library/react";
import "@testing-library/react";
// import { LoanRequestTable } from "@/utils/LoanRequestMockData/Index";
// import ViewAllLoanRequest from "@/pages/admin/loan/Index";
import Index from "@/components/viewAll/LoanRequestTable";
import {Providers} from "@/app/provider";


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useParams: jest.fn(),
    usePathname: () => jest.fn(),
  }));
  ;
import { useRouter } from 'next/navigation';


// jest.mock('next/navigation', () => ({
//     useRouter: jest.fn(),
//   }));
  


describe("ViewAllLoanRequest", ()=>{
    const mockPush = jest.fn();

   
    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
    })
   


    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve(new Response(JSON.stringify({ data: [] }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }))
        );
        render(
            <Providers>
                <Index />
            </Providers>
        )
    })

   

    it("should test that viewAllLoanRequest exist", ()=>{
        const emptyState = screen.getAllByTestId('mainDivContainer')
        expect(emptyState[0]).toBeInTheDocument();
    })
    
    // it('should render empty state when there are no loan requests', () => {
    //     const originalLoanRequestTable = LoanRequestTable;
    //     LoanRequestTable.length = 0;
    //     render(<ViewAllLoanRequest />);
    //     expect(screen.getByTestId('LoanRequestEmptyState')).toBeInTheDocument();
    //     LoanRequestTable.length = originalLoanRequestTable.length;
    // });
})