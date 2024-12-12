import { render, screen, fireEvent,cleanup,} from "@testing-library/react";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";


describe('CurrencySelectInput', () => {
    const mockSetSelectedCurrency = jest.fn();
  
    const renderComponent = (selectedcurrency = 'NGN') => {
      render(
        <CurrencySelectInput 
          selectedcurrency={selectedcurrency}
          setSelectedCurrency={mockSetSelectedCurrency}
        />
      );
    };
  
    beforeEach(() => {
      mockSetSelectedCurrency.mockClear();
      cleanup()
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
    });

    test('renders without crashing', () => {
        renderComponent();
        expect(screen.getByTestId('Select Currency')).toBeInTheDocument();
      });
    

  test('displays the correct initial currency', () => {
    renderComponent('USD');
    expect(screen.getByText('USD')).toBeInTheDocument();
  });


  test('displays NGN as default currency if none is provided', () => {
    renderComponent();
    expect(screen.getByText('NGN')).toBeInTheDocument();
  });

  test('renders dropdown icon as ChevronDown by default', () => {
    renderComponent();
    expect(screen.getByRole('button')).toContainHTML('<svg');
  });
    
  test('opens dropdown when SelectTrigger is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('USD')).toBeInTheDocument();
  });


test('applies custom className if provided', () => {
    render(
      <CurrencySelectInput 
        selectedcurrency="USD" 
        setSelectedCurrency={mockSetSelectedCurrency} 
        className="h-10"
      />
    );
    expect(screen.getByRole('button')).toHaveClass('h-10');
  });


  test('displays selected currency after selection', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('GBP')).toBeInTheDocument();
  });
   

  test('does not display any currency if none selected initially', () => {
    render(<CurrencySelectInput selectedcurrency="" setSelectedCurrency={mockSetSelectedCurrency} />);
    expect(screen.queryByText('NGN')).not.toBeInTheDocument();
  });
   

  test('dropdown has correct zIndex style', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toHaveStyle('z-index: 1000');
  });

  test('does not render dropdown items initially', () => {
    renderComponent();
    expect(screen.queryByText('USD')).not.toBeInTheDocument();
  });

  test('renders SelectTrigger button with correct styling', () => {
    renderComponent();
    const button = screen.getByRole('button');
    expect(button).toHaveClass('md:w-0 min-w-20 h-[3.2rem]');
  });

  




})