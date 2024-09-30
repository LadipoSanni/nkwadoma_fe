import {fireEvent, render, screen} from "@testing-library/react";
import TablePagination from "./TablePagination";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {expect, describe, it} = require("@jest/globals");


const mockPageChange = jest.fn();
const mockNextPage = jest.fn();
const mockPreviousPage = jest.fn();



describe("TablePagination", () => {
    it("should test that pagination table does not exist", () => {
        const {queryByTestId} = render(<div></div>);
        expect(queryByTestId('dynamicTablePagination')).not.toBeInTheDocument();
    })

    it("should test that pagination table exist", () => {
        const {queryByTestId} = render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={[...Array(20)]}
                handlePageChange={mockPageChange}
                handleNextPage={mockNextPage}
                handlePreviousPage={mockPreviousPage}
            />
        );
        expect(queryByTestId('dynamicTablePagination')).toBeInTheDocument();
    })

    it('should test that pagination control renders', () => {
        render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={[...Array(20)]}
                handlePageChange={mockPageChange}
                handleNextPage={mockNextPage}
                handlePreviousPage={mockPreviousPage}
            />
        );
        expect(screen.getByTestId('dynamicTablePreviousButton')).toBeInTheDocument();
        expect(screen.getByTestId('dynamicTableNextButton')).toBeInTheDocument();
        expect(screen.getByTestId('dynamicTablePaginationControl')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId(`dynamicTableNextButton`))
        expect(mockNextPage).toHaveBeenCalled();
    });

    it('should call handlePageChange when a pagination number is clicked', () => {
        render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={[...Array(30)]}
                handlePageChange={mockPageChange}
                handleNextPage={mockNextPage}
                handlePreviousPage={mockPreviousPage}
            />
        );

        fireEvent.click(screen.getByText('2'));

        expect(mockPageChange).toHaveBeenCalledWith(expect.anything(), 2);
    });

    it('should call handleNextPage and handlePreviousPage when Next and Previous buttons are clicked', () => {
        render(
            <TablePagination
                page={2}
                rowsPerPage={10}
                tableData={[...Array(30)]}
                handlePageChange={mockPageChange}
                handleNextPage={mockNextPage}
                handlePreviousPage={mockPreviousPage}
            />
        );

        fireEvent.click(screen.getByTestId('dynamicTableNextButton'));
        expect(mockNextPage).toHaveBeenCalled();

        fireEvent.click(screen.getByTestId('dynamicTablePreviousButton'));
        expect(mockPreviousPage).toHaveBeenCalled();
    });

    it('should hide the Previous button on the first page and the Next button on the last page', () => {
        const {rerender} = render(
            <TablePagination
                page={1}
                rowsPerPage={10}
                tableData={[...Array(30)]}
                handlePageChange={mockPageChange}
                handleNextPage={mockNextPage}
                handlePreviousPage={mockPreviousPage}
            />
        );
        expect(screen.getByTestId('dynamicTablePreviousButton')).toHaveStyle('visibility: hidden');
        expect(screen.getByTestId('dynamicTableNextButton')).toHaveStyle('visibility: visible');

        rerender(
            <TablePagination
                page={3}
                rowsPerPage={10}
                tableData={[...Array(30)]}
                handlePageChange={mockPageChange}
                handleNextPage={mockNextPage}
                handlePreviousPage={mockPreviousPage}
            />
        );
        expect(screen.getByTestId('dynamicTablePreviousButton')).toHaveStyle('visibility: visible');
        expect(screen.getByTestId('dynamicTableNextButton')).toHaveStyle('visibility: hidden');
    });
})