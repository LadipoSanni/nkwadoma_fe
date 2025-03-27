import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import BalanceCard from '@/reuseable/cards/BalanceCard/Index';
import { Providers } from '@/app/provider';

const loaneeCardData = [
    { title: "Wallet balance", amount: "₦0.00", linkText: "Go to wallet" },
    { title: "Loan balance", amount: "₦0.00", linkText: "Go to repayment" }
];

describe('BalanceCard Component', () => {
    beforeEach(() => {
        cleanup();
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
        expect(buttons[0]).toHaveClass('w-[92]px bg-blue500 hover:bg-blue500');
        expect(buttons[1]).toHaveClass('w-[107]px bg-blue500 hover:bg-blue500');
    });
});