import React from 'react';
import { render, screen} from '@testing-library/react';
import ProgramView from '@/features/admin/program/program-view/Index';

describe('program-view Component', () => {
    test('renders program-view component', () => {
        render(<ProgramView />);
        expect(screen.getByText('Create Program')).toBeInTheDocument();
    });
});