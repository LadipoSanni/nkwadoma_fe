import '@testing-library/react'
import {screen, render,cleanup} from '@testing-library/react'
import {Providers} from "@/app/provider";
import ReviewLoan from '@/features/loaneeViews/review-loan'

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => jest.fn(),
}));
describe('test review loan component', () => {
       beforeEach(() => {
                  jest.clearAllMocks();
                    cleanup();
            
                    jest.spyOn(console, 'log').mockReturnValue();
                    jest.spyOn(console, 'warn').mockReturnValue();
                    jest.spyOn(console, 'error').mockReturnValue();
                })
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
