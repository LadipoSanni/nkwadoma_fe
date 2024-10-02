import TablePagination from "@/reuseable/table/TablePagination";
import { render, screen, fireEvent,cleanup,within} from "@testing-library/react";


describe("TablePagination", () => {
    beforeEach(() => {
        cleanup()
    })

    const mockHandlePageChange = jest.fn();
    const mockHandleNextPage = jest.fn();
    const mockHandlePreviousPage = jest.fn();

    


    beforeEach(() => {
        
    });


   

    it("should render TablePagination component", () => {
        const tableData = Array.from({ length: 100 })
        render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={tableData}
                handlePageChange={mockHandlePageChange}
                handleNextPage={mockHandleNextPage}
                handlePreviousPage={mockHandlePreviousPage}
            />
        )
        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        
    });

    it("should call handleNextPage when the Next button is clicked", () => {
        const tableData = Array.from({ length: 100 })
        render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={tableData}
                handlePageChange={mockHandlePageChange}
                handleNextPage={mockHandleNextPage}
                handlePreviousPage={mockHandlePreviousPage}
            />
        )
        const next = screen.getByText("Next")
        expect(next).toBeInTheDocument(); 
        fireEvent.click(next);
        expect(mockHandleNextPage).toHaveBeenCalled();
        
    })

    it("should call handlePreviousPage when the Next button is clicked",() => {
        const tableData = Array.from({ length: 100 })
        render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={tableData}
                handlePageChange={mockHandlePageChange}
                handleNextPage={mockHandleNextPage}
                handlePreviousPage={mockHandlePreviousPage}
            />
        )
        const prev = screen.getByText("Previous")
        expect(prev).toBeInTheDocument(); 
        fireEvent.click(prev);
        expect(mockHandlePreviousPage).toHaveBeenCalled();
    })


    it("should hide Previous button when page is 1", () => {
        const tableData = Array.from({ length: 100 })
        render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={tableData}
                handlePageChange={mockHandlePageChange}
                handleNextPage={mockHandleNextPage}
                handlePreviousPage={mockHandlePreviousPage}
            />
        )
        const prev = screen.getByText("Previous")
        expect(prev).toBeInTheDocument(); 
        expect(prev).toHaveStyle("visibility: hidden");
    })

    it("should hide Next button when page is equal to total number of pages", () => {
        const tableDatas = Array.from({ length: 10 })
        render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={tableDatas}
                handlePageChange={mockHandlePageChange}
                handleNextPage={mockHandleNextPage}
                handlePreviousPage={mockHandlePreviousPage}
            />
        );
        
        const hideNextButton = screen.getByTestId("dynamicTablePagination");
        const next = within(hideNextButton).queryByRole('button', { name: /Next/ });
        expect(next).not.toBeInTheDocument(); 
        
    })

    it('should show next button is responsive', () => {
        const tableData = Array.from({ length: 100 })
        render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={tableData}
                handlePageChange={mockHandlePageChange}
                handleNextPage={mockHandleNextPage}
                handlePreviousPage={mockHandlePreviousPage}
            />
        )
        const nextButton = screen.getByRole('button', { name: /Next/i });
        fireEvent.click(nextButton);
       

    })
})