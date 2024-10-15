import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from "react";
import CreateProgramButton from "@/features/adminFeatures/program/createProgramButton/Index";


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

        // Fill in program name input
        const programNameInput = screen.getByTestId('program-name-input');
        fireEvent.change(programNameInput, { target: { value: 'New Program' } });
        expect(programNameInput).toHaveValue('New Program');

        // Select Program Type
        const programTypeTrigger = screen.getByTestId('program-type-trigger');
        fireEvent.click(programTypeTrigger);
        const programTypeItem = screen.getByTestId('program-type-item-0');
        fireEvent.click(programTypeItem);
        expect(programTypeTrigger).toHaveTextContent('Type 1');

        // Select Program Delivery Type
        const programDeliveryTypeTrigger = screen.getByTestId('program-delivery-type-trigger');
        fireEvent.click(programDeliveryTypeTrigger);
        const programDeliveryTypeItem = screen.getByTestId('program-delivery-type-item-0');
        fireEvent.click(programDeliveryTypeItem);
        expect(programDeliveryTypeTrigger).toHaveTextContent('Delivery 1');

        // Select Program Mode
        const programModeTrigger = screen.getByTestId('program-mode-trigger');
        fireEvent.click(programModeTrigger);
        const programModeItem = screen.getByTestId('program-mode-item-0');
        fireEvent.click(programModeItem);
        expect(programModeTrigger).toHaveTextContent('Mode 1');

        // Select Program Duration
        const programDurationTrigger = screen.getByTestId('program-duration-trigger');
        fireEvent.click(programDurationTrigger);
        const programDurationItem = screen.getByTestId('program-duration-item-0');
        fireEvent.click(programDurationItem);
        expect(programDurationTrigger).toHaveTextContent('1 month');

        // Fill in program description
        const programDescription = screen.getByTestId('program-description');
        fireEvent.change(programDescription, { target: { value: 'This is a program description' } });
        expect(programDescription).toHaveValue('This is a program description');
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
