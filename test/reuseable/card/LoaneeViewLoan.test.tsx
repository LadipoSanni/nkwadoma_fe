import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoaneeViewLoan from '@/reuseable/cards/LoaneeViewLoan';
import { LoanType } from '@/types/loanee';

describe('LoaneeViewLoan Component', () => {
    const mockHandleClick = jest.fn();

    const mockData: LoanType = {
        loanProgressId: '1',
        organizationName: 'Meedl',
        loanType: 'LOAN_REQUEST',
        loanAmount: 5000,
        amountOutstanding: 2000,
        amountRepaid: 3000,
    } as unknown as LoanType;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders organization name', () => {
        render(<LoaneeViewLoan handleClick={mockHandleClick} data={mockData} />);
        expect(screen.getByText('Meedl')).toBeInTheDocument();
    });

    it('renders organization initial', () => {
        render(<LoaneeViewLoan handleClick={mockHandleClick} data={mockData} />);
        expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('shows correct loan status text', () => {
        render(<LoaneeViewLoan handleClick={mockHandleClick} data={mockData} />);
        // LOAN_REQUEST → should show "Request"
        expect(screen.getByText('Request')).toBeInTheDocument();
    });


    it('displays loan amounts formatted', () => {
        render(<LoaneeViewLoan handleClick={mockHandleClick} data={mockData} />);
        expect(screen.getByText('₦5,000.00')).toBeInTheDocument();
        expect(screen.getByText('₦2,000.00')).toBeInTheDocument();
        expect(screen.getByText('₦3,000.00')).toBeInTheDocument();
    });

    it('calls handleClick when "View details" button is clicked', () => {
        render(<LoaneeViewLoan handleClick={mockHandleClick} data={mockData} />);
        const button = screen.getByRole('button', { name: /view details/i });
        fireEvent.click(button);
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });
});
