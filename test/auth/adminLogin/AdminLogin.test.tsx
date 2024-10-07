import {fireEvent, queryByAttribute, render, screen} from '@testing-library/react';
import '@testing-library/react';
import {userEvent} from "@testing-library/user-event";
import * as React from "react";
import AdminLogin from "@/features/auth/adminLogin/Index";


describe('Login Component', () => {
    it("should test that login component does not exist", () => {
        const {queryByTestId} = render(
            <AdminLogin/>
        );
        const login = queryByTestId('superAdminLoginPage');
        expect(login).toBeInTheDocument();
    })

    it('should have the email input field', () => {
        render(<AdminLogin/>);

        const emailInput = screen.getByTestId("adminEmail");
        expect(emailInput).toBeInTheDocument();
    });


    it('should have the password input field', () => {
        render(<AdminLogin/>);

        const password = screen.getByTestId("AdminPassword");
        expect(password).toBeInTheDocument();
    });


    it('should render login component correctly', () => {

        const getById = queryByAttribute.bind(null, "id")
        const buttonComponent = render(<AdminLogin/>);

        expect(screen.getByTestId('adminEmail')).toBeInTheDocument();
        expect(screen.getByTestId('superAdminEmailAndPasswordId')).toBeInTheDocument();
        expect(screen.getByTestId('adminEmail')).toBeInTheDocument();
        expect(screen.getByTestId('AdminPassword')).toBeInTheDocument();
        expect(getById(buttonComponent.container, "SuperAdminAuthButtonContainer")).toBeInTheDocument()
    });

    it('should test that login button is not disabled after email and password has been entered', async () => {
        render(<AdminLogin/>);

        const emailInput = screen.getByPlaceholderText('Enter email address');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button', {name: /log in/i});

        expect(loginButton).toBeDisabled();

        await userEvent.type(emailInput, 'ola@gmail.com');
        await userEvent.type(passwordInput, 'glory123');

        expect(loginButton).not.toBeDisabled();
    });

    it('enables the login button after email and password have been entered', () => {
        render(<AdminLogin/>);

        const emailInput = screen.getByPlaceholderText('Enter email address');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const loginButton = screen.getByRole('button', {name: /log in/i});

        expect(loginButton).toBeDisabled();

        fireEvent.change(emailInput, {target: {value: 'user@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'password123'}});

        expect(loginButton).toBeEnabled();
    });
});
