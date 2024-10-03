import React from 'react';
import { render, screen } from '@testing-library/react';
import CreatePasswordForm from '@/app/auth/create-password/page';

describe('CreatePasswordForm', () => {
    test('renders Create Password form correctly', () => {
        render(<CreatePasswordForm />);

        const titleElement = screen.getByRole('heading', { name: /Create your password/i });
        expect(titleElement).toBeInTheDocument();

    });
});