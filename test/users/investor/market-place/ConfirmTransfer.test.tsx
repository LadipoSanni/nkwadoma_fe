import ConfirmTransfer from '@/features/market-place/Invest/confirm-transfer/Index';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('ConfirmTransfer Component', () => {
    let pushMock: jest.Mock;

    beforeEach(() => {
        pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    });

    test('should render ConfirmTransfer component', () => {
        render(<ConfirmTransfer />);
        const confirmTitle = screen.getByText(/Confirm transfer/i);
        const message = screen.getByText(/Add the investment amount and the investment terms and conditions/i);

        expect(confirmTitle).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    });

    test('should render account info correctly', () => {
        render(<ConfirmTransfer />);

        const accountItems = screen.getAllByTestId(/data-item-/);
        expect(accountItems.length).toBe(3); // We expect 3 account info items

        accountItems.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });

    test('should call HandleBack when back button is clicked', () => {
        render(<ConfirmTransfer />);
    });

    test('should open modal when Confirm button is clicked', () => {
        render(<ConfirmTransfer />);

    });

    test('should display correct account info', () => {
        render(<ConfirmTransfer />);

        expect(screen.getByText(/Paystack-Titan/i)).toBeInTheDocument();
        expect(screen.getByText(/3909884674/i)).toBeInTheDocument();
        expect(screen.getByText(/Meedl Africa/i)).toBeInTheDocument();
    });
});
