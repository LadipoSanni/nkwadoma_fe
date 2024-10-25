import {render, screen, fireEvent} from '@testing-library/react';
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
        return render(<CreateProgramButton useSecondaryButton={false} submitButtonText={''} {...props} />);
    };

    it('should render the trigger button and open the dialog on click', () => {
        setup();

        const triggerButton = screen.getByTestId('trigger-button');
        expect(triggerButton).toBeInTheDocument();
        expect(triggerButton).toHaveTextContent('Open Dialog');

        fireEvent.click(triggerButton);

        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toBeVisible();

        const dialogTitle = screen.getByTestId('dialog-title');
        expect(dialogTitle).toHaveTextContent('Create Program');
    });

    it('should allow filling in form fields and selecting items from dropdowns', () => {
        setup();

        const triggerButton = screen.getByTestId('trigger-button');
        fireEvent.click(triggerButton);

        const programModeTrigger = screen.getByTestId('ProgramView-mode-trigger');
        fireEvent.click(programModeTrigger);
        const programModeItem = screen.getByTestId('ProgramView-mode-item-0');
        fireEvent.click(programModeItem);
        expect(programModeTrigger).toHaveTextContent('Mode 1');

        const programDurationTrigger = screen.getByTestId('ProgramView-duration-trigger');
        fireEvent.click(programDurationTrigger);
        const programDurationItem = screen.getByTestId('ProgramView-duration-item-0');
        fireEvent.click(programDurationItem);
        expect(programDurationTrigger).toHaveTextContent('1 month');

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
