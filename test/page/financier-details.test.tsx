import FinancierDetails from "@/pages/admin/financier-details";
import {render, screen} from '@testing-library/react'
import {Providers} from "@/app/provider";

jest.mock('next/navigation', ()=> ({
    useRouter: jest.fn()
}));
describe('testing financier details page', () => {
    beforeEach(()=> {
        render(
            <Providers>
                <FinancierDetails/>
            </Providers>
        )
    })

    test('should render the financier details page', () => {
        const container = screen.getByTestId('financierDetailsPage')
        expect(container).toBeInTheDocument()
    })

    test('should render the financier details page contains back button', () => {
        const backbuttonToViewAllFinancier = screen.getByTestId('backButtonToViewAllFinancier')
        expect(backbuttonToViewAllFinancier).toBeInTheDocument()

    })
    // test('that on clicking back button, it should route to view all financiers', async () => {
    //     const mockBack = jest.fn();
    //     (useRouter as jest.Mock).mockReturnValue({back: mockBack});
    //     const backbuttonToViewAllFinancier = screen.getByTestId('backButtonToViewAllFinancier')
    //     // const viewAllFinancierTable = await screen.getAllByTestId("loanProductTableContainer")
    //     await userEvent.click(backbuttonToViewAllFinancier)
    //     expect(mockBack).toHaveBeenCalledTimes(1);
    // })

        // await waitFor(() => expect(viewAllFinancierTable).toBeInTheDocument())
    // })

    test('should contain the financier name and email', () => {
        const financierFullName = screen.getByTestId('financierName')
        const financierEmail = screen.getByTestId('financierEmail')
        expect(financierFullName).toBeInTheDocument()
        expect(financierEmail).toBeInTheDocument()
    })


})