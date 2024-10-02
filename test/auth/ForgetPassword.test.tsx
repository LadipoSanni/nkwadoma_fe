import {render, screen, fireEvent} from '@testing-library/react';
import ForgetPassword from '@/features/auth/forget-password/ForgetPassword';

describe('ForgetPassword Component', () => {
    it('should render ForgetPassword component', () => {
        render(<ForgetPassword/>);

        const headingElement = screen.getByText(/Forgot Password?/i);
        expect(headingElement).toBeInTheDocument();
    });

    it('should render ForgetPassword component', () => {
        render(<ForgetPassword />);

        const headingElement = screen.getByText(/Send/i);
        expect(headingElement).toBeInTheDocument();
    });

    it('should have the email input field', () => {
        render(<ForgetPassword />);

        const emailInput = screen.getByTestId("email");
        expect(emailInput).toBeInTheDocument();
    });

    // it('should enable the submit button when the form is valid', () => {
    //     render(<ForgetPassword/>);
    //
    //     const emailInput = screen.getByTestId('email');
    //     const submitButton = screen.getByRole('button', {name: /send/i});
    //     expect(submitButton).toBeDisabled();
    //     fireEvent.change(emailInput, {target: {value: 'tolu@gmail.com'}});
    //     expect(submitButton).toBeEnabled();
    // });
    //
    // it('should disable the submit button when the form is invalid', () => {
    //     render(<ForgetPassword/>);
    //
    //     const emailInput = screen.getByTestId('email');
    //     const submitButton = screen.getByRole('button', {name: /send/i});
    //     fireEvent.change(emailInput, {target: {value: ''}});
    //     expect(submitButton).toBeDisabled();
    // });
});
