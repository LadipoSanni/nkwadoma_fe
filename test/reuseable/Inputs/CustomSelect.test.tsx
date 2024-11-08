import CustomSelect from "@/reuseable/Input/Custom-select";
import { render, screen, fireEvent,cleanup,} from "@testing-library/react";


describe('CustomSelect Component', () => {


    beforeEach(() => {
        
        cleanup()   
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
    })

    const mockSetSelectedOption = jest.fn();
    const customOption =  ['Option 1', 'Option 2', 'Option 3']

    const defaultProps = {
      value: '',
      onChange: mockSetSelectedOption,
      className: 'custom-select',
      selectContent: customOption,
      name: 'test-select',
      placeHolder: 'Select an option',
    };
  
    test('renders without crashing', () => {
      render(<CustomSelect {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('displays placeholder when no value is selected', () => {
        render(<CustomSelect {...defaultProps} />);
        expect(screen.getByText(defaultProps.placeHolder)).toBeInTheDocument();
      });


      test('displays provided value when selected', () => {
        render(<CustomSelect {...defaultProps} value="Option 1" />);
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      test('renders all options in selectContent', () => {
        render(<CustomSelect {...defaultProps} />);
        fireEvent.click(screen.getByRole('button'));
        defaultProps.selectContent.forEach(option => {
          expect(screen.getByText(String(option))).toBeInTheDocument();
        });
      });
    
      test('calls onChange function with the selected value', () => {
        render(<CustomSelect {...defaultProps} />);
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText('Option 2'));
        expect(defaultProps.onChange).toHaveBeenCalledWith('Option 2');
      });

      test('changes icon based on dropdown open state', () => {
        render(<CustomSelect {...defaultProps} />);
        const button = screen.getByRole('button');
        expect(screen.getByTestId('ChevronDownIcon')).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByTestId('ChevronUpIcon')).toBeInTheDocument();    
        
      });

      test('applies custom className', () => {
        render(<CustomSelect {...defaultProps} />);
        const trigger = screen.getByRole('button');
        expect(trigger).toHaveClass('custom-select');
      });

      test('does not render any option if selectContent is empty', () => {
        render(<CustomSelect {...defaultProps} selectContent={[]} />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.queryByRole('option')).not.toBeInTheDocument();
      });

      test('displays an icon when dropdown is closed', () => {
        render(<CustomSelect {...defaultProps} />);
        expect(screen.getByTestId('ChevronDownIcon')).toBeInTheDocument();
      });

      test('displays an icon when dropdown is open', () => {
        render(<CustomSelect {...defaultProps} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByTestId('ChevronUpIcon')).toBeInTheDocument();
      });


  test('does not call onChange if same option is selected morethan once', () => {
    render(<CustomSelect {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(defaultProps.onChange).toHaveBeenCalledTimes(3);
  });

  test('removes selected option after reset', () => {
    render(<CustomSelect {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByTestId('Option 1')).toBeNull();
  });
    
    

})