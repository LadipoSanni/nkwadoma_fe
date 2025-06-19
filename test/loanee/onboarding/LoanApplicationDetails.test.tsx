import { render, screen, fireEvent } from '@testing-library/react';
import LoanApplicationDetails from '@/features/onboarding/stepContent/loanApplicationDetails/Index';
import LoaneeOnboarding from "@/features/onboarding/loanee";
import {Providers} from "@/app/provider";
import React from "react";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    })),
    usePathname: () => jest.fn(),
}));

describe('LoanApplicationDetails', () => {
    const data = {
        tuitionAmount: "0.00",
        amountRequested: "0.00",
        initialDeposit: "0.00",
        referredBy: "",
    }
    global.fetch = jest.fn(() =>
        Promise.resolve(new Response(JSON.stringify({ data: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }))
    );
    it('renderns the header correctly', () => {
        render(
            <Providers>
                <LoaneeOnboarding />
            </Providers>
        );
        expect(screen.getByText('Loan referral acceptance process')).toBeInTheDocument();
    });

    it('applies the correct CSS class names', () => {
        render(
            <Providers>
                <LoaneeOnboarding />
            </Providers>
        );
        const header = screen.getByText('Loan referral acceptance process');
        expect(header).toHaveClass('md:text-[28px]', 'text-[16px]', 'leading-[120%]');
    });

    it('renders the continue button correctly', () => {
        render(
            <Providers>
                <LoaneeOnboarding />
            </Providers>
        );
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-meedlBlue', 'rounded-md', 'h-[2.8125rem]');
    });
    it('toggles collapsible content correctly', () => {
        render(
            <Providers>
                <LoanApplicationDetails loaneeLoanDetail={data} />
            </Providers>
        );
        const trigger = screen.getByText('Expand to see the tuition breakdown');
        fireEvent.click(trigger);
        expect(screen.getByText('Collapse to hide the tuition breakdown')).toBeInTheDocument();
        expect(screen.getByText('Tuition')).toBeInTheDocument();
    });
    test('renders additional information component', () => {
        render(
            <Providers>
                <LoanApplicationDetails loaneeLoanDetail={data}/>
            </Providers>
        );
        expect(screen.getByText('Tuition amount')).toBeInTheDocument();
    });

    it('renders the collapsible trigger text correctly', () => {
        render(
            <Providers>
                <LoanApplicationDetails loaneeLoanDetail={data} />
            </Providers>
        );
        const trigger = screen.getByText('Expand to see the tuition breakdown');
        expect(trigger).toBeInTheDocument();
    });

    it('applies correct CSS class names to the collapsible trigger', () => {
        render(
            <Providers>
                <LoanApplicationDetails loaneeLoanDetail={data}/>
            </Providers>
        );
        const trigger = screen.getByText('Expand to see the tuition breakdown');
        expect(trigger).toHaveClass('font-normal', 'text-[14px]', 'leading-[150%]', 'text-black300');
    });
});