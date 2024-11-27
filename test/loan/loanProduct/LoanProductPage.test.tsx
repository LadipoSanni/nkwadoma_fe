import LoanProductPage from "@/pages/admin/loanProduct/index";
import { render, screen, cleanup,} from "@testing-library/react";


describe("TablePagination", () => {
    beforeEach(() => {
        cleanup()
    })

    beforeEach(() => {
        render(<LoanProductPage />)
    })

    it("renders loan-product and create button", () => {
    // const createButton = screen.getByText('Create loan product');
    // expect(createButton).toBeInTheDocument();

    // const searchInput = screen.getByPlaceholderText('Search');
    // expect(searchInput).toBeInTheDocument();

    // const loanProductNameHeader = screen.getByText('Loan product name');
    // expect(loanProductNameHeader).toBeInTheDocument();

   


    })



    



})