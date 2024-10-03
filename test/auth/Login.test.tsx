import {render, screen, fireEvent, queryByAttribute} from '@testing-library/react';
import '@testing-library/react';
import Login from '@/features/auth/login/Login';
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

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

    it('should est that LoanEmptyState component exist', () => {
        const {getByTestId} = render(<Login/>);
        expect(getByTestId('parentDivId')).toBeInTheDocument();
    });


    it('should render login component correctly', () => {

        const getById = queryByAttribute.bind(null, "id")
       const buttonComponent = render(<Login/>);

        expect(screen.getByTestId('parentDivId')).toBeInTheDocument();
        expect(screen.getByTestId(`writeUpAndLogin`)).toBeInTheDocument();
        expect(screen.getByTestId('childDivId')).toBeInTheDocument();
        expect(screen.getByTestId('loginDivId')).toBeInTheDocument();
        expect(screen.getByTestId('emailAndPasswordId')).toBeInTheDocument();
        expect(screen.getByTestId('emailId')).toBeInTheDocument();
        expect(screen.getByTestId('passwordId')).toBeInTheDocument();
        expect(getById(buttonComponent.container, "loginButton")).toBeInTheDocument()
    });

    it('should test that login button is not disabled after email and password has been entered', async () => {
        render(<Login />);

        const emailInput = screen.getByPlaceholderText('Enter email address');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button', { name: /login/i });

        expect(loginButton).toBeDisabled();

        await userEvent.type(emailInput, 'ola@gmail.com');
        await userEvent.type(passwordInput, 'glory123');

        expect(loginButton).not.toBeDisabled();
    });

    it('enables the login button after email and password have been entered', () => {
        render(<Login />);

        const emailInput = screen.getByPlaceholderText('Enter email address');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button', { name: /login/i });

        expect(loginButton).toBeDisabled();

        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(loginButton).toBeEnabled();
    });
});
