import LoanProductModal from "@/component/reuseable/modal/LoanProductModal"
import { render, screen, fireEvent,cleanup, } from "@testing-library/react";
import ReactModal from "react-modal";

ReactModal.setAppElement("body");



describe("LoanProductModal", () => {
    beforeEach(() => {
        cleanup()
    })

    const handleLoanProductModal = jest.fn();

    const renderComponent = () => {
        return render(
            <LoanProductModal isOpen={true} closeModal={handleLoanProductModal}>
                <div>Loan Product</div>
            </LoanProductModal>
        )
    }
     
    it("it should render children when modal is open", () => {
        render(
            <LoanProductModal isOpen={true} closeModal={handleLoanProductModal}>
                <div>Loan Product</div>
            </LoanProductModal>
        )
        expect(screen.getByText("Loan Product")).toBeInTheDocument()

    })

    // test("should render modal", () => {
    //     render(<LoanProductModal isOpen={true} closeModal={() => {}}/>)
    //     expect(screen.getByText("Loan Product")).toBeInTheDocument()
    // })

    // test("should close modal when clicked on overlay", () => {
    //     render(<LoanProductModal isOpen={true} closeModal={() => {}}/>)
    //     fireEvent.click(screen.getByTestId('react-modal-overlay'))
    //     expect(screen.queryByText("Loan Product")).toBeNull()
    // })

    // test("should close modal when clicked on close button", () => {
    //     render(<LoanProductModal isOpen={true} closeModal={() => {}}/>)
    //     fireEvent.click(screen.getByText("Close"))
    //     expect(screen.queryByText("Loan Product")).toBeNull()
    // })

    // test("should render children", () => {
    //     render(<LoanProductModal isOpen={true} closeModal={() => {}}></LoanProductModal>

})