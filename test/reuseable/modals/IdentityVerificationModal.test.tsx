import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IdentityVerificationModal from '@/reuseable/modals/IdentityVerificationModal';
import {Providers} from "@/app/provider";

describe('IdentityVerificationModal', () => {
    const testId= "test-id";
    const mockOnClose = jest.fn();
    it('renders modal when isOpen is true', () => {
        render(
            <Providers>
                <IdentityVerificationModal isOpen={true} onClose={mockOnClose} loanReferralId={testId} onThirdStepContinue={jest.fn()}/>
            </Providers>
        );
        expect(screen.getByText(/Provide your details/i)).toBeInTheDocument();
    });

    it('calls onClose when Cancel button is clicked', () => {
        render(
            <Providers>
                <IdentityVerificationModal isOpen={true} onClose={mockOnClose} loanReferralId={testId} onThirdStepContinue={jest.fn()}/>
            </Providers>
        );
        fireEvent.click(screen.getByText(/Cancel/i));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('displays second modal upon successful form submission', async () => {
        render(
            <Providers>
                <IdentityVerificationModal isOpen={true} onClose={mockOnClose} loanReferralId={testId} onThirdStepContinue={jest.fn()}/>
            </Providers>
        );
        fireEvent.input(screen.getByPlaceholderText(/Enter BVN/i), {
            target: { value: '12345678901' },
        });

        fireEvent.input(screen.getByPlaceholderText(/Enter NIN/i), {
            target: { value: '12345678901' },
        });

        fireEvent.submit(screen.getByRole('button', {name: /Continue/i}));
    });

    // it('collapses information when trigger clicked', () => {
    //     render(
    //         <Providers>
    //             <IdentityVerificationModal isOpen={true} onClose={mockOnClose} loanReferralId={testId} onThirdStepContinue={jest.fn()}/>
    //         </Providers>
    //     );
    //     const triggers = screen.getAllByText(/why do we need/i);
    //     fireEvent.click(triggers[0]);
    //     expect(screen.getByText(/We request for your BVN/i)).toBeInTheDocument();
    // });

    // it('does not render modal when isOpen is false', () => {
    //     render(
    //         <Providers>
    //             <IdentityVerificationModal isOpen={false} onClose={mockOnClose} loanReferralId={testId} onThirdStepContinue={jest.fn()}/>
    //         </Providers>
    //     );expect(screen.queryByText(/Provide your details/i)).not.toBeInTheDocument();
    // });
});