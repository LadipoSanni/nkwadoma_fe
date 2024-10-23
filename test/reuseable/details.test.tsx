import { render, screen, fireEvent } from '@testing-library/react';
import Details from "@/reuseable/details/Details";
import {userEvent} from "@testing-library/user-event";

const mockProps = {
    imageSrc: '/cohort-image.jpg',
    cohortTitle: 'Cohort 2024',
    cohortDescription: 'This is a description of the cohort.',
    traineesCount: 20,
    dropoutsCount: 2,
    dataList: [
        { label: 'Start Date', value: 'January 2024' },
        { label: 'Duration', value: '6 months' },
    ],
    breakDown: [
        { title: 'Tuition', amount: '$1000' },
        { title: 'Materials', amount: '$200' },
    ],
};
describe("render details reusable component", ()=>{
    it("should test that details component exist ", ()=>{
        const {queryByTestId} = render(
            <Details {...mockProps}/>
        )
        const details = queryByTestId('details-main');
        expect(details).toBeInTheDocument();
    });

    it('renders two sections on the page', () => {
        render(<Details {...mockProps} />);

        const imageSection = screen.getByTestId('cohort-image-section');
        expect(imageSection).toBeInTheDocument();

        const detailsSection = screen.getByTestId('cohort-details');
        expect(detailsSection).toBeInTheDocument();
    });

    it('renders the image section with two subsections', () => {
        render(<Details {...mockProps} />);

        const imageSection = screen.getByTestId('cohort-image-section');
        expect(imageSection).toBeInTheDocument();

        const imageCard = screen.getByTestId('cohort-image-card');
        const traineesInfo = screen.getByTestId('cohort-info');

        expect(imageCard).toBeInTheDocument();
        expect(traineesInfo).toBeInTheDocument();
    });

    it("renders the cohort details tab", ()=>{
        render(<Details {...mockProps} />);
        const tabs = screen.getByTestId('cohort-tabs');
        expect(tabs).toBeInTheDocument();

        const cohortTab = screen.getByTestId(`cohort-details-tab`);
        const traineeTab = screen.getByTestId(`trainees-tab`);

        expect(cohortTab).toBeInTheDocument();
        expect(traineeTab).toBeInTheDocument();
    });

    it('renders the dataList items correctly', () => {
        render(<Details {...mockProps} />);

        mockProps.dataList.forEach(item => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
            expect(screen.getByText(item.value)).toBeInTheDocument();
        });
    });

    it('renders the cohort title, description, and stats', () => {
        render(<Details {...mockProps} />);

        expect(screen.getByText('Cohort 2024')).toBeInTheDocument();

        expect(screen.getByText('This is a description of the cohort.')).toBeInTheDocument();

        expect(screen.getByText('20 trainees')).toBeInTheDocument();
        expect(screen.getByText('2 dropouts')).toBeInTheDocument();
    });

    it('should toggle tuition breakdown content on button click', () => {
        render(<Details {...mockProps}  />);

        const triggerButton = screen.getByTestId('tuition-breakdown-trigger');
        expect(triggerButton).toBeInTheDocument();

        const tuitionBreakdownContent = screen.queryByTestId('tuition-breakdown-content');
        expect(tuitionBreakdownContent).toBeInTheDocument();

        fireEvent.click(triggerButton);

        expect(screen.getByTestId('tuition-breakdown-content')).toBeInTheDocument();

        fireEvent.click(triggerButton);

        expect(screen.queryByTestId('tuition-breakdown-content')).toBeInTheDocument();
    });

    it('should render two tabs and display content based on the selected tab', () => {
        render(<Details {...mockProps} />);

        const cohortDetailsTab = screen.getByTestId('cohort-details-tab');
        const traineesTab = screen.getByTestId('trainees-tab');

        expect(cohortDetailsTab).toBeInTheDocument();
        expect(traineesTab).toBeInTheDocument();

        const cohortDetailsContent = screen.getByTestId('cohort-details-content');
        expect(cohortDetailsContent).toBeInTheDocument();

        const traineeContent = screen.queryByTestId('trainee-content');
        expect(traineeContent).toBeInTheDocument();

        userEvent.click(traineesTab);

        expect(screen.getByTestId('trainee-content')).toBeInTheDocument();
        expect(screen.queryByTestId('cohort-details-content')).toBeInTheDocument();
    });
});
