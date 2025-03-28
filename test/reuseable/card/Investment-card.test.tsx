import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InvestmentCard from "@/reuseable/cards/Investment-card/InvestmentCard";

describe("InvestmentCard Component", () => {
    const mockHandleCardDetails = jest.fn();
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

    it("renders the component correctly", () => {
        render(<InvestmentCard {...mockProps} />);
        expect(screen.getByTestId("investment-card")).toBeInTheDocument();
        expect(screen.getByText("Commercial")).toBeInTheDocument();
        expect(screen.getByText("AI Startup Investment")).toBeInTheDocument();
        expect(screen.getByText("Open")).toBeInTheDocument();
        expect(screen.getByText("5% interest")).toBeInTheDocument();
    });

    it("calls HandleCardDetails when 'View details' is clicked", () => {
        render(<InvestmentCard {...mockProps} />);
        fireEvent.click(screen.getByText("View details"));
        expect(mockHandleCardDetails).toHaveBeenCalledWith("test-id");
    });
});
