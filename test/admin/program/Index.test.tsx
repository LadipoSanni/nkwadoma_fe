import React from 'react';
import { render, screen} from '@testing-library/react';
import ProgramView from '@/pages/admin/program/program-view/Index';

describe('program-view Component', () => {
    test('renders program-view component', () => {
        render(<ProgramView />);
        expect(screen.getByText('Create program')).toBeInTheDocument();
    });
});