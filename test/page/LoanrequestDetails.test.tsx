import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import LoanDetails from "@/pages/admin/loan-request-details";

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("test loan request details page component", ()=> {

    beforeEach(()=> {
        render(
            <LoanDetails/>
        )
    })

    test("component is rendered when called", ()=> {
        const component = screen.getByTestId("loanRequestDetails")
        expect(component).toBeInTheDocument()
    })

    test("must contain user  profile picture and details component", ()=> {
        const loaneeImage = screen.getByTestId("loaneeImageOnLoanRequestDetails")
        // const component = screen.getByTestId('ImageComponentOnLoanRequestDetails')
        const loaneeName = screen.getByTestId('loaneeNameOnLoanRequestDetails')
        const loaneeProgram = screen.getByTestId('loaneeProgramOnLoanRequestDetails')
        const checkCreadit = screen.getByTestId('loaneeCheckCreditScoreOnLoanRequestDetails')
        expect(loaneeImage).toBeInTheDocument()
        expect(loaneeName).toBeInTheDocument()
        expect(loaneeProgram).toBeInTheDocument()
        expect(checkCreadit).toBeInTheDocument()


    })
})