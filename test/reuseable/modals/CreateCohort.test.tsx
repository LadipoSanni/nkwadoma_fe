import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateCohort from '@/reuseable/modals/CreateCohort';

describe('CreateCohort Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockReturnValue()
        jest.spyOn(console, 'warn').mockReturnValue()
        jest.spyOn(console, 'log').mockReturnValue()

    })
    it('should render the Create Cohort button', () => {
        render(<CreateCohort triggerButtonStyle="test-style" />);
        expect(screen.getByText(/Create cohort/i)).toBeInTheDocument();
    });

    it("opens the dialog and displays the Cohort Name input field", async () => {
        render(<CreateCohort triggerButtonStyle="test-style" />);
        const openDialogButton = screen.getByRole("button", { name: /Create cohort/i });
        fireEvent.click(openDialogButton);
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
        const cohortNameInput = screen.getByLabelText(/Cohort Name/i);
        expect(cohortNameInput).toBeInTheDocument();
    });

    it('resets the form on dialog close', async () => {
        render(<CreateCohort triggerButtonStyle="test-style" />);
        fireEvent.click(screen.getByText(/Create cohort/i));
        fireEvent.change(screen.getByPlaceholderText(/Enter name/i), { target: { value: 'New Cohort' } });
        fireEvent.click(screen.getByRole('button', { name: /Close/i }));
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        fireEvent.click(screen.getByText(/Create cohort/i));
        expect(screen.getByPlaceholderText(/Enter name/i)).toHaveValue('');
    });

});
