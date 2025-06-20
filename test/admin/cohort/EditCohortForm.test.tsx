import EditCohortForm from "@/components/cohort/EditCohortForm";
import { render, fireEvent, screen,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Providers } from "@/app/provider";

describe('EditCohort', () => {

    

    afterEach(() => {
        jest.clearAllMocks();
      });
  
      beforeEach(() => {
          
          cleanup()
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      })
      

       const mockSetIsOpen = jest.fn();

  const defaultProps = {
    cohortId: '123',
    setIsOpen: mockSetIsOpen,
  };

  const renderComponent = (props = defaultProps) => render(<Providers><EditCohortForm {...props} /></Providers>);

  // it('renders the form fields correctly', () => {
  //   renderComponent();
  //   expect(screen.getByPlaceholderText(/Enter cohort name/i)).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText(/Enter cohort description/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
  //   expect(screen.getByText(/End Date/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Save/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  // });

  
  // it('renders the form with initial values', () => {
  //   renderComponent()
      
  //   expect(screen.getByPlaceholderText(/Enter cohort name/i)).toHaveValue('Luminary');
  //   expect(screen.getByText('18-12-2023')).toBeInTheDocument();
  //    expect(screen.getByText('24-12-2024')).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText(/Enter cohort description/i)).toHaveValue(
  //     'Luminary is a dynamic cohort of visionary thinkers and creators, pursuing excellence in product design.'
  //   );
   

  //    expect(screen.getByAltText(/Cohort/i)).toBeInTheDocument();
    
  // })


  //  it('shows validation errors for name if required fields are empty', async () => {
  //   renderComponent();

  //   fireEvent.change(screen.getByPlaceholderText(/Enter cohort name/i), { target: { value: '' } });
  //   fireEvent.blur(screen.getByPlaceholderText(/Enter cohort name/i)); 

  //   fireEvent.click(screen.getByText(/Save/i)); 

  //   await waitFor(() => {
  //     expect(screen.getByText(/Cohort name is required/i)).toBeInTheDocument();
  //   });
  // });

  //  it('shows validation errors for cohort description if required fields are empty', async () => {
  //   renderComponent();

  //   fireEvent.change(screen.getByPlaceholderText(/Enter cohort description/i), { target: { value: '' } });
  //   fireEvent.blur(screen.getByPlaceholderText(/Enter cohort description/i)); 

  //   fireEvent.click(screen.getByText(/Save/i)); 

  //   await waitFor(() => {
  //     expect(screen.getByText(/Cohort Description is required/i)).toBeInTheDocument();
  //   });
  // });


  // test('submits form with valid input', async () => {
  //   renderComponent();

  //   fireEvent.change(screen.getByPlaceholderText(/Enter cohort name/i), { 
  //     target: { value: 'Updated Cohort' },
  //   });

  //   fireEvent.click(screen.getByText(/Save/i));

  //   await waitFor(() => {
  //     expect(mockSetIsOpen).toHaveBeenCalledWith(false); 
  //   });

    
    // expect(console.log).toHaveBeenCalledWith(
    //     {
    //   cohortId: '123',
    //   cohortName: 'Updated Cohort',
    //   startDate: '2023-12-18',
    //   endDate: '2024-12-24',
    //   cohortDescription: 'Luminary is a dynamic cohort of visionary thinkers and creators, pursuing excellence in product design.',
    //   cohortImage: 'https://www.thoughtco.com/thmb/gvFwQROKdUKVqquJ7a1t79S1qC4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-10194740-58b885703df78c353cbe18bc.jpg',
    // });
  // });

  // it('deletes the uploaded image', async () => {
  //   renderComponent();

  //   const deleteButton = screen.getByRole('button', { name: /delete/i });

  //   fireEvent.click(deleteButton); 

  //   await waitFor(() => {
  //     expect(screen.queryByAltText(/Cohort/i)).not.toBeInTheDocument();
  //   });

  //   });

    it('calls setIsOpen(false) when cancel button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });


  // it('disables submit button if form is invalid', async () => {
  //   renderComponent();

  //   fireEvent.change(screen.getByPlaceholderText(/Enter cohort name/i), { target: { value: '' } });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Save/i)).toBeDisabled();
  //   });
  // });

  //  it('resetting the form restores initial values', async () => {
  //   renderComponent();

  //   const nameInput = screen.getByPlaceholderText(/Enter cohort name/i);

   
  //   fireEvent.change(nameInput, { target: { value: 'New Cohort Name' } });
  //   fireEvent.click(screen.getByText(/Cancel/i)); 

  //   await waitFor(() => {
  //     expect(nameInput).toHaveValue('Luminary'); 
  //   });
  // });

  //  it('accepts valid date inputs', async () => {
  //   renderComponent();
  //   const startDateInput = screen.getByText('18-12-2023');
  //   fireEvent.change(startDateInput, { target: { value: '2023-12-20' } });
  //   expect(startDateInput).toHaveValue('2023-12-20');
  // });


 
      
  
})