import React from 'react';
import { render, screen} from '@testing-library/react';
import Program from '@/features/admin/program/Index';

describe('Program Component', () => {
    test('renders Program component', () => {
        render(<Program />);
        expect(screen.getByText('Program')).toBeInTheDocument();
        expect(screen.getByText('Create program')).toBeInTheDocument();
    });

});