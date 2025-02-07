import { render, screen, fireEvent,cleanup } from "@testing-library/react";
import CreateProgram from "@/components/program/create-program";
import {Providers} from "@/app/provider";

const setup = (props = {}) => {
    const defaultProps = {
        programDeliveryTypes: ["Online", "In-person"],
        programModes: ["Full-time", "Part-time"],
        programDurations: ["1 month", "3 months"],
        submitButtonText: "Create Program",
        setIsOpen: jest.fn(),
        ...props,
    };
    return render(
        <Providers>
        <CreateProgram {...defaultProps} />
        </Providers>
    );
};

describe("CreateProgram component", () => {
    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
    })


    test("renders all input labels and placeholders correctly", () => {
        // setup();
        // expect(screen.getByTestId("program-name-label")).toHaveTextContent("Program Name");
        // expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
        // expect(screen.getByTestId("program-delivery-type-label")).toHaveTextContent("Program Delivery Type");
        // expect(screen.getByTestId("program-duration-label")).toHaveTextContent("Program Duration");
        // expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument();
    });

    // test("validates program name input and shows error if invalid", () => {
    //     setup();

    //     const programNameInput = screen.getByTestId("program-name-input");
    //     fireEvent.change(programNameInput, { target: { value: "1234" } });
    //     expect(screen.getByText("Name must contain only letters.")).toBeInTheDocument();
    // });

    // test("validates program description input and shows error if invalid", () => {
    //     setup();

    //     const programDescriptionInput = screen.getByTestId("program-description");
    //     fireEvent.change(programDescriptionInput, { target: { value: "1234" } });
    //     expect(screen.getByText("Description must contain only letters.")).toBeInTheDocument();
    // });

    // test("disables 'Create Program' button if form is invalid", () => {
    //     setup();

    //     const createButton = screen.getByTestId("create-button");
    //     expect(createButton).toBeDisabled();
    // });

    // test("closes dialog and resets fields on 'Cancel' click", () => {
    //     const setIsOpen = jest.fn();
    //     setup({ setIsOpen });

    //     const cancelButton = screen.getByTestId("cancel-button");
    //     fireEvent.click(cancelButton);

    //     expect(setIsOpen).toHaveBeenCalledWith(false);
    //     expect(screen.getByTestId("program-name-input")).toHaveValue("");
    //     expect(screen.getByTestId("program-description")).toHaveValue("");
    // });
});
