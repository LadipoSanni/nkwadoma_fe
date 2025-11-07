import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WalletButton from "@/reuseable/buttons/WalletButton";
import { FaWallet } from "react-icons/fa";

describe("WalletButton Component", () => {
    it("renders with text and icon", () => {
        render(<WalletButton text="Add Money" icon={<FaWallet data-testid="wallet-icon" />} />);

        expect(screen.getByText("Add Money")).toBeInTheDocument();
        expect(screen.getByTestId("wallet-icon")).toBeInTheDocument();
    });

    it("renders with default colors when none provided", () => {
        render(<WalletButton text="Add Funds" />);

        const button = screen.getByRole("button", { name: /Add Funds/i });
        expect(button).toHaveClass("bg-[#F3F8FF]");
        expect(button).toHaveClass("text-[meedlBlue]");
    });

    it("applies custom colors when provided", () => {
        render(<WalletButton text="Withdraw" bgColor="#123456" textColor="#ABCDEF" />);
        const button = screen.getByRole("button", { name: /Withdraw/i });

        // Note: dynamic Tailwind class names won’t be applied in tests,
        // but you can still check that your props render properly if used differently.
        expect(button.className).toContain("bg-[#123456]");
        expect(button.className).toContain("text-[#ABCDEF]");
    });

    it("calls handleClick when clicked", () => {
        const handleClick = jest.fn();
        render(<WalletButton text="Deposit" handleClick={handleClick} />);

        fireEvent.click(screen.getByRole("button", { name: /Deposit/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("sets correct id and data-testid", () => {
        render(<WalletButton text="View Wallet" />);
        const button = screen.getByTestId("walletButtonViewWallet");

        expect(button).toBeInTheDocument();
        expect(button.id).toBe("walletButtonViewWallet");
    });
});
