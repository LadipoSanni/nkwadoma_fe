import { render,screen,fireEvent } from "@testing-library/react";
import LoanProductTable from "@/reuseable/table/LoanProductTable";

const mockTableData = [
    { id: 1, name: 'Loan A', amount: 1000 },
    { id: 2, name: 'Loan B', amount: 2000 },
    { id: 3, name: 'Loan C', amount: 3000 },
    { id: 4, name: 'Loan D', amount: 4000 },
    { id: 5, name: 'Loan E', amount: 5000 },
    { id: 6, name: 'Loan F', amount: 6000 },
    { id: 7, name: 'Loan G', amount: 7000 },
    { id: 8, name: 'Loan H', amount: 8000 },
    { id: 9, name: 'Loan I', amount: 9000 },
    { id: 10, name: 'Loan J', amount: 10000 },
    { id: 11, name: 'Loan K', amount: 11000 },

];

const mockTableHeader = [
    { title: 'fund', id: 'funds', selector: (row: any) => row.fund },
    { title: 'product', id: 'product', selector: (row: any) => row.product },
    { title: 'disburse', id: 'disburse', selector: (row: any) => row.disburse},
];

const mockHandleRowClick = jest.fn();



describe('LoanProductTable component', () => {
    beforeEach(() => {
        render(
            <LoanProductTable
                tableData={mockTableData}
                tableHeader={mockTableHeader}
                handleRowClick={mockHandleRowClick}
                tableHeight={40}
            />
        );
    });

    it('should ', () => {
        expect(screen.getByTestId('datatable')).toBeInTheDocument()
    });

    it('renders the table with correct headers', () => {
        mockTableHeader.forEach(column => {
            const headers = screen.getAllByText(column.title);
           expect(headers.length).toBeGreaterThan(0);
    
        });
    });
    
    test('renders the correct number of rows on the first page for both the large screen and mobile screen', () => {
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(16);
    
    
    });
 
    
    test('paginates correctly', () => {
    
        const nextButton = screen.getAllByText(/next/i);
        fireEvent.click(nextButton[0]);
    
        expect(screen.queryByText('Loan A')).not.toBeInTheDocument();
    });
    
   


})