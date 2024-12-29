import "@testing-library/react"
import { render, screen} from "@testing-library/react";
import DisbursedLoanDetails from "@/pages/admin/disbursed-loan-details";
import {Providers} from "@/app/provider";
// import {userEvent} from "@testing-library/user-event";

describe('test loan disburse details page', ()=> {

    beforeEach(() => {
        render(
            <Providers>
                <DisbursedLoanDetails/>
            </Providers>
        )
    })

    test('that component exist ', ()=> {
        const container = screen.getByTestId("disbursedLoanMainContainer")
        expect(container).toBeInTheDocument()
    })
    test('that component contains back button and its works', ()=> {
        const backButton  = screen.getByTestId("disbursedLoanDetailsBackButton")
        expect(backButton).toBeInTheDocument()


    })
})