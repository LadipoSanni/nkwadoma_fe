import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateLoanOffer from '@/reuseable/modals/createLoanOffer/Index';
import { Providers } from '@/app/provider';
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    usePathname: () => jest.fn(),

}));

describe('CreateLoanOffer Component', () => {
    const mockOnSubmit = jest.fn();
    const mockSetIsOpen = jest.fn();


    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockReturnValue();
        jest.spyOn(console, 'warn').mockReturnValue();
        jest.spyOn(console, 'error').mockReturnValue();
      });

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn(() =>
            Promise.resolve(new Response(JSON.stringify({ data: [] }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }))
        );
        // await act( async () => render(<TestApp/>));

    });

    test('renders CreateLoanOffer component', () => {
        render(
            <Providers>
                <CreateLoanOffer onSubmit={mockOnSubmit} isOpen={true} setIsOpen={mockSetIsOpen}  loanRequestId={''}/>
            </Providers>
        );
        expect(screen.getByText('Create')).toBeInTheDocument();
    });

    test('displays error message when form is submitted without selecting a program', () => {
        render(
            <Providers>
                <CreateLoanOffer onSubmit={mockOnSubmit} isOpen={true} setIsOpen={mockSetIsOpen} loanRequestId={''}/>
            </Providers>
        );
        fireEvent.submit(screen.getByRole('button', { name: /create/i }));
        expect(screen.getByText('Please select a program.')).toBeInTheDocument();
    });

    test('changes button color to bg-neutral650 when form is invalid', () => {
        render(
            <Providers>
                <CreateLoanOffer onSubmit={mockOnSubmit} isOpen={true} setIsOpen={mockSetIsOpen}loanRequestId={''} />
            </Providers>
        );
        fireEvent.submit(screen.getByRole('button', { name: /create/i }));
        expect(screen.getByRole('button', { name: /create/i })).toHaveClass('bg-neutral650');
    });

});