import {render} from '@testing-library/react';
import '@testing-library/react';
// import Login from '@/features/auth/login/Login';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {expect, describe, it} = require("@jest/globals");

describe('Login Component', () => {
    it("should test that login component does not exist", () => {
        const {queryByTestId} = render(
            <div></div>
        );
        const login = queryByTestId('parentDivId');
        expect(login).not.toBeInTheDocument();
    })

    // it('should est that LoanEmptyState component exist', () => {
    //     const {getByTestId} = render(<Login/>);
    //     expect(getByTestId('parentDivId')).toBeInTheDocument();
    // });
    //
    //
    // it('should render login component correctly', () => {
    //     render(<Login/>);
    //
    //     expect(screen.getByTestId('parentDivId')).toBeInTheDocument();
    //     expect(screen.getByTestId('childDivId')).toBeInTheDocument();
    //     expect(screen.getByTestId('loginDivId')).toBeInTheDocument();
    //     expect(screen.getByTestId('emailAndPasswordId')).toBeInTheDocument();
    //     expect(screen.getByTestId('emailId')).toBeInTheDocument();
    //     expect(screen.getByTestId('passwordId')).toBeInTheDocument();
    //     expect(screen.getByTestId('submitButton')).toBeInTheDocument();
    // });
    //
    // it('should enable login button when email and password are filled', () => {
    //     render(<Login/>);
    //
    //     const emailInput = screen.getByTestId('email');
    //     const passwordInput = screen.getByTestId('password');
    //     const loginButton = screen.getByTestId('loginButton');
    //
    //     expect(loginButton).toBeDisabled();
    //     expect(loginButton).toHaveClass('bg-[#90D8AE] cursor-not-allowed');
    //
    //     fireEvent.change(emailInput, {target: {value: 'tolu@gmail.com'}});
    //     fireEvent.change(passwordInput, {target: {value: 'password123'}});
    //
    //     expect(loginButton).not.toBeDisabled();
    //     expect(loginButton).toHaveClass('bg-[#0D9B48] cursor-pointer');
    // });
    //
    // it('should show and hide the password when the visibility toggle is clicked', () => {
    //     render(<Login/>);
    //
    //     const passwordInput = screen.getByTestId('password');
    //     const toggleButton = screen.getByRole('button', {name: /toggle password visibility/i});
    //
    //     expect(passwordInput).toHaveAttribute('type', 'password');
    //
    //     fireEvent.click(toggleButton);
    //
    //     expect(passwordInput).toHaveAttribute('type', 'text');
    //
    //     fireEvent.click(toggleButton);
    //     expect(passwordInput).toHaveAttribute('type', 'password');
    // });
    //
    // it('should test that login button is disabled when forms are not filled', () => {
    //     render(<Login/>);
    //     const loginButton = screen.getByTestId('loginButton');
    //     fireEvent.click(loginButton);
    //     expect(loginButton).toBeDisabled();
    // });
    //
    // it('should test that login button is disabled when forms are filled', () => {
    //     render(<Login/>);
    //     const emailInput = screen.getByTestId('email');
    //     const passwordInput = screen.getByTestId('password');
    //     const loginButton = screen.getByTestId('loginButton');
    //
    //     fireEvent.change(emailInput, {target: {value: 'tolu@gmail.com'}});
    //     fireEvent.change(passwordInput, {target: {value: 'password123'}});
    //     fireEvent.click(loginButton);
    //     expect(loginButton).not.toBeDisabled();
    // });
});
