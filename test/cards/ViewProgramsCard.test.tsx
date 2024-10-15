import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AllProgramsCard from "@/reuseable/cards/AllProgramsList";

describe('AllProgramsCard Component', () => {
    const props = {
        title: 'Test Course',
        description: 'This is a very long description meant to test the truncation functionality.',
        trainees: 10,
        months: 6,
        cohorts: 2,
    };

    it('renders the card component correctly', () => {
        render(<AllProgramsCard {...props} />);

        expect(screen.getByTestId('allProgramsCard')).toBeInTheDocument();
        expect(screen.getByTestId('title')).toHaveTextContent('Test Course');
        expect(screen.getByTestId('description')).toHaveTextContent('This is a very long description meant to test the truncation functionality.');
        expect(screen.getByTestId('trainees')).toHaveTextContent('10 trainees');
        expect(screen.getByTestId('months')).toHaveTextContent('6 months');
        expect(screen.getByTestId('cohorts')).toHaveTextContent('2 cohorts');
    });

    it('truncates the description and shows "...." when too long', () => {
        const longDescription = 'This is a very long description meant to test the truncation functionality...'.repeat(5);

        render(<AllProgramsCard {...props} description={longDescription} />);

        expect(screen.getByTestId('description')).toHaveTextContent(longDescription.substring(0, 80));

        expect(screen.getByTestId('readMore')).toBeInTheDocument();
    });

    it('toggles description when "..." is clicked', () => {
        const props = {
            title: "Test Course",
            description: "This is a very long description meant to test the truncation functionality. This should trigger the read more functionality.",
            trainees: 10,
            months: 6,
            cohorts: 2,
        };

        render(<AllProgramsCard {...props} />);

        const readMoreButton = screen.getByTestId('readMore');
        expect(readMoreButton).toBeInTheDocument();

        fireEvent.click(readMoreButton);
        // expect(screen.getByText('.....')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toHaveTextContent('This is a very long description meant to test the truncation functionality. This should trigger the read more functionality.');

    });

    //
    // it('displays menu when MoreVertIcon is clicked', () => {
    //     render(<AllProgramsCard {...props} />);
    //
    //     fireEvent.click(screen.getByTestId('menuIcon'));
    //     expect(screen.getByText('Option 1')).toBeInTheDocument();
    // });
});


