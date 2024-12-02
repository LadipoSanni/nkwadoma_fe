import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Providers } from '@/app/provider';
// import { store } from '@/store';
import InviteAdminDialog from '@/reuseable/modals/InviteAdminDialog/Index';

describe('InviteAdminDialog Component', () => {
    const mockSetIsModalOpen = jest.fn();

    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test('renders InviteAdminDialog component', () => {
        render(
            <Providers>
                <InviteAdminDialog isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />
            </Providers>
        );
        expect(screen.getByText('Invite Admin')).toBeInTheDocument();
    });

    test('disables Invite button initially', () => {
        render(
            <Providers>
                <InviteAdminDialog isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />
            </Providers>
        );
        expect(screen.getByText('Invite')).toBeDisabled();
    });

    test('displays error messages for invalid inputs', () => {
        render(
            <Providers>
                <InviteAdminDialog isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />
            </Providers>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter first name'), { target: { value: 'John123' } });
        fireEvent.change(screen.getByPlaceholderText('Enter last name'), { target: { value: 'Doe123' } });
        fireEvent.change(screen.getByPlaceholderText('Enter email address'), { target: { value: 'invalid-email' } });
        expect(screen.getByText('First name is required and should not contain numbers')).toBeInTheDocument();
        expect(screen.getByText('Last name is required and should not contain numbers')).toBeInTheDocument();
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });

    test('resets form and closes dialog on Cancel button click', () => {
        render(
            <Providers>
                <InviteAdminDialog isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />
            </Providers>
        );
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
        expect(screen.getByPlaceholderText('Enter first name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Enter last name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Enter email address')).toHaveValue('');
    });
});