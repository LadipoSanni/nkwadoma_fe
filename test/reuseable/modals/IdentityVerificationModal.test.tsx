import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IdentityVerificationModal from '@/reuseable/modals/IdentityVerificationModal'; // Adjust the import path accordingly

describe('IdentityVerificationModal', () => {
    it('renders modal when isOpen is true', () => {
        render(<IdentityVerificationModal isOpen={true} onClose={jest.fn()}/>);
        expect(screen.getByText(/Provide your details/i)).toBeInTheDocument();
    });

    it('calls onClose when Cancel button is clicked', () => {
        const mockOnClose = jest.fn();
        render(<IdentityVerificationModal isOpen={true} onClose={mockOnClose}/>);
        fireEvent.click(screen.getByText(/Cancel/i));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('displays second modal upon successful form submission', async () => {
        const mockOnClose = jest.fn();

        render(<IdentityVerificationModal isOpen={true} onClose={mockOnClose}/>);

        fireEvent.input(screen.getByPlaceholderText(/Enter BVN/i), {
            target: { value: '12345678901' },
        });

        fireEvent.input(screen.getByPlaceholderText(/Enter NIN/i), {
            target: { value: '12345678901' },
        });

        fireEvent.submit(screen.getByRole('button', {name: /Continue/i}));

        await waitFor(() => {
            expect(screen.getByText(/Liveness check/i)).toBeInTheDocument();
        });
    });

    it('collapses information when trigger clicked', () => {
        render(<IdentityVerificationModal isOpen={true} onClose={jest.fn()}/>);
        const triggers = screen.getAllByText(/why do we need/i);
        fireEvent.click(triggers[0]);
        expect(screen.getByText(/We request for your BVN/i)).toBeInTheDocument();
    });

    it('does not render modal when isOpen is false', () => {
        render(<IdentityVerificationModal isOpen={false} onClose={jest.fn()}/>);
        expect(screen.queryByText(/Provide your details/i)).not.toBeInTheDocument();
    });
});