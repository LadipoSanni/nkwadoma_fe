import React from 'react';
import { render, screen } from '@testing-library/react';
import CreatePasswordForm from '@/app/auth/create-password/page';

describe('CreatePasswordForm', () => {
    test('renders Create Password form correctly', () => {
        render(<CreatePasswordForm />);

        // const titleElement = screen.getByRole('heading', { name: /Create Password/i });
        const welcomeElement = screen.getByText(/Welcome Henry/i);
        // expect(titleElement).toBeInTheDocument();
        expect(welcomeElement).toBeInTheDocument();
        //
        // // const passwordInput = screen.getByLabelText(/Password/i);
        // // const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
        // // expect(passwordInput).toBeInTheDocument();
        // // expect(confirmPasswordInput).toBeInTheDocument();
        //
        // const buttonElement = screen.getByRole('button', { name: /Create Password/i });
        // expect(buttonElement).toBeInTheDocument();
    });
});