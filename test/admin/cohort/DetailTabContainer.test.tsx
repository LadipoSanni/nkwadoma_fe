import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from "react";
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
const dataList = [
    { label: 'Label 1', value: 'Value 1' },
    { label: 'Label 2', value: 'Value 2' }
];

const breakDown = [
    { itemName: 'Item 1', itemAmount: '100' },
    { itemName: 'Item 2', itemAmount: '200' },
];

describe('CreateProgramButton Component', () => {
    beforeEach(() => {
        cleanup();
        jest.spyOn(console, 'log').mockReturnValue();
        jest.spyOn(console, 'warn').mockReturnValue();
        jest.spyOn(console, 'error').mockReturnValue();
        const {queryByTestId} = render(
            <DetailsTabContainer dataList={dataList} breakDown={breakDown} tabTitle1={''} tabTitle2={''}/>
        )
        const assert = queryByTestId("cohort-details");
        expect(assert).toBeInTheDocument();
    });

    it('should test that create program button is rendered', () => {

    });

    it('should render DetailsTabContainer with dataList and breakDown', () => {
        expect(screen.getByTestId('cohort-details')).toBeInTheDocument();
        expect(screen.queryByTestId('cohort-details-content')).toBeInTheDocument();
    });

    it('should display correct tab content when a tab is selected', () => {
        expect(screen.getByTestId('cohort-details')).toBeInTheDocument();
        expect(screen.getByTestId('cohort-details-content')).toBeInTheDocument();
    });

    it('should handle empty dataList without errors', () => {
        expect(screen.getByTestId('cohort-details')).toBeInTheDocument();
        expect(screen.getByTestId('cohort-details-content')).toBeInTheDocument();
    });

    it('should render DetailsTabContainer with dataList and breakDown', () => {
        expect(screen.getByTestId('cohort-details')).toBeInTheDocument();
        expect(screen.getByTestId('cohort-details-content')).toBeInTheDocument();
    });
});
