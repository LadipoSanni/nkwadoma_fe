
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FundWallet from '@/pages/wallet/fundWallet';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));



describe('FundWallet Component', () => {
    const pushMock = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<FundWallet />);
        expect(screen.getByText('Fund wallet')).toBeInTheDocument();
        expect(screen.getByTestId('backtoWallet')).toBeInTheDocument();
        expect(screen.getByTestId('walletBalanceAmount')).toBeInTheDocument();
    });

    it('allows selecting "Linked accounts" as funding method', () => {
        render(<FundWallet />);

        const linkedRadio = screen.getByTestId('RadioButtonLinkedaccounts');
        fireEvent.click(linkedRadio);

        expect(linkedRadio).toBeInTheDocument();
        expect(screen.getByText('Select account to pay from')).toBeInTheDocument();
    });

    // it('disables Continue button until amount and account are selected', async () => {
    //     render(<FundWallet />);
    //
    //     // Select "Linked accounts"
    //     fireEvent.click(screen.getByTestId('RadioButtonLinkedaccounts'));
    //
    //     // Initially button should be disabled
    //     const continueBtn = screen.getByTestId('continue');
    //     expect(continueBtn).toBeDisabled();
    //
    //     // Enter amount
    //     const amountInput = screen.getByPlaceholderText('Enter amount');
    //     fireEvent.change(amountInput, { target: { value: '₦1000.00' } });
    //
    //     // Select account
    //     const dropdownItem = screen.getByTestId('item' + 0);
    //     fireEvent.click(dropdownItem);
    //
    //     // After both amount + account selected → button enabled
    //     await waitFor(() => expect(continueBtn).toBeEnabled());
    // });

    // it('shows review section after clicking Continue', async () => {
    //     render(<FundWallet />);
    //
    //     // Select linked account
    //     fireEvent.click(screen.getByTestId('RadioButtonLinkedaccounts'));
    //
    //     const amountInput = screen.getByPlaceholderText('Enter amount');
    //     fireEvent.change(amountInput, { target: { value: '₦2000.00' } });
    //
    //     fireEvent.click(screen.getByTestId('mock-dropdown-item'));
    //
    //     const continueBtn = screen.getByTestId('continue');
    //     fireEvent.click(continueBtn);
    //
    //     await waitFor(() => {
    //         expect(screen.getByText('Review your transaction')).toBeInTheDocument();
    //         expect(screen.getByText('₦2000')).toBeInTheDocument();
    //     });
    // });
    //
    // it('navigates back when BackButton is clicked', () => {
    //     render(<FundWallet />);
    //     fireEvent.click(screen.getByTestId('mock-back-button'));
    //     expect(pushMock).toHaveBeenCalledWith('/wallet');
    // });
});
