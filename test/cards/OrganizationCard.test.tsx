import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OrganizationLoan from "@/reuseable/cards/OrganizationLoan";

const mockHandleClick = jest.fn();

const defaultProps = {
    organizationName: "Acme Corp",
    loanAmountApproved: "5000",
    loanAmountOutstanding: "2000",
    loanAmountRepaid: "3000",
    isLoading: false,
    id: "123",
    handleClick: mockHandleClick,
};

describe("OrganizationLoan Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders organization name correctly", () => {
        render(<OrganizationLoan {...defaultProps} />);
        expect(screen.getByTestId('organizationName')).toBeInTheDocument();
    });

    // it("renders formatted loan amounts", () => {
    //     render(<OrganizationLoan {...defaultProps} />);
    //
    //     expect(screen.getByTestId("loanAmountValue")).toHaveTextContent("₦5,000.00");
    //     expect(screen.getByTestId("loanAmountOutstandingValue")).toHaveTextContent("₦2,000.00");
    // });
    //
    // it("shows skeleton loaders when isLoading is true", () => {
    //     render(<OrganizationLoan {...defaultProps} isLoading={true} />);
    //
    //     // Should have animated skeleton elements
    //     const skeletons = screen.getAllByRole("presentation", { hidden: true });
    //     expect(skeletons.length).toBeGreaterThan(0);
    //
    //     // Should hide text content
    //     expect(screen.queryByText("Loan amount")).not.toBeInTheDocument();
    // });

    it("calls handleClick when View Details button is clicked", () => {
        render(<OrganizationLoan {...defaultProps} />);

        const button = screen.getByTestId("viewLoanDetailsButton");
        fireEvent.click(button);

        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it("displays the first letter of the organization name in the circle badge", () => {
        render(<OrganizationLoan {...defaultProps} />);
        const initial = screen.getByText("A");
        expect(initial).toBeInTheDocument();
    });

    // it("renders correctly even with missing loan data", () => {
    //     render(
    //         <OrganizationLoan
    //             {...defaultProps}
    //             loanAmountApproved=""
    //             loanAmountOutstanding=""
    //             loanAmountRepaid=""
    //         />
    //     );
    //
    //     expect(screen.getByTestId("loanAmountValue")).toHaveTextContent("₦0.00");
    // });
});
