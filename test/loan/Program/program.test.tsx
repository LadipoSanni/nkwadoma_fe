import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from "react";
import CreateProgramButton from "@/features/admin/program/createProgramButton/Index";


describe('CreateProgramButton Component', () => {
    const setup = () => {
        const props = {
            buttonText: 'Open Dialog',
            title: 'Create Program',
            programTypes: ['Type 1', 'Type 2', 'Type 3'],
            programDeliveryTypes: ['Delivery 1', 'Delivery 2'],
            programModes: ['Mode 1', 'Mode 2'],
            programDurations: ['1 month', '2 months'],
        };

        return render(<CreateProgramButton {...props} />);
    };

    it('should render the trigger button and open the dialog on click', () => {
        setup();

        // Check if the button with text 'Open Dialog' is rendered
        const triggerButton = screen.getByTestId('trigger-button');
        expect(triggerButton).toBeInTheDocument();
        expect(triggerButton).toHaveTextContent('Open Dialog');

        // Click the trigger button to open the dialog
        fireEvent.click(triggerButton);

        // Check if the dialog content is rendered after clicking the trigger button
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toBeVisible();

        // Check if the title of the dialog is correct
        const dialogTitle = screen.getByTestId('dialog-title');
        expect(dialogTitle).toHaveTextContent('Create Program');
    });

    it('should allow filling in form fields and selecting items from dropdowns', () => {
        setup();

        // Open the dialog
        const triggerButton = screen.getByTestId('trigger-button');
        fireEvent.click(triggerButton);

        // Fill in ProgramView name input
        const programNameInput = screen.getByTestId('ProgramView-name-input');
        fireEvent.change(programNameInput, { target: { value: 'New Program' } });
        expect(programNameInput).toHaveValue('New Program');

        // Select Program Type
        const programTypeTrigger = screen.getByTestId('ProgramView-type-trigger');
        fireEvent.click(programTypeTrigger);
        const programTypeItem = screen.getByTestId('ProgramView-type-item-0');
        fireEvent.click(programTypeItem);
        expect(programTypeTrigger).toHaveTextContent('Type 1');

        // Select Program Delivery Type
        const programDeliveryTypeTrigger = screen.getByTestId('ProgramView-delivery-type-trigger');
        fireEvent.click(programDeliveryTypeTrigger);
        const programDeliveryTypeItem = screen.getByTestId('ProgramView-delivery-type-item-0');
        fireEvent.click(programDeliveryTypeItem);
        expect(programDeliveryTypeTrigger).toHaveTextContent('Delivery 1');

        // Select Program Mode
        const programModeTrigger = screen.getByTestId('ProgramView-mode-trigger');
        fireEvent.click(programModeTrigger);
        const programModeItem = screen.getByTestId('ProgramView-mode-item-0');
        fireEvent.click(programModeItem);
        expect(programModeTrigger).toHaveTextContent('Mode 1');

        // Select Program Duration
        const programDurationTrigger = screen.getByTestId('ProgramView-duration-trigger');
        fireEvent.click(programDurationTrigger);
        const programDurationItem = screen.getByTestId('ProgramView-duration-item-0');
        fireEvent.click(programDurationItem);
        expect(programDurationTrigger).toHaveTextContent('1 month');

        // Fill in ProgramView description
        const programDescription = screen.getByTestId('ProgramView-description');
        fireEvent.change(programDescription, { target: { value: 'This is a ProgramView description' } });
        expect(programDescription).toHaveValue('This is a ProgramView description');
    });

    // it('should close the dialog when Cancel button is clicked', () => {
    //     setup();
    //
    //     // Open the dialog
    //     const triggerButton = screen.getByTestId('trigger-button');
    //     fireEvent.click(triggerButton);
    //
    //     // Click the Cancel button
    //     const cancelButton = screen.getByTestId('cancel-button');
    //     fireEvent.click(cancelButton);
    //
    //     // Check that the dialog is no longer visible
    //     const dialogContent = screen.queryByTestId('dialog-content');
    //     expect(dialogContent).not.toBeVisible();
    // });

    // it('should close the dialog when Create Program button is clicked', () => {
    //     setup();
    //
    //     // Open the dialog
    //     const triggerButton = screen.getByTestId('trigger-button');
    //     fireEvent.click(triggerButton);
    //
    //     // Click the Create Program button
    //     const createButton = screen.getByTestId('create-button');
    //     fireEvent.click(createButton);
    //
    //     // Check that the dialog is no longer visible
    //     const dialogContent = screen.queryByTestId('dialog-content');
    //     expect(dialogContent).not.toBeVisible();
    // });
});
