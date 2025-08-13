import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import BalanceCard from '@/reuseable/cards/BalanceCard/Index';
import { Providers } from '@/app/provider';
const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
    usePathname: () => mockUsePathname,

}));

const loaneeCardData = [
    { title: "Wallet balance", amount: "₦0.00", linkText: "Go to wallet" },
    { title: "Loan balance", amount: "₦0.00", linkText: "Go to repayment" }
];

describe('BalanceCard Component', () => {
    beforeEach(() => {
        cleanup();
    });

    
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockReturnValue();
        jest.spyOn(console, 'warn').mockReturnValue();
        jest.spyOn(console, 'error').mockReturnValue();
      });

    test('renders BalanceCard component', () => {
        render(
            <Providers>
                <BalanceCard cardData={loaneeCardData} />
            </Providers>
        );
        expect(screen.getByText('Wallet balance')).toBeInTheDocument();
        expect(screen.getByText('Loan balance')).toBeInTheDocument();
    });

    test('renders buttons with correct text', () => {
        render(
            <Providers>
                <BalanceCard cardData={loaneeCardData} />
            </Providers>
        );
        expect(screen.getByText('Go to wallet')).toBeInTheDocument();
        expect(screen.getByText('Go to repayment')).toBeInTheDocument();
    });

    test('renders buttons with correct styles', () => {
        render(
            <Providers>
                <BalanceCard cardData={loaneeCardData} />
            </Providers>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toHaveClass('w-auto bg-grey50 hover:bg-grey50');
        expect(buttons[1]).toHaveClass('w-auto bg-grey50 hover:bg-grey50');
    });
});
