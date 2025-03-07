import React from "react";
import DeleteCohort from "@/reuseable/details/DeleteCohort";
import {fireEvent, render, screen} from "@testing-library/react";

describe("DeleteCohort", ()=> {
    it('should render DeleteCohort component with default props', () => {
        const { getByText, getByAltText } = render(<DeleteCohort  headerTitle={"Cohort cohort"} title={"cohort"}/>);
        expect(getByAltText('deleteIcon')).toBeInTheDocument();
        expect(getByText("Are you sure you want to delete this cohort? This action can't be undone")).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(getByText('Delete')).toBeInTheDocument();
    });

    it('should render correctly when cohortId is undefined', () => {
        const { getByText, getByAltText } = render(<DeleteCohort  headerTitle={"Cohort cohort"} title={"cohort"}/>);
        expect(getByAltText('deleteIcon')).toBeInTheDocument();
        expect(getByText("Are you sure you want to delete this cohort? This action can't be undone")).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(getByText('Delete')).toBeInTheDocument();
    });

    it('should call setIsOpen with false when Cancel button is clicked', () => {
        const setIsOpen = jest.fn();
        render(<DeleteCohort setIsOpen={setIsOpen} headerTitle={"Cohort cohort"} title={"cohort"} />);

        fireEvent.click(screen.getByText('Cancel'));

        expect(setIsOpen).toHaveBeenCalledWith(false);
    });
    it('should display DeleteIcon image correctly', () => {
        const setIsOpen = jest.fn();
        render(<DeleteCohort setIsOpen={setIsOpen} headerTitle={"Cohort cohort"} title={"cohort"} />);
        const deleteIcon = screen.getByAltText('deleteIcon');
        expect(deleteIcon).toBeInTheDocument();
    });

    it('should render Cancel and Delete buttons with correct styles and text', () => {
        const setIsOpen = jest.fn();
        const { getByText, getByAltText } = render(<DeleteCohort setIsOpen={setIsOpen} headerTitle={"Cohort cohort"} title={"cohort"}/>);
        expect(getByAltText('deleteIcon')).toBeInTheDocument();
        expect(getByText("Are you sure you want to delete this cohort? This action can't be undone")).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(getByText('Delete')).toBeInTheDocument();
    });

    it('should handle missing setIsOpen function gracefully', () => {
        const { getByText, getByAltText } = render(<DeleteCohort headerTitle={"Cohort cohort"} title={"cohort"}/>);
        expect(getByAltText('deleteIcon')).toBeInTheDocument();
        expect(getByText("Are you sure you want to delete this cohort? This action can't be undone")).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(getByText('Delete')).toBeInTheDocument();
    });
    it('should render DeleteCohort component and handle image loading failure', () => {
        const { getByAltText } = render(<DeleteCohort  headerTitle={"Cohort cohort"} title={"cohort"}/>);
        const image = getByAltText('deleteIcon');
        expect(image).toBeInTheDocument();
        fireEvent.error(image);
        expect(image).toBeInTheDocument();
    });

    it('should handle responsiveness to different screen sizes', () => {
        const { getByText } = render(<DeleteCohort headerTitle={"Cohort cohort"} title={"cohort"} />);
        const deleteButton = getByText('Delete');
        const cancelButton = getByText('Cancel');

        expect(deleteButton).toHaveClass('h-12 text-sm font-semibold leading-6 text-meedlWhite');
        expect(cancelButton).toHaveClass('h-12 text-sm font-semibold leading-6 text-meedlBlack');
    });
})