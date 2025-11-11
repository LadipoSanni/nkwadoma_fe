import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WalletBalance from "@/reuseable/cards/WalletBalance";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe("WalletBalance Component", () => {
    const mockBalance = 25000;

    test("renders wallet balance label", () => {
        render(<WalletBalance balance={mockBalance} />);
        expect(screen.getByText(/Wallet balance/i)).toBeInTheDocument();
    });

    test("initially hides balance and shows dots", () => {
        render(<WalletBalance balance={mockBalance} />);
        expect(screen.getByTestId("closeIcon")).toBeInTheDocument();
        expect(screen.queryByTestId("balance")).not.toBeInTheDocument();
    });

    test("shows actual balance when eye icon is clicked", () => {
        render(<WalletBalance balance={mockBalance} />);
        const eyeIcon = screen.getByTestId("upEyeIcon");
        fireEvent.click(eyeIcon);
        expect(screen.getByTestId("balance")).toHaveTextContent("₦25,000.00");
        expect(screen.getByTestId("closeEyeIcon")).toBeInTheDocument();
    });

    test("toggles back to hidden balance when clicked again", () => {
        render(<WalletBalance balance={mockBalance} />);
        const eyeIcon = screen.getByTestId("upEyeIcon");
        fireEvent.click(eyeIcon);
        fireEvent.click(screen.getByTestId("closeEyeIcon"));
        expect(screen.queryByTestId("balance")).not.toBeInTheDocument();
        expect(screen.getByTestId("closeIcon")).toBeInTheDocument();
    });

    // test("renders all WalletButton components", () => {
    //     render(<WalletBalance balance={mockBalance} />);
    //     expect(screen.getByTestId("walletButtonMakepayment")).toBeInTheDocument();
    //     expect(screen.getByTestId("walletButtonFundwallet")).toBeInTheDocument();
    //     expect(screen.getByTestId("walletButtonWithdraw")).toBeInTheDocument();
    // });
    //
    // test("renders WalletConnect icon twice (for mobile and desktop)", () => {
    //     render(<WalletBalance balance={mockBalance} />);
    //     const walletConnects = screen.getAllByTestId("walletConnect");
    //     expect(walletConnects).toHaveLength(2);
    // });
});