import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateCohort from '@/reuseable/modals/CreateCohort';

describe('CreateCohort Component', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockReturnValue()
        jest.spyOn(console, 'warn').mockReturnValue()
        jest.spyOn(console, 'log').mockReturnValue()

    })
    test('renders CreateCohort component', () => {
        render(<CreateCohort />);
        expect(screen.getByText('Create Cohort')).toBeInTheDocument();
    });

    test('Create Cohort button is disabled when required fields are not filled', () => {
        render(<CreateCohort />);
        const createButton = screen.getByText('Create Cohort');
        fireEvent.click(createButton);

        const submitButton = screen.getByRole('button', { name: 'Continue' });
        expect(submitButton).toBeDisabled();
    });



});