import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomInputField from '@/component/reuseableComponent/ui/Input/CustomInputField';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

describe('CustomInputField', () => {
    test('renders the input field with label', () => {
        render(<CustomInputField label="Password" id="password" type="password" />);
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    test('renders the endAdornment as text', () => {
        render(<CustomInputField label="Password" id="password" type="password" endAdornment="Show" />);
        expect(screen.getByText('Show')).toBeInTheDocument();
    });

    test('renders the endAdornment as icon', () => {
        render(<CustomInputField label="Password" id="password" type="password" endAdornment={<VisibilityOffIcon />} />);
        expect(screen.getByTestId('VisibilityOffIcon')).toBeInTheDocument();
    });

    test('toggles password visibility', () => {
        render(<CustomInputField label="Password" id="password" type="password" endAdornment="Show" />);
        const input = screen.getByLabelText('Password');
        const toggleButton = screen.getByText('Show');

        expect(input).toHaveAttribute('type', 'password');

        fireEvent.click(toggleButton);

        expect(input).toHaveAttribute('type', 'text');
    });
});