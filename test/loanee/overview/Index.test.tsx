import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import LoaneeOverview from '@/pages/loanee/overview/Index';
import { Providers } from '@/app/provider';

describe('LoaneeOverview Component', () => {
    beforeEach(() => {
        cleanup();
    });

    test('does not render TableEmptyState component when condition is false', () => {
        render(
            <Providers>
                <LoaneeOverview />
            </Providers>
        );
        expect(screen.queryByText('Repayment')).not.toBeInTheDocument();
    });
});
