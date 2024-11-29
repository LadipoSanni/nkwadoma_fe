import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdditionalInformation from '@/features/onboarding/stepContent/additionalInformation/Index';
import { Providers } from '@/app/provider';

describe('AdditionalInformation Component', () => {
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
        fireEvent.click(screen.getByText('Additional information will appear here'));
        fireEvent.click(screen.getByText('Continue'));
        expect(screen.queryByText('Alternate email address is required')).not.toBeInTheDocument();
        expect(screen.queryByText('National identification number is required')).not.toBeInTheDocument();
    });

});