import React from 'react';
import { render, screen} from '@testing-library/react';
import ProgramView from '@/features/admin/program/ProgramView/Index';

describe('ProgramView Component', () => {
    test('renders ProgramView component', () => {
        render(<ProgramView />);
        expect(screen.getByText('Create Program')).toBeInTheDocument();
    });
});