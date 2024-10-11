import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AllProgramsCard from "@/reuseable/cards/Index";

const mockMenu = (
    <Menu open={true}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
    </Menu>
);

describe('AllProgramsCard Component', () => {
    const props = {
        title: 'Test Course',
        description: 'This is a very long description meant to test the truncation functionality.',
        trainees: 10,
        months: 6,
        cohorts: 2,
        menu: mockMenu,
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

    it('toggles description when "Read More" is clicked', () => {
        const props = {
            title: "Test Course",
            description: "This is a very long description meant to test the truncation functionality. This should trigger the read more functionality.",
            trainees: 10,
            months: 6,
            cohorts: 2,
            menu: <div>Mock menu</div>,
        };

        render(<AllProgramsCard {...props} />);

        const readMoreButton = screen.getByTestId('readMore');
        expect(readMoreButton).toBeInTheDocument();

        fireEvent.click(readMoreButton);
        expect(screen.getByText('.....')).toBeInTheDocument();
    });


    it('displays menu when MoreVertIcon is clicked', () => {
        render(<AllProgramsCard {...props} />);

        fireEvent.click(screen.getByTestId('menuIcon'));
        expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
});
