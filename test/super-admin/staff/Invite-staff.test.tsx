import { render, screen, fireEvent,cleanup,waitFor} from "@testing-library/react";
import InviteStaff from "@/components/super-admin/staff/Invite-staff";
// import { Providers } from "@/app/provider";
import { useToast } from '@/hooks/use-toast';
import { Providers } from "@/app/provider";


jest.mock("next/navigation", () => ({
  useRouter: () => ({
      push: jest.fn(),
  }),
  usePathname: () => jest.fn(),
}));



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
    const mockRole =  [ { value: "MEEDL_ADMIN", label: "Admin" }, { value: "PORTFOLIO_MANAGER", label: "Portfolio manager" }, { value: "MEEDL_ASSOCIATE", label: "Associate"} ];

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
        render(
          <Providers>
          <InviteStaff 
          setIsOpen={mockSetIsOpen} 
           roleOptions={mockRole}
          />
          </Providers>
       
      )
        ;
        expect(screen.getByTestId('staffNameTestId')).toBeInTheDocument();
      });

      it('renders all required form fields', () => {
        render(
          <Providers>
          <InviteStaff 
          setIsOpen={mockSetIsOpen} 
           roleOptions={mockRole}
          />
          </Providers>
       
      )
        expect(screen.getByTestId('staffNameTestId')).toBeInTheDocument();
        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByTestId('roleTestId')).toBeInTheDocument();
      });

      it('shows validation errors when required fields are empty', async () => {
        render(
          <Providers>
          <InviteStaff 
          setIsOpen={mockSetIsOpen} 
           roleOptions={mockRole}
          />
          </Providers>
       
      )
        
        fireEvent.blur(screen.getByTestId('staffNameTestId'));
        fireEvent.blur(screen.getByTestId('emailTestId'));
        fireEvent.blur(screen.getByTestId('roleTestId'));
    
        await waitFor(() => {
          expect(screen.getByText('First name is required')).toBeInTheDocument();
          expect(screen.getByText('Email address is required')).toBeInTheDocument();
        });
      });

      it('submits the form with valid data', async () => {
        render(
          <Providers>
          <InviteStaff 
          setIsOpen={mockSetIsOpen} 
           roleOptions={mockRole}
          />
          </Providers>
       
      )
        fireEvent.change(screen.getByTestId('staffNameTestId'), { 
          target: { value: 'John' } 
        });
        fireEvent.change(screen.getByTestId('staffLastNameTestId'), { 
          target: { value: 'Doe' } 
        });
        fireEvent.change(screen.getByTestId('emailTestId'), { 
          target: { value: 'john@example.com' } 
        });
        fireEvent.change(screen.getByTestId('roleTestId'), { 
          target: { value: 'ADMIN' } 
        });
    
        fireEvent.click(screen.getByText('Invite'));
    
        // await waitFor(() => {
        //   expect(mockToast).toHaveBeenCalledWith({
        //     description: "Invited successfully",
        //     status: "success",
        //     duration: 1000
        //   });
        //   expect(mockSetIsOpen).toHaveBeenCalledWith(false);
        // });
      });


      it('formats name input by removing special characters', () => {
        render(
          <Providers>
          <InviteStaff 
          setIsOpen={mockSetIsOpen} 
           roleOptions={mockRole}
          />
          </Providers>
       
      )
        const nameInput = screen.getByTestId('staffNameTestId');
        
        fireEvent.change(nameInput, { target: { value: 'John D@oe' } });
        expect(nameInput).toHaveValue('John Doe');
      });

      it('removes spaces from email input', () => {
        render(
          <Providers>
          <InviteStaff 
          setIsOpen={mockSetIsOpen} 
           roleOptions={mockRole}
          />
          </Providers>
       
      )
        const emailInput = screen.getByTestId('emailTestId');
        
        fireEvent.change(emailInput, { target: { value: ' john@example.com ' } });
        expect(emailInput).toHaveValue('john@example.com');
      });


      it('enables submit button when form is valid', async () => {
        render(
          <Providers>
          <InviteStaff 
          setIsOpen={mockSetIsOpen} 
           roleOptions={mockRole}
          />
          </Providers>
       
      )
        
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