import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/react';
import Login from '@/features/auth/usersAuth/login/Index';
import {userEvent} from "@testing-library/user-event";
import * as React from "react";
import {Providers} from "@/app/provider";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    useSearchParams: jest.fn().mockImplementation(() => {
        return new URLSearchParams(window.location.search);
    }),
    usePathname: () => jest.fn(),
}));

jest.setTimeout(10000);

describe('Login Component', () => {
    it("should test that login component does not exist", () => {
        const {queryByTestId} = render(
            <div></div>
        );
        const login = queryByTestId('parentDivId');
        expect(login).not.toBeInTheDocument();
    })

    beforeEach(() => {
        render(<Providers>
            <Login/>
        </Providers>)

    })


    it('should have the email input field', () => {

        const emailInput = screen.getByTestId("emailId");
        expect(emailInput).toBeInTheDocument();
    });


    it('should have the password input field', () => {
        const password = screen.getByTestId("passwordId");
        expect(password).toBeInTheDocument();
    });


    it('should render login component correctly', () => {


        expect(screen.getByTestId('loginDivId')).toBeInTheDocument();
        expect(screen.getByTestId('emailAndPasswordId')).toBeInTheDocument();
        expect(screen.getByTestId('emailId')).toBeInTheDocument();
        expect(screen.getByTestId('passwordId')).toBeInTheDocument();
    });

    it('should test that login button is not disabled after email and password has been entered', async () => {

        const emailInput = screen.getByPlaceholderText('Enter email address');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button', {name: 'Login'});

        expect(loginButton).toBeDisabled();

        await userEvent.type(emailInput, 'ola@gmail.com');
        await userEvent.type(passwordInput, 'glory123');

        expect(loginButton).not.toBeDisabled();
    });

    it('enables the login button after email and password have been entered', () => {

        const emailInput = screen.getByPlaceholderText('Enter email address');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button', {name: 'Login'});

        expect(loginButton).toBeDisabled();

        fireEvent.change(emailInput, {target: {value: 'user@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'password123'}});

        expect(loginButton).toBeEnabled();
    });
});
