import { render, screen, fireEvent } from '@testing-library/react';
import LoanApplicationDetails from '@/features/onboarding/stepContent/loanApplicationDetails/Index';
import LoaneeOnboarding from "@/features/onboarding/loanee";


describe('LoanApplicationDetails', () => {
    it('renders the header correctly', () => {
        render(<LoaneeOnboarding />);
        expect(screen.getByText('Loan referral acceptance process')).toBeInTheDocument();
    });

    it('applies the correct CSS class names', () => {
        render(<LoaneeOnboarding />);
        const header = screen.getByText('Loan referral acceptance process');
        expect(header).toHaveClass('md:text-[28px]', 'text-[16px]', 'leading-[120%]');
    });

    it('renders the continue button correctly', () => {
        render(<LoaneeOnboarding />);
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-meedlBlue', 'rounded-md', 'h-[2.8125rem]');
    });

    it('toggles collapsible content correctly', () => {
        render(<LoanApplicationDetails />);
        const trigger = screen.getByText('Expand to see the tuition breakdown');
        fireEvent.click(trigger);
        expect(screen.getByText('Collapse to hide the tuition breakdown')).toBeInTheDocument();
        expect(screen.getByText('Tuition')).toBeInTheDocument();
        expect(screen.getByText('₦2,000,000.00')).toBeInTheDocument();
    });

    it('renders the collapsible trigger text correctly', () => {
        render(<LoanApplicationDetails />);
        const trigger = screen.getByText('Expand to see the tuition breakdown');
        expect(trigger).toBeInTheDocument();
    });

    it('applies correct CSS class names to the collapsible trigger', () => {
        render(<LoanApplicationDetails />);
        const trigger = screen.getByText('Expand to see the tuition breakdown');
        expect(trigger).toHaveClass('font-normal', 'text-[14px]', 'leading-[150%]', 'text-black300');
    });
});