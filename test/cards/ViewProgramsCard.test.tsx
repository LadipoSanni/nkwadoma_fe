import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import AllProgramsCard from "@/reuseable/cards/AllProgramsList";
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));
import {useRouter} from "next/navigation";

describe('AllProgramsCard Component', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    })
    const props = {
        id: "program-view card",
        title: 'Test Course',
        description: 'This is a very long description meant to test the truncation functionality.',
        trainees: 10,
        months: 6,
        cohorts: 2,
    };

    it('renders the card component correctly', () => {
        render(<AllProgramsCard tagButtonData={[]} dropdownOption={[]} {...props} />);

        expect(screen.getByTestId('allProgramsCard')).toBeInTheDocument();
        expect(screen.getByTestId('title')).toHaveTextContent('Test Course');
        expect(screen.getByTestId('description')).toHaveTextContent('This is a very long description meant to test the truncation functionality.');
    });

    it('truncates the description and shows "...." when too long', () => {
        const longDescription = 'This is a very long description meant to test the truncation functionality...'.repeat(5);

        render(<AllProgramsCard tagButtonData={[]} dropdownOption={[]} {...props} description={longDescription} />);

        expect(screen.getByTestId('description')).toHaveTextContent(longDescription.substring(0, 80));

        expect(screen.getByTestId('readMore')).toBeInTheDocument();
    });

    it('toggles description when "..." is clicked', () => {
        const props = {
            id: "program-view card",
            title: "Test Course",
            description: "This is a very long description meant to test the truncation functionality. This should trigger the read more functionality.",
            trainees: 10,
            months: 6,
            cohorts: 2,
        };

        render(<AllProgramsCard tagButtonData={[]} dropdownOption={[]} {...props} />);

        const readMoreButton = screen.getByTestId('readMore');
        expect(readMoreButton).toBeInTheDocument();

        fireEvent.click(readMoreButton);
    expect(screen.getByTestId('description')).toHaveTextContent('This is a very long description meant to test the truncation functionality. This....');

    });

});


