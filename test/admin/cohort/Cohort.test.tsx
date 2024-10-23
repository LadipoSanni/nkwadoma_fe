import { render, screen, fireEvent,cleanup,waitFor} from "@testing-library/react";
import Cohort from "@/pages/traineeInstitute/cohort/cohortView";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  ;
import { useRouter } from 'next/navigation';



describe('Cohort', () => {
    const mockPush = jest.fn();


    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
    })


    it('renders the form correctly', () => {
        render(<Cohort />)
    })

    it('renders the cohort title', () => {
        render(<Cohort />)
        expect(screen.getAllByText(/cohort/i)[0]).toBeInTheDocument();
      });

    
      it('renders the search input', () => {
        render(<Cohort />)
        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
      });


      it('renders the Filter button', () => {
        render(<Cohort />)
        expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
      });

      
      test('allows user to type in the search input field', () => {
        render(<Cohort />);
    
        const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement; 
    
        fireEvent.change(searchInput, { target: { value: 'Design Thinking' } });
        
        expect(searchInput.value).toBe('Design Thinking');
      });


      test('renders the Create Cohort button', () => {
        render(<Cohort />);
        
      
        const createCohortButton = screen.getByRole('button', { name: /create cohort/i });
        expect(createCohortButton).toBeInTheDocument();
      });
    
    
     

})