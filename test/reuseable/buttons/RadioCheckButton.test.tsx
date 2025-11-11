
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioCheckButton from "@/reuseable/buttons/RadioCheckButton";



describe("RadioCheckButton", () => {
    const mockClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the button with provided text", () => {
        render(<RadioCheckButton text="Linked accounts" isChecked={false} onClick={mockClick} />);
        expect(screen.getByText("Linked accounts")).toBeInTheDocument();
        expect(screen.getByTestId("RadioButtonLinkedaccounts")).toBeInTheDocument();
    });

    it("calls onClick when button is clicked", () => {
        render(<RadioCheckButton text="Paystack" isChecked={false} onClick={mockClick} />);
        const button = screen.getByTestId("RadioButtonPaystack");

        fireEvent.click(button);

        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it("applies checked styles when isChecked is true", () => {
        const { container } = render(
            <RadioCheckButton text="Paystack" isChecked={true} onClick={mockClick} />
        );

        // Outer circle should have border-[#e6effb]
        const borderDiv = container.querySelector("div.border-\\[\\#e6effb\\]");
        expect(borderDiv).toBeTruthy();

        // Inner filled dot should have bg-meedlBlue
        const innerDot = container.querySelector(".bg-meedlBlue");
        expect(innerDot).toBeTruthy();
    });

    it("applies unchecked styles when isChecked is false", () => {
        const { container } = render(
            <RadioCheckButton text="Paystack" isChecked={false} onClick={mockClick} />
        );

        const borderDiv = container.querySelector("div.border-\\[\\#e6effb\\]");
        expect(borderDiv).toBeFalsy();

        const innerDot = container.querySelector(".bg-meedlBlue");
        expect(innerDot).toBeFalsy();
    });
});
