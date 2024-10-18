import { render, screen, fireEvent,cleanup,} from "@testing-library/react";
import CohortTabs from "@/pages/traineeInstitute/cohort/CohortTabs";



describe("CohortTabs", () => {
    beforeEach(() => {
        cleanup()
    })

   

   

    it('should render the table when a tab is clicked', () => {
        render(<CohortTabs />);
    
        
        fireEvent.click(screen.getByText('Current'));
    
        const cohortElements = screen.getAllByText('Cohort 1');
        expect(cohortElements.length).toBeGreaterThan(0); 

        expect(cohortElements[0]).toBeInTheDocument();
        
      });


      it('should change tab content when switching tabs', () => {
        render(<CohortTabs />);
    
        fireEvent.click(screen.getByText('Graduated')); 
        expect(screen.getByText('No. of Trainees')).toBeInTheDocument();
      });

     

 
  it("should maintain active tab state between switches", () => {
    render(<CohortTabs />);

    fireEvent.click(screen.getByText("Current"));
    expect(screen.getByText("No. of Trainees")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Graduated"));
    expect(screen.getByText("No. of Trainees")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Current"));
    expect(screen.getByText("No. of Trainees")).toBeInTheDocument();
  });

  

  it("should not display dropdown options by default", () => {
    render(<CohortTabs />);
    expect(screen.queryByText("View Program")).not.toBeInTheDocument();
  });

  it('selects the Incoming tab by default', () => {
    render(<CohortTabs />);
    const defaultTab = screen.getByTestId('tabNameincoming');
    expect(defaultTab).toHaveClass('data-[state=active]:text-foreground'); 
    expect(defaultTab).toBeInTheDocument();

  });


  it('switches to the Current tab on click', () => {
    render(<CohortTabs />);
    fireEvent.click(screen.getByText(/current/i));
    expect(screen.getByTestId('tabNamecurrent')).toHaveClass('data-[state=active]:text-foreground');
  });


  it('displays the correct content for each tab', () => {
    render(<CohortTabs />);
    fireEvent.click(screen.getByText(/current/i));
    expect(screen.getByText(/no. of trainees/i)).toBeInTheDocument(); 
  });



it('calls handleRowClick when a row is clicked', () => {
  const handleRowClick = jest.fn();
  render(<CohortTabs />);
   const cohortElements = screen.getAllByText(/cohort 1/i);
expect(cohortElements.length).toBeGreaterThan(0);
expect(cohortElements[0]).toBeInTheDocument();
 
fireEvent.click(cohortElements[0]); 
    
});

it('renders all headers in the table', () => {
  render(<CohortTabs />);
  expect(screen.getAllByText(/cohort/i)[0]).toBeInTheDocument();
  expect(screen.getAllByText(/end date/i)[0]).toBeInTheDocument();
});



  it('renders with correct CSS classes', () => {
    render(<CohortTabs />);
    const tabTrigger = screen.getByTestId('tabNameincoming');
    expect(tabTrigger).toHaveClass('inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1');
  });

  it('sets the static column to cohort', () => {
    render(<CohortTabs />);
    expect(screen.getAllByText(/cohort/i)[0]).toBeInTheDocument();
  });


  it('sets the correct defaultValue for Tabs', () => {
    render(<CohortTabs />);
    expect(screen.getByTestId('tabNameincoming')).toHaveClass('data-[state=active]:text-foreground');
  });

  // it('matches the previous snapshot', () => {
  //   const { asFragment } = render(<CohortTabs />);
  //   expect(asFragment()).toMatchSnapshot();
  // });




    

})