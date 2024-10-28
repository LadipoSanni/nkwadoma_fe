import { render, screen, fireEvent,cleanup,} from "@testing-library/react";
import { useState } from 'react';
import TableModal from "@/reuseable/modals/TableModal";
import { Input } from "@/components/ui/input";



function Wrapper({ isOpen }: { isOpen: boolean }) {
    const [open, setOpen] = useState(isOpen);
    return (
      <TableModal 
        isOpen={open} 
        closeModal={() => setOpen(false)} 
        headerTitle="Create Cohort"
        closeOnOverlayClick={true}
      >
        <div>Modal Content</div>
      </TableModal>
    );
  }



describe("TableModal Component", () => {
    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
    })

    it("renders the modal when open", () => {
        render(<Wrapper isOpen={true} />);
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    
    })

    it('does not render the modal when closed', () => {
        render(<Wrapper isOpen={false} />);
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
      });

      it('calls closeModal when close button is clicked', () => {
        const closeModal = jest.fn();
        render(<TableModal 
            isOpen={true} 
            closeModal={closeModal} 
             headerTitle="Create Cohort"
             >
            <div>Modal Content</div>
        </TableModal>);
        fireEvent.click(screen.getByRole('button'));
        expect(closeModal).toHaveBeenCalled();
      });




    it('renders the header title if provided', () => {
        render(<Wrapper isOpen={true} />);
        expect(screen.getByText('Create Cohort')).toBeInTheDocument();
      });


      it('does not render the header title if not provided', () => {
            render(<TableModal 
                isOpen={true} 
                 >
                <div>Modal Content</div>
            </TableModal>);
        
        expect(screen.queryByRole('Create Cohort')).not.toBeInTheDocument();
      });

      it('renders children content correctly', () => {
        render(<Wrapper isOpen={true} />);
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });


      it('removes the modal from DOM when closed', () => {
         render(<Wrapper isOpen={false} />);
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
      });

      it('applies custom class to the modal content', () => {
        render(
          <TableModal 
            isOpen={true} 
            className="text-lg" 
          >
             <div>Modal Content</div>
          </TableModal>
        );
        expect(screen.getByRole('dialog')).toHaveClass('text-lg');
      });
    
      it('applies inline styles to the modal content', () => {
        render(
          <TableModal 
            isOpen={true} 
            style={{ backgroundColor: 'red' }} 
          >
             <div>Modal Content</div>
          </TableModal>
        );
        expect(screen.getByRole('dialog')).toHaveStyle('background-color: red');
      });

      it('renders the icon if provided', () => {
        const Icon = () => <span>Icon</span>;
        render(
          <TableModal 
            isOpen={true} 
            icon={Icon} 
          >
            <div>Modal Content</div>
          </TableModal>
        );
        expect(screen.getByText('Icon')).toBeInTheDocument();
      });

      it('does not render the icon if not provided', () => {
        render(<TableModal isOpen={true} >
            <div>Modal Content</div> 
        </TableModal>);
        expect(screen.queryByText('Icon')).not.toBeInTheDocument();
      });
     

    
    it('text that textInput field exist',() => {
        const closeModal = jest.fn();
        render(
        <TableModal isOpen={true} closeModal={closeModal} closeOnOverlayClick={true}>
        <div>Loan Product</div>
        <Input id="searchLoanProduct"  placeholder="firstName" name="firstName"/>
        <button onClick={closeModal}>Close</button>
         </TableModal>
        )

            const textInput = screen.getByPlaceholderText("firstName");
            expect(textInput).toBeInTheDocument();

            expect(textInput).toHaveAttribute('id', 'searchLoanProduct');
       
    })


    it("be able to interact with the input field", () => {
        const closeModal = jest.fn();
        render(
            <TableModal isOpen={true} closeModal={closeModal} closeOnOverlayClick={true}>
            <div>Loan Product</div>
            <Input id="searchLoanProduct" placeholder="firstName" name="firstName"/>
            <button onClick={closeModal}>Close</button>
             </TableModal>
            )
            const textInput = screen.getByPlaceholderText("firstName");
            expect(textInput).toHaveValue('');

            fireEvent.change(textInput, { target: { value: '' } });
            expect(textInput).toHaveValue('');
    })

    it("able to update the input field in the modal", () => {
        const closeModal = jest.fn();
        render(
            <TableModal isOpen={true} closeModal={closeModal} closeOnOverlayClick={true}>
                <div>
                    <Input id="searchLoanProduct"  placeholder="firstName" name="firstName" />
                    <button onClick={closeModal}>Close</button>
                </div>
            </TableModal>
        );
        

        const textInput = screen.getByPlaceholderText("firstName");
        fireEvent.change(textInput, { target: { value: 'John' } });

       
        expect(textInput).toHaveValue('John');
    })

   
  

})