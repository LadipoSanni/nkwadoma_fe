import React from 'react';
import { render, screen,cleanup } from '@testing-library/react';
import { formatAmount } from '@/utils/Format';
import { TransactionItem,Transaction } from '@/reuseable/transactions/Transaction-items';

jest.mock('@/utils/Format', () => ({
    formatAmount: jest.fn((amount) => `₦${amount}`)
  }));

  describe('TransactionItem', () => {
    const baseTransaction: Transaction = {
      date: '2024-01-15',
      description: 'Test Transaction',
      status: 'successful',
      type: 'credit',
      amount: '100.00'
    };

    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue();
        jest.spyOn(console,'warn').mockReturnValue();
        jest.spyOn(console,'error').mockReturnValue();
    })

    it('renders transaction description, type, and formatted amount', () => {
        render(<TransactionItem transaction={baseTransaction} />);
        
        expect(screen.getByText('Test Transaction')).toBeInTheDocument();
        expect(screen.getByText('credit')).toBeInTheDocument();
        expect(screen.getByText('₦100.00')).toBeInTheDocument();
      });

    it('applies correct styling for successful status', () => {
        const successfulTransaction: Transaction = {
          ...baseTransaction,
          status: 'successful'
        };
        
        render(<TransactionItem transaction={successfulTransaction} />);
        
        const statusBadge = screen.getByText('successful');
        const amount = screen.getByText('₦100.00');
        
        expect(statusBadge).toHaveClass('text-[#045620]', 'bg-[#E6F2EA]');
        expect(amount).toHaveClass('text-[#045620]');
      });

    it('applies correct styling for failed status', () => {
        const failedTransaction: Transaction = {
          ...baseTransaction,
          status: 'failed'
        };
        
        render(<TransactionItem transaction={failedTransaction} />);
        
        const statusBadge = screen.getByText('failed');
        const amount = screen.getByText('₦100.00');
        
        expect(statusBadge).toHaveClass('text-[#C1231D]', 'bg-[#FBE9E9]');
        expect(amount).toHaveClass('text-[#D42620]');
      });

    it('applies correct styling for pending status', () => {
        const pendingTransaction: Transaction = {
          ...baseTransaction,
          status: 'pending'
        };
        
        render(<TransactionItem transaction={pendingTransaction} />);
        
        const statusBadge = screen.getByText('pending');
        const amount = screen.getByText('₦100.00');
        
        expect(statusBadge).toHaveClass('text-[#AD7311]', 'bg-[#FEF6E8]');
        expect(amount).toHaveClass('text-[#AD7311]');
      });

    it('handles case-insensitive status values', () => {
        const uppercaseTransaction: Transaction = {
          ...baseTransaction,
          status: 'SUCCESSFUL'
        };
        
        render(<TransactionItem transaction={uppercaseTransaction} />);
        
        const statusBadge = screen.getByText('SUCCESSFUL');
        expect(statusBadge).toHaveClass('text-[#045620]', 'bg-[#E6F2EA]');
      });
    

    it('handles different transaction types correctly', () => {
        const debitTransaction: Transaction = {
          ...baseTransaction,
          type: 'debit',
          description: 'Payment to Vendor'
        };
        
        render(<TransactionItem transaction={debitTransaction} />);
        
        expect(screen.getByText('debit')).toBeInTheDocument();
        expect(screen.getByText('Payment to Vendor')).toBeInTheDocument();
      });

      it('handles different amount formats correctly', () => {
        const largeAmountTransaction: Transaction = {
          ...baseTransaction,
          amount: '2500.50'
        };
        
        (formatAmount as jest.Mock).mockReturnValue('₦2,500.50');
        
        render(<TransactionItem transaction={largeAmountTransaction} />);
        
        expect(screen.getByText('₦2,500.50')).toBeInTheDocument();
      });


    
})