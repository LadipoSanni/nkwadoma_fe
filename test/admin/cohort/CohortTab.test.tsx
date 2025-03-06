import { render, screen, fireEvent,cleanup,} from "@testing-library/react";
import CohortTabs from "@/components/cohort/CohortTabs";
import { Providers } from "@/app/provider";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

import { useRouter } from 'next/navigation';




describe("CohortTabs", () => {
  const mockPush = jest.fn();

  
    beforeEach(() => {
      jest.clearAllMocks();
        cleanup();

        (useRouter as jest.Mock).mockReturnValue({
          push: mockPush,
        });
    })

    const mockCohorts = [ {
       id: '1', name: 'Cohort 1', cohortDescriptions: 'Description 1', startDate: '2024-01-01', expectedEndDate: '2024-12-31', totalCohortFee: 1000, imageUrl: '', cohortStatus: 'CURRENT', tuitionAmount: 500, programId: "13",numberOfLoanees:4}, 
       { id: '2', name: 'Cohort 2', cohortDescriptions: 'Description 2', startDate: '2024-01-01', expectedEndDate: '2024-12-31', totalCohortFee: 2000, imageUrl: '', cohortStatus: 'INCOMING', tuitionAmount: 1000,programId: "17",numberOfLoanees:4 }, 
       { id: '3', name: 'Cohort 3', cohortDescriptions: 'Description 3', startDate: '2024-01-01', expectedEndDate: '2024-12-31', totalCohortFee: 3000, imageUrl: '', cohortStatus: 'GRADUATED', tuitionAmount: 1500, programId: "18",numberOfLoanees:7}, 
      ];

   

   

   


      it('should change tab content when switching tabs', () => {
        render(<Providers>
          <CohortTabs listOfCohorts={mockCohorts}/>
       </Providers>);
    
        fireEvent.click(screen.getByText('Graduated')); 
        expect(screen.getByText('No. of Loanees')).toBeInTheDocument();
      });

     

 
  it("should maintain active tab state between switches", () => {
    render(<Providers>
      <CohortTabs listOfCohorts={mockCohorts}/>
   </Providers>);

    fireEvent.click(screen.getByText("Current"));
    expect(screen.getByText("No. of Loanees")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Graduated"));
    expect(screen.getByText("No. of Loanees")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Current"));
    expect(screen.getByText("No. of Loanees")).toBeInTheDocument();
  });

  

  it("should not display dropdown options by default", () => {
    render(<Providers>
      <CohortTabs listOfCohorts={mockCohorts}/>
   </Providers>);
    expect(screen.queryByText("View Program")).not.toBeInTheDocument();
  });

  it('selects the Incoming tab by default', () => {
    render(<Providers>
      <CohortTabs listOfCohorts={mockCohorts}/>
   </Providers>);
    const defaultTab = screen.getByTestId('tabNameincoming');
    expect(defaultTab).toHaveClass('data-[state=active]:text-foreground'); 
    expect(defaultTab).toBeInTheDocument();

  });


  it('switches to the Current tab on click', () => {
    render(<Providers>
      <CohortTabs listOfCohorts={mockCohorts}/>
   </Providers>);
    fireEvent.click(screen.getByText(/current/i));
    expect(screen.getByTestId('tabNamecurrent')).toHaveClass('data-[state=active]:text-foreground');
  });


  it('displays the correct content for each tab', () => {
    render(
      <Providers>
         <CohortTabs listOfCohorts={mockCohorts}/>
      </Providers>
   );
    fireEvent.click(screen.getByText(/current/i));
    expect(screen.getByText(/no. of Loanees/i)).toBeInTheDocument(); 
  });





it('renders all headers in the table', () => {
  render(<Providers>
    <CohortTabs listOfCohorts={mockCohorts}/>
 </Providers>);
  expect(screen.getAllByText(/cohort/i)[0]).toBeInTheDocument();
  expect(screen.getAllByText(/end date/i)[0]).toBeInTheDocument();
});



  it('renders with correct CSS classes', () => {
    render(<Providers>
      <CohortTabs listOfCohorts={mockCohorts}/>
   </Providers>);
    const tabTrigger = screen.getByTestId('tabNameincoming');
    expect(tabTrigger).toHaveClass('inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1');
  });

  it('sets the static column to cohort', () => {
    render(<Providers>
      <CohortTabs listOfCohorts={mockCohorts}/>
   </Providers>);
    expect(screen.getAllByText(/cohort/i)[0]).toBeInTheDocument();
  });


  it('sets the correct defaultValue for Tabs', () => {
    render(<Providers>
      <CohortTabs listOfCohorts={mockCohorts}/>
   </Providers>);
    expect(screen.getByTestId('tabNameincoming')).toHaveClass('data-[state=active]:text-foreground');
  });

  // it('matches the previous snapshot', () => {
  //   const { asFragment } = render(<CohortTabs />);
  //   expect(asFragment()).toMatchSnapshot();
  // });




    

})