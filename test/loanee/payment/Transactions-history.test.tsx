import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { TransactionHistory,Transaction } from '@/reuseable/transactions/Transaction-history';
import '@testing-library/jest-dom';


jest.mock('@/reuseable/transactions/Transaction-items', () => ({
    TransactionItem: ({ transaction, isLast }: { transaction: Transaction; isLast: boolean }) => (
      <div data-testid={`transaction-item-${transaction.description}`}>
        {transaction.description} - {transaction.amount}
      </div>
    )
  }));
  
  jest.mock('@/reuseable/Skeleton-loading-state/Skeleton-for-transaction', () => () => (
    <div data-testid="skeleton-loader">Loading...</div>
  ));
  
  jest.mock('@/reuseable/emptyStates/General-emptystate', () => ({ 
    icon, iconSize, iconContainerClass, color, message }: any) => (
    <div data-testid="empty-state">
      {message}
    </div>
  ));
  
  jest.mock('@/components/back-button', () => ({ 
    handleClick, text }: any) => (
    <button onClick={handleClick} data-testid="back-button">
      {text}
    </button>
  ));
  
  jest.mock('react-infinite-scroll-component', () => ({ 
    children, dataLength, next, hasMore, loader, height }: any) => (
    <div data-testid="infinite-scroll" data-height={height}>
      {children}
      {hasMore && loader}
    </div>
  ));


  const mockTransactions: Transaction[] = [
    {
      date: '2024-01-15',
      description: 'Loan Repayment',
      status: 'Completed',
      type: 'Credit',
      amount: '₦50,000.00'
    },
    {
      date: '2024-01-15',
      description: 'Wallet Transfer',
      status: 'Pending',
      type: 'Debit',
      amount: '₦25,000.00'
    },
    {
      date: '2024-01-14',
      description: 'Interest Payment',
      status: 'Completed',
      type: 'Credit',
      amount: '₦5,000.00'
    }
  ];

  describe('TransactionHistory Component', () => {

     beforeEach(() => {
            cleanup()
            jest.spyOn(console,'log').mockReturnValue();
            jest.spyOn(console,'warn').mockReturnValue();
            jest.spyOn(console,'error').mockReturnValue();
        })
   
    it('should render skeleton loader when isLoading is true', () => {
        render(
          <TransactionHistory 
            transactions={[]} 
            isLoading={true}
          />
        );
    
        expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
      });

      it('should render empty state when transactions array is empty', () => {
        render(
          <TransactionHistory 
            transactions={[]} 
            isLoading={false}
          />
        );
    
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
        expect(screen.getByText('Payment history will appear here')).toBeInTheDocument();
      });

      it('should group transactions by date and display date headers', () => {
        render(
          <TransactionHistory 
            transactions={mockTransactions} 
            isLoading={false}
          />
        );
    
        expect(screen.getByText('2024-01-15')).toBeInTheDocument();
        expect(screen.getByText('2024-01-14')).toBeInTheDocument();
      });


      it('should render all transaction items with correct data', () => {
        render(
          <TransactionHistory 
            transactions={mockTransactions} 
            isLoading={false}
          />
        );
    
        expect(screen.getByTestId('transaction-item-Loan Repayment')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-item-Wallet Transfer')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-item-Interest Payment')).toBeInTheDocument();
      });


      it('should display "View all" button when handleViewAll prop is provided', () => {
        const mockHandleViewAll = jest.fn();
        
        render(
          <TransactionHistory 
            transactions={mockTransactions} 
            isLoading={false}
            handleViewAll={mockHandleViewAll}
          />
        );
    
        const viewAllButton = screen.getAllByTestId('back-button')[0];
        expect(viewAllButton).toBeInTheDocument();
        expect(viewAllButton).toHaveTextContent('View all');
      });


      it('should call handleViewAll when "View all" button is clicked', () => {
        const mockHandleViewAll = jest.fn();
        
        render(
          <TransactionHistory 
            transactions={mockTransactions} 
            isLoading={false}
            handleViewAll={mockHandleViewAll}
          />
        );
    
        const viewAllButton = screen.getAllByTestId('back-button')[0];
        fireEvent.click(viewAllButton);
        
        expect(mockHandleViewAll).toHaveBeenCalledTimes(1);
      });


      it('should use infinite scroll when infinityScroll prop is provided', () => {
        const mockInfinityScroll = {
          hasMore: true,
          loadMore: jest.fn(),
          loader: <div>Loading more...</div>
        };
    
        render(
          <TransactionHistory 
            transactions={mockTransactions} 
            isLoading={false}
            infinityScroll={mockInfinityScroll}
            infinityScrollHeight="70vh"
          />
        );
    
        const infiniteScroll = screen.getByTestId('infinite-scroll');
        expect(infiniteScroll).toBeInTheDocument();
        expect(infiniteScroll).toHaveAttribute('data-height', '70vh');
      });

      it('should group multiple transactions with the same date under one header', () => {
        const sameDateTransactions: Transaction[] = [
          { date: '2024-01-15', description: 'Transaction 1', status: 'Completed', type: 'Credit', amount: '₦10,000' },
          { date: '2024-01-15', description: 'Transaction 2', status: 'Pending', type: 'Debit', amount: '₦5,000' },
          { date: '2024-01-15', description: 'Transaction 3', status: 'Failed', type: 'Debit', amount: '₦2,000' }
        ];
    
        render(
          <TransactionHistory 
            transactions={sameDateTransactions} 
            isLoading={false}
          />
        );
    
        
        const dateHeaders = screen.getAllByText('2024-01-15');
        expect(dateHeaders).toHaveLength(1);
        
        expect(screen.getByTestId('transaction-item-Transaction 1')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-item-Transaction 2')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-item-Transaction 3')).toBeInTheDocument();
      });

      it('should not render "View all" button when handleViewAll is not provided', () => {
        render(
          <TransactionHistory 
            transactions={mockTransactions} 
            isLoading={false}
          />
        );
    
        const backButtons = screen.queryAllByTestId('back-button');
        expect(backButtons).toHaveLength(0);
      });


  }) 