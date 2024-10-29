import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import Kebab from "@/reuseable/Kebab/Kebab";

describe('Kebab Component', () => {
    const kebabOptions = [
        { id: '1', name: 'View program details' },
        { id: '2', name: 'Edit program'},
        { id: '3', name: 'Delete program' }
    ];

    const mockHandleDropDownClick = jest.fn();

    beforeEach(() => {
        cleanup();
        jest.spyOn(console,'log').mockReturnValue();
        jest.spyOn(console,'warn').mockReturnValue();
        jest.spyOn(console,'error').mockReturnValue();
        const { queryByTestId } = render(
            <Kebab
                kebabOptions={kebabOptions}
                handleDropDownClick={mockHandleDropDownClick}
                className="test-class"
            />
        );

        const kebabWrapper = queryByTestId('kebab-wrapper');
        expect(kebabWrapper).toBeInTheDocument();
    });

    it('should render the kebab button', () => {
        const kebabButton = screen.getByTestId('kebab-button');

        expect(kebabButton).toBeInTheDocument();
    });

    it('should render Kebab component without errors', () => {
        const assert = screen.getByTestId('kebab-wrapper');
        expect(assert).toBeInTheDocument();
        expect(screen.getByTestId('menubar')).toBeInTheDocument();
        expect(screen.getByTestId('kebab-button')).toBeInTheDocument();
    });

    it('should render correctly with no kebabOptions', () => {
        const { queryAllByTestId } = render(<Kebab />);
        const menuItems = queryAllByTestId(/menubar-item-/);
        expect(menuItems.length).toBe(0);
    });

    it('should apply className to MenubarItems when kebabOptions are provided', () => {
        const handleDropDownClick = jest.fn();
        const kebabOptions = [
            { id: '1', name: 'Option 1' },
            { id: '2', name: 'Option 2' },
            { id: '3', name: 'Option 3' }
        ];
        const className = 'custom-class';
        const Icon = () => <svg />;

        render(
            <Kebab
                handleDropDownClick={handleDropDownClick}
                kebabOptions={kebabOptions}
                className={className}
                icon={Icon}
            />
        );

        const menubarItems = screen.queryAllByTestId("menubarItem");
        menubarItems.forEach((item, index) => {
            expect(item).toHaveClass(className);
            if (kebabOptions[index].id === '3') {
                expect(item).toHaveClass('text-error500 focus:text-error500 focus:bg-error50 hover:bg-error50');
            }
        });
    });

    it('should keep the dialog closed if the trigger button is not clicked', () => {
        const dialogContent = screen.queryByTestId('menubar-content');
        expect(dialogContent).toBeNull();
    });
});
