import { render,screen,cleanup,fireEvent } from "@testing-library/react";
import ActivateOrganization from "@/components/portfolio-manager/organization/ActivateOrganization";
import { useRouter } from 'next/navigation';
import { Providers } from "@/app/provider";


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
 
  const handleCloseModal = jest.fn(); 

describe("ActivateOrganization", () => {
    const mockPush = jest.fn();
    beforeEach(() => {
        cleanup()
        render(
            <Providers>
                <ActivateOrganization id="1" setIsOpen={handleCloseModal}/>
            </Providers>
        );
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
    }) 

    test('renders the form', () => {    
        expect(screen.getByRole('form')).toBeInTheDocument(); 
    });

    test('renders reason label', () => { 
        expect(screen.getByLabelText('Reason')).toBeInTheDocument();
     });

     test('renders reason textarea', () => { 
        expect(screen.getByPlaceholderText('Enter reason')).toBeInTheDocument(); 
    });

    test('renders submit and cancel buttons', () => { 
        expect(screen.getByText('Activate')).toBeInTheDocument(); 
        expect(screen.getByText('Cancel')).toBeInTheDocument();
     });

     test('validates reason field is required', async () => { 
        fireEvent.click(screen.getByText('Activate')); 
        expect(await screen.findByText('Reason is required')).toBeInTheDocument(); 
    });

    test('does not show error message when reason is provided', () => { 
        fireEvent.change(screen.getByPlaceholderText('Enter reason'), { target: { value: 'Valid reason' } }); 
        fireEvent.click(screen.getByText('Activate')); 
        expect(screen.queryByText('Reason is required')).not.toBeInTheDocument(); 
    });

    test('cancel button closes the modal', () => { 
        
        fireEvent.click(screen.getByText('Cancel')); 
        expect(handleCloseModal).toHaveBeenCalled();
     });

     test('initial values are set correctly', () => { 
        const textarea = screen.getByPlaceholderText('Enter reason') as HTMLTextAreaElement; 
        expect(textarea.value).toBe('');
     })

     test('reason field updates on change', () => { 
        const textarea = screen.getByPlaceholderText('Enter reason') as HTMLTextAreaElement; 
        fireEvent.change(textarea, { target: { value: 'New reason' } }); 
        expect(textarea.value).toBe('New reason');
     });

     test('initial values should be empty', () => { 
        const textarea = screen.getByPlaceholderText('Enter reason') as HTMLTextAreaElement; 
        expect(textarea.value).not.toContain("Reason");
     })

    


})
