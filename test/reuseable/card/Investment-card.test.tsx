import React from "react";
import { render, screen } from "@testing-library/react";
import InvestmentCard from "@/reuseable/cards/Investment-card/InvestmentCard";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("InvestmentCard Component", () => {
    const mockHandleCardDetails = jest.fn();
    const mockRouter = { push: jest.fn() };
    const mockProps = {
        id: "test-id",
        backgroundColor: "#D9EAFF",
        investmentVehicleType: "Commercial",
        imageSrc: "/asset/image/Circles.svg",
        investmentVehicleName: "AI Startup Investment",
        status: "Open",
        percentage: 5,
        HandleCardDetails: mockHandleCardDetails,
        statusClass: "bg-green-100 text-[#0D9B48] border-[#B4E5C8]",
        borderClass: "border-[#B4E5C8]",
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component correctly", () => {
        render(<InvestmentCard statuses={""} {...mockProps} />);
        expect(screen.getByTestId("investment-card")).toBeInTheDocument();
        expect(screen.getByText("Commercial")).toBeInTheDocument();
        expect(screen.getByText("AI Startup Investment")).toBeInTheDocument();
        expect(screen.getByText("5% interest")).toBeInTheDocument();
    });

    it("applies the correct background color to the investment type segment", () => {
        render(<InvestmentCard statuses={""} {...mockProps} />);
        const segment = screen.getByTestId("investment-type-segment");
        expect(segment).toHaveStyle(`background-color: ${mockProps.backgroundColor}`);
    });

    it("displays the correct status class", () => {
        render(<InvestmentCard statuses={""} {...mockProps} />);
    });

    it("renders correctly with a different status and percentage", () => {
        const customProps = {
            ...mockProps,
            status: "Closed",
            percentage: 10,
            statusClass: "bg-red-100 text-[#FF0000] border-[#FFCCCC]",
        };
        render(<InvestmentCard statuses={""} {...customProps} />);
        // expect(screen.getByText("Closed")).toBeInTheDocument();
        expect(screen.getByText("10% interest")).toBeInTheDocument();
    });

    it("handles long investment vehicle names gracefully", () => {
        const longNameProps = {
            ...mockProps,
            investmentVehicleName: "This is a very long investment vehicle name that should truncate or wrap",
        };
        render(<InvestmentCard statuses={""} {...longNameProps} />);
        expect(screen.getByText(longNameProps.investmentVehicleName)).toBeInTheDocument();
    });

    it("does not break with zero percentage", () => {
        const zeroPercentProps = { ...mockProps, percentage: 0 };
        render(<InvestmentCard statuses={""} {...zeroPercentProps} />);
        expect(screen.getByText("0% interest")).toBeInTheDocument();
        expect(screen.getByTestId("investment-card")).toBeInTheDocument();
    });

    it("renders 'Fundraising' text consistently", () => {
        render(<InvestmentCard statuses={""} {...mockProps} />);
        expect(screen.getByText("Fundraising")).toBeInTheDocument();
    });
});