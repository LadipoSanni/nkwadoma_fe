import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import LoaneeOverview from '@/pages/loanee/overview/Index';
import { Providers } from '@/app/provider';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
    usePathname: () => mockUsePathname,

}));

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
