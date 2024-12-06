import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Breakdown} from "@/reuseable/details/breakdown";

const breakDownData = [
    { itemName: 'Tuition Fee', itemAmount: '$5000' },
    { itemName: 'Lab Fee', itemAmount: '$300' },
    { itemName: 'Library Fee', itemAmount: '$150' },
    { itemName: 'Sports Fee', itemAmount: '$200' },
    { itemName: 'Activity Fee', itemAmount: '$100' }
];

describe('Breakdown Component', () => {
    it('renders the tuition breakdown trigger correctly', () => {
        render(<Breakdown breakDown={breakDownData} />);

        const triggerButton = screen.getByTestId('tuition-breakdown-trigger');
        expect(triggerButton).toBeInTheDocument();
        expect(screen.getAllByText('Expand to see the tuition breakdown')).toHaveLength(2);
    });

    it('toggles breakdown visibility when clicked', () => {
        render(<Breakdown breakDown={breakDownData} />);

        const triggerButton = screen.getByTestId('tuition-breakdown-trigger');
        fireEvent.click(triggerButton);

        const content = screen.getByTestId('tuition-breakdown-content');
        expect(content).toBeVisible();

        fireEvent.click(triggerButton);
        expect(content).not.toBeVisible();
    });

    it('displays each breakdown item correctly', () => {
        render(<Breakdown breakDown={breakDownData} />);

        const triggerButton = screen.getByTestId('tuition-breakdown-trigger');
        fireEvent.click(triggerButton);

        breakDownData.forEach((item) => {
            const titleElement = screen.getByText(item.itemName);
            const amountElement = screen.getByText(item.itemAmount);
            expect(titleElement).toBeInTheDocument();
            expect(amountElement).toBeInTheDocument();
        });
    });

    it('renders the separator after the third item', () => {
        render(<Breakdown breakDown={breakDownData} />);

        const triggerButton = screen.getByTestId('tuition-breakdown-trigger');
        fireEvent.click(triggerButton);

        const separator = screen.getByRole('separator', { hidden: true });
        expect(separator).toBeInTheDocument();
    });
});
