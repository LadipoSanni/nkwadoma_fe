import EditProgramForm from "@/components/program/edit-program-form";
import { render, screen, fireEvent,cleanup, waitFor,} from "@testing-library/react";

describe('EditProgramForm', () => {
    const mockSetIsOpen = jest.fn();
    beforeEach(() => {
      
        cleanup()
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });

      const defaultProps = {
        programId: '12',
        setIsOpen: mockSetIsOpen,
      };

     
     const renderComponent = (props = defaultProps) => render(<EditProgramForm {...props} />);

      test('renders without crashing', () => {
          render(<EditProgramForm programId="1"/>);
          expect(screen.getByText('Program name')).toBeInTheDocument();
        });

     test('calls setIsOpen when cancel button is clicked', () => {
          renderComponent();
          fireEvent.click(screen.getByText('Cancel'));
          expect(mockSetIsOpen).toHaveBeenCalledWith(false);
        });

        it('renders the form fields correctly', () => {
            renderComponent();
            expect(screen.getByPlaceholderText(/Enter program name/i)).toBeInTheDocument();
            expect(screen.getByText(/Program Delivery Type/i)).toBeInTheDocument();
            expect(screen.getByText(/Program mode/i)).toBeInTheDocument();
            expect(screen.getByText(/Program duration/i)).toBeInTheDocument();
            expect(screen.getByText(/Program description/i)).toBeInTheDocument();
           
          });

          it('shows validation errors for name if required fields are empty', async () => {
            renderComponent();
        
            fireEvent.change(screen.getByPlaceholderText(/Enter program name/i), { target: { value: '' } });
            fireEvent.blur(screen.getByPlaceholderText(/Enter program name/i)); 
        
            fireEvent.click(screen.getByText(/Save/i)); 
        
            await waitFor(() => {
              expect(screen.getByText(/program name is required/i)).toBeInTheDocument();
            });
          });

          it('shows validation errors for program description if required fields are empty', async () => {
            renderComponent();
        
            fireEvent.change(screen.getByPlaceholderText(/Enter program description/i), { target: { value: '' } });
            fireEvent.blur(screen.getByPlaceholderText(/Enter program description/i)); 
        
            fireEvent.click(screen.getByText(/Save/i)); 
        
            await waitFor(() => {
              expect(screen.getByText(/Program Description is required/i)).toBeInTheDocument();
            });
          });

          test('submits form with valid input', async () => {
            renderComponent();
        
            fireEvent.change(screen.getByPlaceholderText(/Enter program name/i), { 
              target: { value: 'Software Engineer' },
            });
        
            fireEvent.click(screen.getByText(/Save/i));
        
            await waitFor(() => {
              expect(mockSetIsOpen).toHaveBeenCalledWith(false); 
            });
        
        });

        it('calls setIsOpen(false) when cancel button is clicked', () => {
            renderComponent();
        
            fireEvent.click(screen.getByText(/Cancel/i));
        
            expect(mockSetIsOpen).toHaveBeenCalledWith(false);
          });


          it('disables submit button if form is invalid', async () => {
            renderComponent();
        
            fireEvent.change(screen.getByPlaceholderText(/Enter program name/i), { target: { value: '' } });
        
            await waitFor(() => {
              expect(screen.getByText(/Save/i)).toBeDisabled();
            });
          });


     
})