

import React from 'react';
import { render, screen,cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CurrentInformation from '@/features/onboarding/stepContent/currentInformation/Index';
import loanReferralReducer from '@/service/users/loanRerralSlice';
import type { LoanReferralState } from '@/service/users/loanRerralSlice';


interface MockLoaneeCurrentInfoProps {
  handleSubmit: (data: unknown) => void;
}


jest.mock('@/components/loanee/Loanee-current-information', () => {
  const MockLoaneeCurrentInfo = (props: MockLoaneeCurrentInfoProps) => (
    <div data-testid="loanee-current-info">
      <button onClick={() => props.handleSubmit({})}>Mock Submit</button>
    </div>
  );
  MockLoaneeCurrentInfo.displayName = 'MockLoaneeCurrentInfo';
  return MockLoaneeCurrentInfo;
});

const createMockStore = (preloadedState: { loanReferral: Partial<LoanReferralState> }) => {
  return configureStore({
    reducer: {
      loanReferral: loanReferralReducer
    },
    preloadedState: {
      loanReferral: {
        ...initialState,
        ...preloadedState.loanReferral
      }
    }
  });
};

const initialState: LoanReferralState = {
  loanReferralStatus: '',
  currentStep: 0,
  isLoaneeIdentityVerified: false,
  isFormSubmitting: false,
  loaneeCurrentInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    nextOfKinRelationship: "",
    contactAddress: "",
    alternateEmail: "",
    alternatePhoneNumber: "",
    alternateContactAddress: "",
  }
};

describe('CurrentInformation Component', () => {
  const mockSetCurrentStep = jest.fn();
  
  const initialReduxState = {
    loanReferral: {
      loaneeCurrentInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        nextOfKinRelationship: 'Friend',
        contactAddress: '123 Main St',
        alternateEmail: 'john.alt@example.com',
        alternatePhoneNumber: '0987654321',
        alternateContactAddress: '456 Second St'
      },
      isFormSubmitting: false
    }
  };

    beforeEach(() => {
          cleanup()
            jest.spyOn(console,'log').mockReturnValue()
            jest.spyOn(console,'warn').mockReturnValue()
            jest.spyOn(console,'error').mockReturnValue()
        });

  it('renders the form when isFormSubmitted is false', () => {
    const store = createMockStore(initialReduxState);
    
    render(
      <Provider store={store}>
        <CurrentInformation setCurrentStep={mockSetCurrentStep} />
      </Provider>
    );

    expect(screen.getByTestId('loanee-current-info')).toBeInTheDocument();
  });

  it('renders the summary when isFormSubmitted is true', () => {
    const store = createMockStore({
      loanReferral: {
        ...initialReduxState.loanReferral,
        isFormSubmitting: true
      }
    });
    
    render(
      <Provider store={store}>
        <CurrentInformation setCurrentStep={mockSetCurrentStep} />
      </Provider>
    );

    expect(screen.getByText('Alternate email address')).toBeInTheDocument();
    expect(screen.getByText('john.alt@example.com')).toBeInTheDocument();
  });

 
  


  it('disables Continue button when form is not submitted', () => {
    const store = createMockStore(initialReduxState);
    
    render(
      <Provider store={store}>
        <CurrentInformation setCurrentStep={mockSetCurrentStep} />
      </Provider>
    );

    const continueButton = screen.queryByText('Continue');
    expect(continueButton).not.toBeInTheDocument();
  });
});