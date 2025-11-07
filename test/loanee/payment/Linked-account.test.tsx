import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LinkedAccount from '@/components/loanee/payment-type/Linked-account';

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