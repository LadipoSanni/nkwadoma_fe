import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CohortDetails from "@/pages/traineeInstitute/cohort/CohortDetails/Index"


describe('CohortDetails Component', () => {
    it('should render the cohort title', () => {
        render(<CohortDetails />);
        const cohortTitle = screen.getByText('Luminary');
        expect(cohortTitle).toBeInTheDocument();
    });

    it('should display the cohort description', () => {
        render(<CohortDetails />);
        const cohortDescription = screen.getByText(/Design thinking is a process for creative problem solving/i);
        expect(cohortDescription).toBeInTheDocument();
    });

    it('should display the data list items', () => {
        render(<CohortDetails />);
        const startDate = screen.getByText('Start Date');
        const startValue = screen.getByText('13, Dec 2023');
        const endDate = screen.getByText('End Date');
        const endValue = screen.getByText('15, Jan 2024');
        expect(startDate).toBeInTheDocument();
        expect(startValue).toBeInTheDocument();
        expect(endDate).toBeInTheDocument();
        expect(endValue).toBeInTheDocument();
    });
});
