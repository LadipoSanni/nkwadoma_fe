import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateLoanOffer from '@/reuseable/modals/createLoanOffer/Index';
import { Providers } from '@/app/provider';

describe('CreateLoanOffer Component', () => {
    const mockOnSubmit = jest.fn();
    const mockSetIsOpen = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders CreateLoanOffer component', () => {
        render(
            <Providers>
                <CreateLoanOffer onSubmit={mockOnSubmit} isOpen={true} setIsOpen={mockSetIsOpen} />
            </Providers>
        );
        expect(screen.getByText('Create loan offer')).toBeInTheDocument();
    });

    test('displays error message when form is submitted without selecting a program', () => {
        render(
            <Providers>
                <CreateLoanOffer onSubmit={mockOnSubmit} isOpen={true} setIsOpen={mockSetIsOpen} />
            </Providers>
        );
        fireEvent.submit(screen.getByRole('button', { name: /create/i }));
        expect(screen.getByText('Please select a program.')).toBeInTheDocument();
    });

    test('changes button color to bg-neutral650 when form is invalid', () => {
        render(
            <Providers>
                <CreateLoanOffer onSubmit={mockOnSubmit} isOpen={true} setIsOpen={mockSetIsOpen} />
            </Providers>
        );
        fireEvent.submit(screen.getByRole('button', { name: /create/i }));
        expect(screen.getByRole('button', { name: /create/i })).toHaveClass('bg-neutral650');
    });

});