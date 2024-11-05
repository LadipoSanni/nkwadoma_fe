import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import ProgramView from '@/pages/admin/program/program-view/Index';
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
    })
    test('renders program-view component', () => {
        render(<ProgramView />);
        expect(screen.getByText('Create Program')).toBeInTheDocument();
    });
});