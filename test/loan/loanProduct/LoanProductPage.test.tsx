import LoanProductPage from "@/pages/portFolioManager/loanProduct/LoanProductPage";
import { render, screen, fireEvent,cleanup,} from "@testing-library/react";


describe("TablePagination", () => {
    beforeEach(() => {
        cleanup()
    })

    beforeEach(() => {
        render(<LoanProductPage />)
    })

    it("renders loanProduct and create button", () => {
    const createButton = screen.getByText('Create loan product');
    expect(createButton).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();

    const loanProductNameHeader = screen.getByText('Loan product name');
    expect(loanProductNameHeader).toBeInTheDocument();

   


    })


    it("renders paginated data and navigates pages", () => {
        const loanProductNameHeader = screen.getByText('Product design fund');
    expect(loanProductNameHeader).toBeInTheDocument();

    const nextPageButton = screen.getByRole('button', { name: /next/i });;
    fireEvent.click(nextPageButton);

    const nextLoanProduct = screen.getByText('Product design'); 
    expect(nextLoanProduct).toBeInTheDocument();
    })

    



})