import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthInputField from '@/reuseable/Input/AuthInputField';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

describe('CustomInputField', () => {
    test('renders the input field with label', () => {
        render(<AuthInputField label="Password" id="password" type="password" />);
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    test('renders the endAdornment as text', () => {
        render(<AuthInputField label="Password" id="password" type="password" endAdornment="Show" />);
        expect(screen.getByText('Show')).toBeInTheDocument();
    });

    test('renders the endAdornment as icon', () => {
        render(<AuthInputField label="Password" id="password" type="password" endAdornment={<VisibilityOffIcon />} />);
        expect(screen.getByTestId('VisibilityOffIcon')).toBeInTheDocument();
    });

    test('toggles password visibility', () => {
        render(<AuthInputField label="Password" id="password" type="password" endAdornment="Show" />);
        const input = screen.getByLabelText('Password');
        const toggleButton = screen.getByText('Show');

        expect(input).toHaveAttribute('type', 'password');

        fireEvent.click(toggleButton);

        expect(input).toHaveAttribute('type', 'text');
    });

    test('renders the error message when provided', () => {
        const errorMessage = 'Must contain one special character';
        render(<AuthInputField label="Password" id="password" type="password" errorMessage={errorMessage} />);

        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveClass('text-[#E80000]');
    });

    test('does not render the error message when not provided', () => {
        render(<AuthInputField label="Password" id="password" type="password" />);

        const errorElement = screen.queryByText(/Must contain one special character/i);
        expect(errorElement).not.toBeInTheDocument();
    });
});