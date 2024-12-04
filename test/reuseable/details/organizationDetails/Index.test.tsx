import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import OrganizationDetails from '@/features/portfolio-manager/organizationDetails/Index';
import { Providers } from '@/app/provider';

describe('OrganizationDetails Component', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test('renders OrganizationDetails component with details tab content by default', () => {
        render(
            <Providers>
                <OrganizationDetails />
            </Providers>
        );
        expect(screen.getByText('Organization details')).toBeInTheDocument();
    });
  test('renders OrganizationDetails component with details tab content by default', () => {
        render(
            <Providers>
                <OrganizationDetails />
            </Providers>
        );
        expect(screen.getByText('Loan details')).toBeInTheDocument();
    });

});