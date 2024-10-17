import React from 'react';
import { render, screen} from '@testing-library/react';
import ProgramView from '@/features/admin/program/ProgramView/Index';

describe('Program Component', () => {
    test('renders Program component', () => {
        render(<ProgramView />);
        expect(screen.getByText('Program')).toBeInTheDocument();
        // expect(screen.getByText(' program')).toBeInTheDocument();
    });  

});