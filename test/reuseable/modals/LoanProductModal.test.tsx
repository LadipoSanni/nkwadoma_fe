// import LoanProductModal from "@/reuseable/modals/LoanProductModal"
// import { render, screen, fireEvent,cleanup,} from "@testing-library/react";
// import Styles from "@/component/reuseable/modal/styles.module.css"
// import { TextField } from "@mui/material";
import {cleanup}  from "@testing-library/react";




describe("LoanProductModal", () => {
    beforeEach(() => {
        cleanup()
    })

    it("it should render children when modal is open", () => {
      
         })



    // const handleLoanProductModal = jest.fn();
   

    // const renderComponent = () => {
    //     return render(
    //         <LoanProductModal isOpen={true} closeModal={handleLoanProductModal}>
    //             <div>Loan Product</div>
    //         </LoanProductModal>
    //     )
    // }
     
    // it("it should render children when modal is open", () => {
    //     render(
    //         <LoanProductModal isOpen={true} closeModal={handleLoanProductModal}>
    //             <div>Loan Product</div>
    //         </LoanProductModal>
    //     )
    //     expect(screen.getByText("Loan Product")).toBeInTheDocument()

    // })

    // it("should not render children when modal is closed", ()=> {
    //     render(
    //         <LoanProductModal isOpen={false} closeModal={handleLoanProductModal}>
    //             <div>Loan Product</div>
    //         </LoanProductModal>
    //     )
    //     expect(screen.queryByText("Loan Product")).toBeNull()
        
    // })

    // it("should call closeModal on overlay click when closeOnOverlayClick is true", () => {
    //     render(
    //         <LoanProductModal isOpen={true} closeModal={handleLoanProductModal} closeOnOverlayClick={true}>
    //             <div>Loan Product</div>

    //         </LoanProductModal>
    //     ) 
    //     const overLayElement  =  document.querySelector(`.${Styles.overlay}`)

    //     if (overLayElement) {
    //         fireEvent.click(overLayElement);
    //         expect(handleLoanProductModal).toHaveBeenCalled();
    //       } else {
    //         throw new Error('Overlay element not found');
    //       }
    // })

    // it("should close modal when clicked on close button",() => {
    //     render(
    //         <LoanProductModal isOpen={true} closeModal={handleLoanProductModal} closeOnOverlayClick={true}>
    //             <div>Loan Product</div>
    //             <button onClick={handleLoanProductModal}>Close</button>
    //         </LoanProductModal>
    //     )

    //     const closeButton = screen.getByText("Close");
        
    //     fireEvent.click(closeButton);
    //     expect(handleLoanProductModal).toHaveBeenCalled();

    // })

    // it('text that textInput field exist',() => {
    //     render(
    //     <LoanProductModal isOpen={true} closeModal={handleLoanProductModal} closeOnOverlayClick={true}>
    //     <div>Loan Product</div>
    //     <TextField id="searchLoanProduct" fullWidth placeholder="firstName" name="firstName"/>
    //     <button onClick={handleLoanProductModal}>Close</button>
    //      </LoanProductModal>
    //     )

    //         const textInput = screen.getByPlaceholderText("firstName");
    //         expect(textInput).toBeInTheDocument();

    //         expect(textInput).toHaveAttribute('id', 'searchLoanProduct');
       
    // })


    // it("be able to interact with the input field", () => {
    //     render(
    //         <LoanProductModal isOpen={true} closeModal={handleLoanProductModal} closeOnOverlayClick={true}>
    //         <div>Loan Product</div>
    //         <TextField id="searchLoanProduct" fullWidth placeholder="firstName" name="firstName"/>
    //         <button onClick={handleLoanProductModal}>Close</button>
    //          </LoanProductModal>
    //         )
    //         const textInput = screen.getByPlaceholderText("firstName");
    //         expect(textInput).toHaveValue('');

    //         fireEvent.change(textInput, { target: { value: '' } });
    //         expect(textInput).toHaveValue('');
    // })

    // it("able to update the input field in the modal", () => {
    //     render(
    //         <LoanProductModal isOpen={true} closeModal={handleLoanProductModal} closeOnOverlayClick={true}>
    //             <div>
    //                 <TextField id="searchLoanProduct" fullWidth placeholder="firstName" name="firstName" />
    //                 <button onClick={handleLoanProductModal}>Close</button>
    //             </div>
    //         </LoanProductModal>
    //     );
        

    //     const textInput = screen.getByPlaceholderText("firstName");
    //     fireEvent.change(textInput, { target: { value: 'John' } });

       
    //     expect(textInput).toHaveValue('John');
    // })

   
  

})