import React from 'react';
import { render, screen, fireEvent,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import MultiStep from '@/reuseable/multiStep-component';
import MultistepLayout from '@/layout/multistep-layout/Multistep-layout';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/redux/store', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/reuseable/multiStep-component', () => jest.fn(() => <div>Mock MultiStep</div>));

jest.mock('@/components/back-button', () => jest.fn(({ handleClick }) => (
  <button onClick={handleClick}>Back Button</button>
)));

describe('MultistepLayout Component', () => {
  const mockPush = jest.fn();
  const mockUseRouter = {
    push: mockPush,
  };

  const mockChildren = <div>Test Children</div>;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
    (MultiStep as jest.Mock).mockClear();
    mockPush.mockClear();
    jest.clearAllMocks();
    cleanup();
    
    jest.spyOn(console, 'log').mockReturnValue();
    jest.spyOn(console, 'warn').mockReturnValue();
    jest.spyOn(console, 'error').mockReturnValue();
  });

  test('renders correctly with children', () => {
    (usePathname as jest.Mock).mockReturnValue('/vehicle/setup');
    (useAppSelector as jest.Mock).mockReturnValue('commercialFund');
    
    render(<MultistepLayout>{mockChildren}</MultistepLayout>);
    
    expect(screen.getByText('Back Button')).toBeInTheDocument();
    expect(screen.getByText('Mock MultiStep')).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  test('calculates currentStep and completedSteps correctly from pathname', () => {
    (usePathname as jest.Mock).mockReturnValue('/vehicle/status');
    (useAppSelector as jest.Mock).mockReturnValue('commercialFund');
    
    render(<MultistepLayout>{mockChildren}</MultistepLayout>);
    
    expect(MultiStep).toHaveBeenCalledWith(
      expect.objectContaining({
        currentStep: 'status',
        completedSteps: ['setup'],
      }),
      expect.anything()
    );
  });

  test('handles default currentStep when pathname is empty', () => {
    (usePathname as jest.Mock).mockReturnValue('');
    (useAppSelector as jest.Mock).mockReturnValue('commercialFund');
    
    render(<MultistepLayout>{mockChildren}</MultistepLayout>);
    
    expect(MultiStep).toHaveBeenCalledWith(
      expect.objectContaining({
        currentStep: 'setup',
        completedSteps: [],
      }),
      expect.anything()
    );
  });

  describe('handleBack navigation', () => {
    test('navigates to commercial-vehicle when vehicleType is commercialFund', () => {
      (usePathname as jest.Mock).mockReturnValue('/vehicle/setup');
      (useAppSelector as jest.Mock).mockReturnValue('commercialFund');
      
      render(<MultistepLayout>{mockChildren}</MultistepLayout>);
      
      fireEvent.click(screen.getByText('Back Button'));
      expect(mockPush).toHaveBeenCalledWith('/vehicle/commercial-vehicle');
    });

    test('navigates to endownment-vehicle when vehicleType is not commercialFund', () => {
      (usePathname as jest.Mock).mockReturnValue('/vehicle/setup');
      (useAppSelector as jest.Mock).mockReturnValue('endowmentFund');
      
      render(<MultistepLayout>{mockChildren}</MultistepLayout>);
      
      fireEvent.click(screen.getByText('Back Button'));
      expect(mockPush).toHaveBeenCalledWith('/vehicle/endownment-vehicle');
    });
  });

  test('passes correct props to MultiStep component', () => {
    (usePathname as jest.Mock).mockReturnValue('/vehicle/visibility');
    (useAppSelector as jest.Mock).mockReturnValue('commercialFund');
    
    render(<MultistepLayout>{mockChildren}</MultistepLayout>);
    
    expect(MultiStep).toHaveBeenCalledWith(
      expect.objectContaining({
        steps: expect.any(Array),
        currentStep: 'visibility',
        completedSteps: ['setup', 'status'],
      }),
      expect.anything()
    );
  });

  test('renders correct layout structure', () => {
    (usePathname as jest.Mock).mockReturnValue('/vehicle/setup');
    (useAppSelector as jest.Mock).mockReturnValue('commercialFund');
    
    const { container } = render(<MultistepLayout>{mockChildren}</MultistepLayout>);
    
    expect(container.querySelector('.md\\:px-10')).toBeInTheDocument();
    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.md\\:flex')).toBeInTheDocument();
  });
});