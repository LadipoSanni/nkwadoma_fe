import { render, screen } from "@testing-library/react";
import CircleThreeDot from "@/reuseable/Dropdown/CircleThreeDot";

describe("CircleThreeDot", () => {
    const mockItems = [
        { id: "edit", name: "Edit", handleClick: jest.fn(), sx: "" },
        { id: "delete", name: "Delete", handleClick: jest.fn(), sx: "" },
    ];

    it("renders horizontal dots", () => {
        render(
            <CircleThreeDot
                id="menu-test"
                dotDisplay="horizontal"
                isDisabled={false}
                dropDownItems={mockItems}
            />
        );

        expect(screen.getByTestId("menu-test")).toBeInTheDocument();
        expect(screen.getByTestId("horizontalTrigger")).toBeEnabled();
    });

    it("renders vertical dots", () => {
        render(
            <CircleThreeDot
                id="menu-test-vertical"
                dotDisplay="vertical"
                isDisabled={false}
                dropDownItems={mockItems}
            />
        );

        expect(screen.getByTestId("menu-test-vertical")).toBeInTheDocument();
        expect(screen.getByTestId("verticalTrigger")).toBeEnabled();
    });

    it("disables the trigger when isDisabled is true", () => {
        render(
            <CircleThreeDot
                id="menu-disabled"
                dotDisplay="vertical"
                isDisabled={true}
                dropDownItems={mockItems}
            />
        );

        expect(screen.getByTestId("trigger")).toBeDisabled();
    });

    // it("calls the handler when dropdown item is clicked", () => {
    //     render(
    //         <CircleThreeDot
    //             id="menu-click"
    //             dotDisplay="horizontal"
    //             isDisabled={false}
    //             dropDownItems={mockItems}
    //         />
    //     );
    //
    //     const trigger = screen.getByTestId("horizontalTrigger");
    //     fireEvent.click(trigger);
    //
    //     const editItem = screen.getByTestId("edit");
    //     fireEvent.click(editItem);
    //
    //     expect(mockItems[0].handleClick).toHaveBeenCalled();
    // });
});
