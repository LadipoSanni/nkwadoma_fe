import { cleanup, screen, render,fireEvent, waitFor} from "@testing-library/react";
import FiinancierStep from "@/components/portfolio-manager/fund/financier/financiers-step";
import { Formik,Form } from 'formik';



describe("Invite financier", () => {
    const mockHandleBack = jest.fn();
  const mockSetFieldValue = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks();
          cleanup();
  
          jest.spyOn(console, 'log').mockReturnValue();
          jest.spyOn(console, 'warn').mockReturnValue();
          jest.spyOn(console, 'error').mockReturnValue();
      })

      const errors = {
        firstName: '',
        lastName: '',
        email: '',
        companyName: ''
      };
      const touched = {
        firstName: false,
        lastName: false,
        email: false,
        companyName: false
      };

      const mockSetIsOpen = jest.fn();

      const setup = (props = {}) => {
        render(
          <FiinancierStep
            setIsOpen={mockSetIsOpen}
            investmentId="test-id"
            {...props}
          />
        );
      };


      test('Renders without crashing', () => {
        setup();
        expect(screen.getByText('Select the type of financier you want to invite')).toBeInTheDocument();
      });
    
      test('Displays FinancierSelectType component initially', () => {
        setup();
        expect(screen.getByText('Select the type of financier you want to invite')).toBeInTheDocument();
      });

      test('Handles close modal correctly from step 1', () => {
    setup();
    fireEvent.click(screen.getByText('Cancel')); 
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  test('Handles close modal correctly from step 2', () => {
    setup();
    fireEvent.click(screen.getByText('Continue')); 
    fireEvent.click(screen.getByText('Cancel')); 
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

    
  
    
    
    })
