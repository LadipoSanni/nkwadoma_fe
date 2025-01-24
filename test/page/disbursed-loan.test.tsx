import "@testing-library/react"
import { render, screen} from "@testing-library/react";
import DisbursedLoanDetails from "../../src/features/portfolio-manager/disbursed-loan-details";
import {Providers} from "@/app/provider";
// import {userEvent} from "@testing-library/user-event";

jest.mock('next/navigation', ()=> ({
    useRouter: jest.fn()
}))

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
    // test('that component contains back button and its works', ()=> {
    //     const push = jest.fn();
    //
    //     (useRouter as jest.Mock).mockImplementation(() => ({
    //         push,
    //     }));
    //     const backButton  = screen.getByTestId("disbursedLoanDetailsBackButton")
    //     expect(backButton).toBeInTheDocument()
    //      fireEvent.click(backButton)
    //     expect(push).toHaveBeenCalledWith('/loan/loan-disbursal')
    //
    // })
})