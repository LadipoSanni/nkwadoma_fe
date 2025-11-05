import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Transaction from "@/pages/Transaction"; // update import path to your actual file
import { Trans } from "@/types/ButtonTypes";
import dayjs from "dayjs";

const mockData: { date: string; details: Trans[] }[] = [
    {
        date: "2025-11-01",
        details: [
            { description: "Wallet funding", status: "successful", amount: "10000",paymentMode: 'wallet' },
            { description: "Loan repayment", status: "pending", amount: "5500" ,paymentMode:'linked account'},
            { description: "Withdrawal", status: "failed", amount: "7000" , paymentMode:'wallet'},
        ],
    },
];

describe("Transaction Component", () => {
    it("renders recent transactions with viewLittle = true", () => {
        const onViewAllClick = jest.fn();

        render(
            <Transaction
                viewLittle={true}
                data={mockData}
                onViewAllClick={onViewAllClick}
            />
        );
        expect(screen.getByText("Recent transactions")).toBeInTheDocument();
        const viewAll = screen.getByText("View all");
        fireEvent.click(viewAll);
        expect(onViewAllClick).toHaveBeenCalledTimes(1);
        expect(screen.getByText("Wallet funding")).toBeInTheDocument();
    });

    it("renders with viewLittle = false and displays filters", () => {
        render(<Transaction viewLittle={false} data={mockData} />);
        expect(screen.getByText("Transaction history")).toBeInTheDocument();
        const formattedDate = dayjs("2025-11-01").format("D MMM, YYYY");
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
        expect(screen.getByText("Wallet funding")).toBeInTheDocument();
        expect(screen.getByText("Loan repayment")).toBeInTheDocument();
        expect(screen.getByText("Withdrawal")).toBeInTheDocument();
    });

    it("applies correct color styles for transaction statuses", () => {
        render(<Transaction viewLittle={true} data={mockData} />);
        expect(screen.getByText("successful").className).toContain("bg-[#E6F2EA]");
        expect(screen.getByText("pending").className).toContain("bg-[#FEF6E8]");
        expect(screen.getByText("failed").className).toContain("bg-[#FBE9E9]");
    });
});
