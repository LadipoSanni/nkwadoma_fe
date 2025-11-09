import React from 'react';
import { render, screen, fireEvent,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LinkAccount from '@/features/loaneeViews/payment/Link-account';

jest.mock('@/reuseable/svg-icons/Icons', () => ({
    LinkIcon: ({ className }: { className: string }) => (
      <svg data-testid="link-icon" className={className} />
    )
  }));

jest.mock('@/components/ui/separator', () => ({
    Separator: ({ orientation, className }: { orientation: string; className: string }) => (
      <div data-testid="separator" data-orientation={orientation} className={className} />
    )
  }));

jest.mock('@/components/back-button', () => ({ 
    handleClick, text, textColor, id, className }: any) => (
    <button 
      onClick={handleClick} 
      data-testid="back-button"
      data-id={id}
      data-text-color={textColor}
      className={className}
    >
      {text}
    </button>
  ));

  jest.mock('next/image', () => ({ 
    src, alt, className, width, height, unoptimized }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      width={width}
      height={height}
      data-unoptimized={unoptimized}
      data-testid="bank-logo"
    />
  ));
  
  jest.mock('@/utils/GlobalMethods', () => ({
    getInitial: (bankName: string) => bankName.substring(0, 2).toUpperCase()
  }));

  const mockBankAccount = {
    bankName: 'Guaranty Trust Bank',
    logo: '/gtb-logo.png',
    accountNumber: '0123456789'
  };
  
  const mockHandleRouteClick = jest.fn();

  describe('LinkAccount Component', () => {
   beforeEach(() => {
          cleanup()
          jest.spyOn(console,'log').mockReturnValue();
          jest.spyOn(console,'warn').mockReturnValue();
          jest.spyOn(console,'error').mockReturnValue();
          jest.clearAllMocks();
        })

        it('should render all main elements with correct content', () => {
          render(
            <LinkAccount 
              numberOfAccounts={1}
              bankAccount={mockBankAccount}
              handleRouteClick={mockHandleRouteClick}
            />
          );

          expect(screen.getByText('Linked accounts')).toBeInTheDocument();
         expect(screen.getByText('Enjoy secure, automatic payments')).toBeInTheDocument();
         expect(screen.getByText('Added accounts')).toBeInTheDocument();
         expect(screen.getByText('Guaranty Trust Bank')).toBeInTheDocument();
          expect(screen.getByText('0123456789')).toBeInTheDocument();
          expect(screen.getByText('View')).toBeInTheDocument();
        })

        it('should display bank logo when logo is provided', () => {
          render(
            <LinkAccount 
              numberOfAccounts={1}
              bankAccount={mockBankAccount}
              handleRouteClick={mockHandleRouteClick}
            />
          );
      
          const bankLogo = screen.getByTestId('bank-logo');
          expect(bankLogo).toBeInTheDocument();
          expect(bankLogo).toHaveAttribute('src', '/gtb-logo.png');
          expect(bankLogo).toHaveAttribute('alt', 'bank-image');
        });

        it('should display initials when logo is not provided', () => {
          const bankAccountWithoutLogo = {
            ...mockBankAccount,
            logo: ''
          };
      
          render(
            <LinkAccount 
              numberOfAccounts={1}
              bankAccount={bankAccountWithoutLogo}
              handleRouteClick={mockHandleRouteClick}
            />
          );
      
          expect(screen.getByText('GU')).toBeInTheDocument(); // Initials from getInitial mock
          expect(screen.queryByTestId('bank-logo')).not.toBeInTheDocument();
        });

        it('should call handleRouteClick when View button is clicked', () => {
          render(
            <LinkAccount 
              numberOfAccounts={1}
              bankAccount={mockBankAccount}
              handleRouteClick={mockHandleRouteClick}
            />
          );
      
          const viewButton = screen.getByTestId('back-button');
          fireEvent.click(viewButton);
          
          expect(mockHandleRouteClick).toHaveBeenCalledTimes(1);
        });

        it('should render separator only in desktop view', () => {
          render(
            <LinkAccount 
              numberOfAccounts={1}
              bankAccount={mockBankAccount}
              handleRouteClick={mockHandleRouteClick}
            />
          );
      
          const separator = screen.getByTestId('separator');
          expect(separator).toBeInTheDocument();
          expect(separator).toHaveAttribute('data-orientation', 'vertical');
          
        });

        it('should handle different bank names and account numbers correctly', () => {
          const differentBankAccount = {
            bankName: 'First Bank of Nigeria',
            logo: '',
            accountNumber: '9876543210'
          };
      
          render(
            <LinkAccount 
              numberOfAccounts={2}
              bankAccount={differentBankAccount}
              handleRouteClick={mockHandleRouteClick}
            />
          );
      
          expect(screen.getByText('First Bank of Nigeria')).toBeInTheDocument();
          expect(screen.getByText('9876543210')).toBeInTheDocument();
          expect(screen.getByText('FI')).toBeInTheDocument();
         
        });

        it('should have correct IDs and data attributes', () => {
          render(
            <LinkAccount 
              numberOfAccounts={1}
              bankAccount={mockBankAccount}
              handleRouteClick={mockHandleRouteClick}
            />
          );
      
          const viewButton = screen.getByTestId('back-button');
          expect(viewButton).toHaveAttribute('data-id', 'routeButton');
          expect(viewButton).toHaveAttribute('data-text-color', 'meedlBlue');
        });
      
  
  
  })