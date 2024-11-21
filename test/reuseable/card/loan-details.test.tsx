import LoanDetailsCard from "@/reuseable/cards/loan-details-card";
import {render, screen} from "@testing-library/react";


describe("test loan details component", ()=> {

    it('should contain the main container', () => {
        render(
            <LoanDetailsCard/>
        )
        const component = screen.getByTestId("loanDetailsCardMainComponent")
        expect(component).toBeInTheDocument()
    });
})