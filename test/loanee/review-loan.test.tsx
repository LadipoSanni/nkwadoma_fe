import '@testing-library/react'
import {screen, render} from '@testing-library/react'
import {Providers} from "@/app/provider";
import ReviewLoan from '@/features/loanee/review-loan'

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => jest.fn(),
}));
describe('test review loan component', () => {
    test('should contains loan basic details component', () => {
        render(
            <Providers>
                <ReviewLoan/>
            </Providers>
        )
        expect(screen.getByTestId('LoanAmount')).toBeInTheDocument()
        expect(screen.getByTestId('amountOutstanding')).toBeInTheDocument()
        expect(screen.getByTestId('amountRepaid')).toBeInTheDocument()
        expect(screen.getByTestId('interest')).toBeInTheDocument()
        expect(screen.getByTestId('interestIncurred')).toBeInTheDocument()

    })
})
