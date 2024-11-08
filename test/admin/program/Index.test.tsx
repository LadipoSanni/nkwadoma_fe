import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import ProgramView from '@/pages/admin/program/program-view/Index';
import ProgramDetails from '@/pages/admin/program/program-details/Index';
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));
import {useRouter} from "next/navigation";

describe('program-view Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    test('renders program-view component', () => {
        render(<ProgramView />);
        expect(screen.getByText('Create program')).toBeInTheDocument();
    });

    test('displays details tab content by default', () => {
        render(<ProgramDetails/>);
        expect(screen.getByText('Product Design')).toBeInTheDocument();
        expect(screen.getByText('Edit program')).toBeInTheDocument();
    });

    test('displays cohorts tab content when clicked', () => {
        render(<ProgramDetails />);
        fireEvent.click(screen.getByText('Cohorts'));
        expect(screen.getByText('Cohorts')).toBeInTheDocument();
    });

    test('navigates back to programs on back button click', () => {
        render(<ProgramDetails />);
        fireEvent.click(screen.getByTestId('backClick'));
        expect(mockPush).toHaveBeenCalledWith('/program');
    });

    test('renders search input in cohorts tab', () => {
        render(<ProgramDetails />);
        fireEvent.click(screen.getByText('Cohorts'));
    });

    test('renders table in cohorts tab', () => {
        render(<ProgramDetails />);
        fireEvent.click(screen.getByText('Cohorts'));
    });
});