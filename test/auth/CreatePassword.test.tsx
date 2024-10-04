import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreatePasswordForm from '@/app/auth/create-password/page';

describe('CreatePasswordForm', () => {
    test('renders Create Password form correctly', () => {
        render(<CreatePasswordForm />);

        const titleElement = screen.getByRole('heading', { name: /Create your password/i });
        expect(titleElement).toBeInTheDocument();

    });

    test('updates password and criteria status on password change', () => {
        render(<CreatePasswordForm />);

        const passwordInputs = screen.getAllByLabelText(/Password/i);
        const passwordInput = passwordInputs[0];
        fireEvent.change(passwordInput, { target: { value: 'Test@123' } });

        const criteriaTexts = screen.getAllByText(/At least/i);
        expect(criteriaTexts[0]).toHaveTextContent('At least 8 characters');
        expect(criteriaTexts[1]).toHaveTextContent('At least one special character');
        expect(criteriaTexts[2]).toHaveTextContent('At least one uppercase character');
        expect(criteriaTexts[3]).toHaveTextContent('At least one lowercase character');
    });

    test('updates confirm password on change', () => {
        render(<CreatePasswordForm />);

        const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i) as HTMLInputElement;
        fireEvent.change(confirmPasswordInput, { target: { value: 'Test@123' } });

        expect(confirmPasswordInput.value).toBe('Test@123');
    });
});
