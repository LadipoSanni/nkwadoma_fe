import { render,screen,cleanup,fireEvent } from "@testing-library/react";
import SubmitAndCancelButton from "@/reuseable/buttons/Submit-and-cancelButton";


describe("SubmitAndCancelButton", () => {
    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
    })

    test('renders Cancel button', () => { 
        render(<SubmitAndCancelButton isValid={true} isLoading={false} handleCloseModal={jest.fn()} submitButtonName="Publish" />);
         expect(screen.getByText('Cancel')).toBeInTheDocument(); 
        });
    
    test('renders Submit button with provided name', () => { 
            render(<SubmitAndCancelButton isValid={true} isLoading={false} handleCloseModal={jest.fn()} submitButtonName="Publish" />);
             expect(screen.getByText('Publish')).toBeInTheDocument();
            });
   
    test('Cancel button calls handleCloseModal', () => { 
        const handleCloseModal = jest.fn(); 
        render(<SubmitAndCancelButton isValid={true} isLoading={false} handleCloseModal={handleCloseModal} submitButtonName="Publish" />); 
        fireEvent.click(screen.getByText('Cancel'));
         expect(handleCloseModal).toHaveBeenCalled(); 
      });

    test('Submit button is disabled when isValid is false', () => { 
        render(<SubmitAndCancelButton isValid={false} isLoading={false} handleCloseModal={jest.fn()} submitButtonName="Publish" />);
         expect(screen.getByText('Publish')).toBeDisabled(); 
      });
    
    test('Submit button is enabled when isValid is true', () => { 
        render(<SubmitAndCancelButton isValid={true} isLoading={false} handleCloseModal={jest.fn()} submitButtonName="Publish" />);
         expect(screen.getByText('Publish')).toBeEnabled(); 
      });
    
    test('Submit button shows submitButtonName when not loading', () => { 
        render(<SubmitAndCancelButton isValid={true} isLoading={false} handleCloseModal={jest.fn()} submitButtonName="Publish" />); expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument(); 
        expect(screen.getByText('Publish')).toBeInTheDocument();
     });

     test('Cancel button has correct variant class', () => { 
        render(<SubmitAndCancelButton isValid={true} isLoading={false} handleCloseModal={jest.fn()} submitButtonName="Publish" />); 
        expect(screen.getByText('Cancel')).toHaveClass('bg-white'); }); 
        
    test('Submit button has correct variant class when valid', () => { 
        render(<SubmitAndCancelButton isValid={true} isLoading={false} handleCloseModal={jest.fn()} submitButtonName="Publish" />); 
        expect(screen.getByText('Publish')).toHaveClass('bg-meedlBlue');
     }); 
     
     test('Submit button has correct variant class when invalid', () => { 
        render(<SubmitAndCancelButton isValid={false} isLoading={false} handleCloseModal={jest.fn()} submitButtonName="Publish" />); 
        expect(screen.getByText('Publish')).toHaveClass('bg-neutral650'); 
    });
    



})