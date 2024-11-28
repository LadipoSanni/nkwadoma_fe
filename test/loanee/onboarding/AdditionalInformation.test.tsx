import React from 'react';
import { render, fireEvent, screen,cleanup } from '@testing-library/react';
import AdditionalInformation from '@/features/onboarding/stepContent/additionalInformation/Index';
import { Providers } from '@/app/provider';

describe('AdditionalInformation Component', () => {
    beforeEach(() => {
        cleanup()
    
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });
    test('renders additional information component', () => {
        render(
            <Providers>
                <AdditionalInformation />
            </Providers>
        );
        expect(screen.getByText('Additional information will appear here')).toBeInTheDocument();
    });

    test('opens modal when add additional information button is clicked', () => {
        render(
            <Providers>
                <AdditionalInformation />
            </Providers>
        );
        fireEvent.click(screen.getByText('Add additional information'));
        expect(screen.getByText('Additional information')).toBeInTheDocument();
    });


    test('submits form when all fields are filled', () => {
        render(
            <Providers>
                <AdditionalInformation />
            </Providers>
        );
        fireEvent.click(screen.getByText('Add additional information'));
        fireEvent.change(screen.getByPlaceholderText('Enter email adress'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Enter first name'), { target: { value: '123456789' } });
        fireEvent.click(screen.getByText('Continue'));
        expect(screen.queryByText('Alternate email address is required')).not.toBeInTheDocument();
        expect(screen.queryByText('National identification number is required')).not.toBeInTheDocument();
    });

});