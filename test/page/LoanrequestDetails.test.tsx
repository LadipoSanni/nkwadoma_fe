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
})