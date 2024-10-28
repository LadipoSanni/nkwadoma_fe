import {cleanup, render, screen} from '@testing-library/react';
import DetailsImageSection from "@/reuseable/details/DetailsImageSection";
import React from "react";
import { CiLaptop } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import {userEvent} from "@testing-library/user-event";

jest.mock('../../public/asset/Image/CohortDetailsImage.png', () => ({
    default: { src: '/cohort-image.jpg' }
}));

const mockProps = {
    imageSrc: '/cohort-image.jpg',
    cohortTitle: 'Cohort 2024',
    cohortDescription: 'This is a description of the cohort.',
    dataList: [
        { label: 'Start Date', value: 'January 2024' },
        { label: 'Duration', value: '6 months' },
    ],
    breakDown: [
        { title: 'Tuition', amount: '$1000' },
        { title: 'Materials', amount: '$200' },
    ],
    goBackText: 'Go Back',
};

const program1Options = [
    { name: 'Edit Cohort', id: '1' },
    { name: 'Delete Cohort', id: '3' }
];

const tagButtonData = [
    { tagIcon: CiLaptop, tagCount: 10, tagButtonStyle: "bg-lightBlue100", tagText: "trainees" },
    { tagIcon: MdOutlinePerson, tagCount: 50, tagButtonStyle: "bg-warning50", tagText: "cohorts" },
];

const handleBackClick = jest.fn();
const handleDeleteClick = jest.fn();

describe("DetailsImageSection Component and that it exist", () => {
    beforeEach(() => {
        cleanup();
        jest.spyOn(console,'log').mockReturnValue();
        jest.spyOn(console,'warn').mockReturnValue();
        jest.spyOn(console,'error').mockReturnValue();

        const {queryByTestId}=render(
            <DetailsImageSection
                imageSrc={mockProps.imageSrc}
                cohortTitle={mockProps.cohortTitle}
                cohortDescription={mockProps.cohortDescription}
                goBackText={mockProps.goBackText}
                handleBackClick={handleBackClick}
                dropdownOption={program1Options}
                handleDeleteClick={handleDeleteClick}
                useProgramButton={false}
                tagButtonData={tagButtonData}
            />
        );
        const assert = queryByTestId("details-main");
        expect(assert).toBeInTheDocument();
    });

    it("renders main container", () => {
        const detailsMain = screen.getByTestId("details-main");
        expect(detailsMain).toBeInTheDocument();
    });

    it("should test that arrowBack routes to the previous page", async () => {
        const check = screen.getByTestId("backClick");

        expect(handleBackClick).not.toHaveBeenCalled();

        await userEvent.click(check);

        expect(handleBackClick).toHaveBeenCalled();
        expect(handleBackClick).toHaveBeenCalledTimes(1);
    });

    it("should test that detailsImageSection component renders image correctly", ()=>{
        const check = screen.getByTestId("cohort-image-card");
        expect(check).toBeInTheDocument();
    });

    it("renders the cohort image when imageSrc is provided", () => {
        const cohortImage = screen.getByTestId("cohort-image-card");
        expect(cohortImage).toBeInTheDocument();
    });

    it("renders cohort title and description", () => {
        const cohortTitle = screen.getByTestId("cohort-title");
        const cohortDescription = screen.getByTestId("cohort-description");

        expect(cohortTitle).toHaveTextContent(mockProps.cohortTitle);
        expect(cohortDescription).toHaveTextContent(mockProps.cohortDescription);
    });
});


