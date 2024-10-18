import React from 'react';
import { render, screen } from '@testing-library/react';
import Kebab from "@/reuseable/Kebab/Kebab";

describe('Kebab Component', () => {
    const kebabOptions = [
        { id: '1', name: 'View program details' },
        { id: '2', name: 'Edit program'},
        { id: '3', name: 'Delete program' }
    ];

    const mockHandleDropDownClick = jest.fn();

    beforeEach(() => {
        render(
            <Kebab
                kebabOptions={kebabOptions}
                handleDropDownClick={mockHandleDropDownClick}
                className="test-class"
            />
        );
    });

    it('should render the kebab button and icon', () => {
        const kebabButton = screen.getByTestId('kebab-button');
        const kebabIcon = screen.getByTestId('kebab-icon');

        expect(kebabButton).toBeInTheDocument();
        expect(kebabIcon).toBeInTheDocument();
    });

    // it('should trigger handleDropDownClick when an option is clicked', () => {
    //     const kebabButton = screen.getByTestId('kebab-button');
    //     fireEvent.click(kebabButton);
    //
    //     const menuItem = screen.getByTestId('menubar-item-2');
    //     fireEvent.click(menuItem);
    //
    //     expect(mockHandleDropDownClick).toHaveBeenCalledWith('3');
    // });
});
