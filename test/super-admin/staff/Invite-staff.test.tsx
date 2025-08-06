import { render, screen, fireEvent,cleanup,waitFor} from "@testing-library/react";
import InviteStaff from "@/components/super-admin/staff/Invite-staff";
import { Providers } from "@/app/provider";
import { useToast } from '@/hooks/use-toast';

jest.mock('@/hooks/use-toast');
jest.mock('@/reuseable/Input/Custom-select-obj', () => ({
  __esModule: true,
  default: jest.fn(({ onChange, value, testId }) => (
    <select 
      data-testid={testId || "mock-custom-select"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select a role</option>
      <option value="ADMIN">Admin</option>
      <option value="PORTFOLIO_MANAGER">Portfolio manager</option>
      <option value="ASSOCIATE">Associate</option>
    </select>
  ))
}));

describe('InviteStaff Component', () => {
    const mockSetIsOpen = jest.fn();
    const mockToast = jest.fn()

    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue();
        jest.spyOn(console,'warn').mockReturnValue();
        jest.spyOn(console,'error').mockReturnValue();

        (useToast as jest.Mock).mockReturnValue({
            toast: mockToast
          });

          
        
    })


    afterEach(() => {
        jest.clearAllMocks();
      });

    it('renders the form component', () => {
        render(<InviteStaff setIsOpen={mockSetIsOpen} />);
        expect(screen.getByTestId('staffNameTestId')).toBeInTheDocument();
      });

      it('renders all required form fields', () => {
        render(<InviteStaff setIsOpen={mockSetIsOpen} />);
        expect(screen.getByTestId('staffNameTestId')).toBeInTheDocument();
        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByTestId('roleTestId')).toBeInTheDocument();
      });

      it('shows validation errors when required fields are empty', async () => {
        render(<InviteStaff setIsOpen={mockSetIsOpen} />);
        
        fireEvent.blur(screen.getByTestId('staffNameTestId'));
        fireEvent.blur(screen.getByTestId('emailTestId'));
        fireEvent.blur(screen.getByTestId('roleTestId'));
    
        await waitFor(() => {
          expect(screen.getByText('Name is required')).toBeInTheDocument();
          expect(screen.getByText('Email address is required')).toBeInTheDocument();
        });
      });

      it('submits the form with valid data', async () => {
        render(<InviteStaff setIsOpen={mockSetIsOpen} />);
        
        fireEvent.change(screen.getByTestId('staffNameTestId'), { 
          target: { value: 'John Doe' } 
        });
        fireEvent.change(screen.getByTestId('emailTestId'), { 
          target: { value: 'john@example.com' } 
        });
        fireEvent.change(screen.getByTestId('roleTestId'), { 
          target: { value: 'ADMIN' } 
        });
    
        fireEvent.click(screen.getByText('Invite'));
    
        await waitFor(() => {
          expect(mockToast).toHaveBeenCalledWith({
            description: "Invited successfully",
            status: "success"
          });
          expect(mockSetIsOpen).toHaveBeenCalledWith(false);
        });
      });


      it('formats name input by removing special characters', () => {
        render(<InviteStaff setIsOpen={mockSetIsOpen} />);
        const nameInput = screen.getByTestId('staffNameTestId');
        
        fireEvent.change(nameInput, { target: { value: 'John D@oe' } });
        expect(nameInput).toHaveValue('John Doe');
      });

      it('removes spaces from email input', () => {
        render(<InviteStaff setIsOpen={mockSetIsOpen} />);
        const emailInput = screen.getByTestId('emailTestId');
        
        fireEvent.change(emailInput, { target: { value: ' john@example.com ' } });
        expect(emailInput).toHaveValue('john@example.com');
      });


      it('enables submit button when form is valid', async () => {
        render(<InviteStaff setIsOpen={mockSetIsOpen} />);
        
        fireEvent.change(screen.getByTestId('staffNameTestId'), { 
          target: { value: 'John Doe' } 
        });
        fireEvent.change(screen.getByTestId('emailTestId'), { 
          target: { value: 'john@example.com' } 
        });
        fireEvent.change(screen.getByTestId('roleTestId'), { 
          target: { value: 'ADMIN' } 
        });
    
        await waitFor(() => {
          expect(screen.getByText('Invite')).toBeEnabled();
        });
      });

})