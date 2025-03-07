import { cleanup, screen, render,fireEvent} from "@testing-library/react";
import FinancierSelectType from "@/components/portfolio-manager/fund/financier/financier-select-type";
import { useRouter } from 'next/navigation';


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

  describe("Financier select type", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
          cleanup();
  
          (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
          jest.spyOn(console, 'log').mockReturnValue();
          jest.spyOn(console, 'warn').mockReturnValue();
          jest.spyOn(console, 'error').mockReturnValue();
      })

      const mockHandleCloseModal = jest.fn();
      const mockHandleContinue = jest.fn();
      const mockSetFieldValue = jest.fn();
    
      const setup = (financierType = '') => {
        render(
          <FinancierSelectType
            financierType={financierType}
            handleCloseModal={mockHandleCloseModal}
            handleContinue={mockHandleContinue}
            setFieldValue={mockSetFieldValue}
          />
        );
      };
    
    
      test('Renders without crashing', () => {
        setup();
        expect(screen.getByText('Select the type of financier you want to invite')).toBeInTheDocument();
      });

      test('Displays individual financier option correctly', () => {
        setup();
        expect(screen.getByLabelText('Individual')).toBeInTheDocument();
      });

      test('Displays company financier option correctly', () => {
        setup();
        expect(screen.getByLabelText('Company')).toBeInTheDocument();
      });

      test('Handles individual option selection correctly', () => {
        setup();
        const individualOption = screen.getByLabelText('Individual');
        fireEvent.click(individualOption);
        expect(mockSetFieldValue).toHaveBeenCalledWith('financierType', 'Individual');
      });

      test('Handles company option selection correctly', () => {
        setup();
        const companyOption = screen.getByLabelText('Company');
        fireEvent.click(companyOption);
        expect(mockSetFieldValue).toHaveBeenCalledWith('financierType', 'Company');
      });

      test('Calls setFieldValue with "Individual" when individual option is selected', () => {
        setup();
        const individualOption = screen.getByLabelText('Individual');
        fireEvent.click(individualOption);
        expect(mockSetFieldValue).toHaveBeenCalledWith('financierType', 'Individual');
      });

      test('Calls setFieldValue with "Company" when company option is selected', () => {
        setup();
        const companyOption = screen.getByLabelText('Company');
        fireEvent.click(companyOption);
        expect(mockSetFieldValue).toHaveBeenCalledWith('financierType', 'Company');
      });

      test('Marks individual option as checked when financierType is "Individual"', () => {
        setup('Individual');
        const individualOption = screen.getByLabelText('Individual') as HTMLInputElement;
        expect(individualOption.checked).toBe(true);
      });
    
      test('Marks company option as checked when financierType is "Company"', () => {
        setup('Company');
        const companyOption = screen.getByLabelText('Company') as HTMLInputElement;
        expect(companyOption.checked).toBe(true);
      });

      test('Correctly styles individual option when selected', () => {
        setup('Individual');
        expect(screen.getByLabelText('Individual').closest('div')).toHaveClass('bg-[#F9F9F9]');
      });
    
      test('Correctly styles company option when selected', () => {
        setup('Company');
        expect(screen.getByLabelText('Company').closest('div')).toHaveClass('bg-[#F9F9F9]');
      });

      test('Calls handleCloseModal when cancel button is clicked', () => {
        setup();
        const cancelButton = screen.getByText('Cancel'); 
        fireEvent.click(cancelButton);
        expect(mockHandleCloseModal).toHaveBeenCalled();
      });
    
      test('Calls handleContinue when continue button is clicked', () => {
        setup('Individual');
        const continueButton = screen.getByText('Continue'); 
        fireEvent.click(continueButton);
        expect(mockHandleContinue).toHaveBeenCalled();
      });

      test('Disables continue button when no financier type is selected', () => {
        setup();
        const continueButton = screen.getByText('Continue'); 
        expect(continueButton).toBeDisabled();
      });
    
      test('Enables continue button when financier type is selected', () => {
        setup('Individual');
        const continueButton = screen.getByText('Continue'); 
        expect(continueButton).not.toBeDisabled();
      });

      test('Handles mouse click correctly for individual option', () => {
        setup();
        const individualOption = screen.getByLabelText('Individual');
        fireEvent.click(individualOption);
        expect(mockSetFieldValue).toHaveBeenCalledWith('financierType', 'Individual');
      });
    
      test('Handles mouse click correctly for company option', () => {
        setup();
        const companyOption = screen.getByLabelText('Company');
        fireEvent.click(companyOption);
        expect(mockSetFieldValue).toHaveBeenCalledWith('financierType', 'Company');
      });
    
    })




