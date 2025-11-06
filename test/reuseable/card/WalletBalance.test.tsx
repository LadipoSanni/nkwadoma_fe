import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WalletBalance from "@/reuseable/cards/WalletBalance";



describe("WalletBalance Component", () => {
    // beforeEach(() => {
    //     jest.spyOn(FormatUtils, "formatAmount").mockReturnValue("₦20,000,000");
    // });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders wallet balance label", () => {
        render(<WalletBalance balance={20000000} />);
        expect(screen.getByText(/Wallet balance/i)).toBeInTheDocument();
    });

    it("initially hides the balance (shows dots)", () => {
        render(<WalletBalance balance={20000000} />);
        expect(screen.getByTestId("closeIcon")).toBeInTheDocument();
        expect(screen.queryByTestId("balance")).not.toBeInTheDocument();
    });

    it("shows the balance when eye icon is clicked", () => {
        render(<WalletBalance balance={20000000} />);
        fireEvent.click(screen.getByTestId("upEyeIcon"));

        expect(screen.getByTestId("balance")).toBeInTheDocument();
        expect(screen.queryByTestId("closeIcon")).not.toBeInTheDocument();
        expect(screen.getByText("₦20,000,000.00")).toBeInTheDocument();
    });

    it("toggles back to hidden when clicking eye-off icon", () => {
        render(<WalletBalance balance={20000000} />);
        fireEvent.click(screen.getByTestId("upEyeIcon")); // Show balance
        fireEvent.click(screen.getByTestId("closeEyeIcon")); // Hide again

        expect(screen.getByTestId("closeIcon")).toBeInTheDocument();
        expect(screen.queryByTestId("balance")).not.toBeInTheDocument();
    });

    // it("renders three WalletButton components with correct labels", () => {
    //     render(<WalletBalance balance={20000000} />);
    //     // expect(screen.getByTestId("fundWallet")).toBeInTheDocument();
    //     expect(screen.getByTestId("withdraw")).toBeInTheDocument();
    //     expect(screen.getByTestId("walletConnect")).toBeInTheDocument();
    // });
    //
    // it("renders WalletConnect component", () => {
    //     render(<WalletBalance balance={20000000} />);
    //     expect(screen.getByTestId("walletConnect")).toBeInTheDocument();
    // });
});

