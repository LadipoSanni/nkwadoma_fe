import React from 'react';
import { render, fireEvent, screen,cleanup } from '@testing-library/react';
import CurrentInformation from '@/features/onboarding/stepContent/currentInformation/Index';
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
                <CurrentInformation />
            </Providers>
        );
        expect(screen.getByText('Additional information will appear here')).toBeInTheDocument();
    });

    test('opens modal when add additional information button is clicked', () => {
        render(
            <Providers>
                <CurrentInformation />
            </Providers>
        );
        fireEvent.click(screen.getByText('Add additional information'));
        expect(screen.getByText('Additional information')).toBeInTheDocument();
    });

    test('submits form when all fields are filled', () => {
        render(
            <Providers>
                <CurrentInformation />
            </Providers>
        );
        fireEvent.click(screen.getByText('Additional information will appear here'));
        fireEvent.click(screen.getByText('Continue'));
        expect(screen.queryByText('Alternate email address is required')).not.toBeInTheDocument();
        expect(screen.queryByText('National identification number is required')).not.toBeInTheDocument();
    });

});