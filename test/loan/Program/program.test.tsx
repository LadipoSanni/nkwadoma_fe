import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from "react";
import CreateProgramButton from "@/features/admin/program/create-program-button/Index";


describe('CreateProgramButton Component', () => {
    beforeEach(() => {
        cleanup();
        jest.spyOn(console, 'log').mockReturnValue();
        jest.spyOn(console, 'warn').mockReturnValue();
        jest.spyOn(console, 'error').mockReturnValue();
        const {queryByTestId} = render(
            <CreateProgramButton
                buttonText="Create Program"
                title="Program Details"
                programDeliveryTypes={['Online', 'Offline']}
                programModes={['Full-time', 'Part-time']}
                programDurations={['1 month', '3 months']}
                submitButtonText="Submit"
                triggerButtonStyle="custom-style"
            />
        )
        const assert = queryByTestId("trigger-button");
        expect(assert).toBeInTheDocument();

    });
    it('should open the dialog when the trigger button is clicked', () => {
        const triggerButton = screen.getByTestId('trigger-button');
        fireEvent.click(triggerButton);
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toBeVisible();
    });

    it('should keep the dialog closed if the trigger button is not clicked', () => {
        const dialogContent = screen.queryByTestId('dialog-content');
        expect(dialogContent).toBeNull();
    });

    it('should close the dialog when the closeDialog function is called', () => {
        const triggerButton = screen.getByTestId('trigger-button');
        fireEvent.click(triggerButton);
        const dialogContent = screen.getByTestId('dialog-content');
        expect(dialogContent).toBeVisible();

        const closeButton = screen.getByTestId('cancel-button');
        fireEvent.click(closeButton);
        expect(dialogContent).not.toBeVisible();
    });
});
