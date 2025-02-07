import { render, screen} from "@testing-library/react";
// import Cohort from "@/features/cohort/cohort-view";
// import { Providers } from '@/app/provider';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  ;
// import { useRouter } from 'next/navigation';



describe('Cohort', () => {
    test("test", ()=> {
        render(
            <div data-testid={'testing'}></div>
        )
        screen.getByTestId('testing')
    })
    // const mockPush = jest.fn();
    //
    //
    // beforeEach(() => {
    //     jest.clearAllMocks();
    //     cleanup();
    //
    //     (useRouter as jest.Mock).mockReturnValue({
    //         push: mockPush,
    //       });
    // })
    //
    //
    // it('renders the form correctly', () => {
    //     render(
    //       <Providers>
    //         <Cohort />
    //       </Providers>
    //
    //   )
    // })
    //
    // it('renders the cohort title', () => {
    //     render(
    //       <Providers>
    //       <Cohort />
    //     </Providers>
    //   );
    //
    //     expect(screen.getAllByText(/cohort/i)[0]).toBeInTheDocument();
    //   });
    //
    //
    //   it('renders the search input', () => {
    //     render(
    //       <Providers>
    //       <Cohort />
    //     </Providers>
    //   );
    //     expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    //   });
    //
    //
    //   it('renders the Filter button', () => {
    //     render( <Providers>
    //       <Cohort />
    //     </Providers>
    //   );
    //     expect(screen.getByRole('button', { name: /Program/i })).toBeInTheDocument();
    //   });
    //
    //
    //   // test('allows user to type in the search input field', () => {
    //   //   render( <Providers>
    //   //     <Cohort />
    //   //   </Providers>
    //   // );
    //
    //   //   const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    //
    //   //   fireEvent.change(searchInput, { target: { value: 'Design Thinking' } });
    //
    //   //   expect(searchInput.value).toBe('Design Thinking');
    //   // });
    //
    //
    //   test('renders the Create Cohort button', () => {
    //     render( <Providers>
    //       <Cohort />
    //     </Providers>
    //   );
    //
    //
    //     const createCohortButton = screen.getByRole('button', { name: /create cohort/i });
    //     expect(createCohortButton).toBeInTheDocument();
    //   });
    //
    
     

})