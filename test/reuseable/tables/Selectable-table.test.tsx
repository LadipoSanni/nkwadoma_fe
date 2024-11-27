import {render, screen, fireEvent, cleanup} from "@testing-library/react";
import SelectableTable from "@/reuseable/table/SelectableTable";

const tableData = [
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

const tableHeader = [
    { title: 'funds', id: 'funds' },
    { title: 'product', id: 'product'},
    { title: 'disburse', id: 'disburse'},
];

const handleRowClick = jest.fn();



describe('LoanProductTable component', () => {
    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
        const { getByText } = render(
            <SelectableTable
                tableData={tableData}
                tableHeader={tableHeader}
                handleRowClick={handleRowClick}
                tableHeight={40}
                enableRowSelection={true}
            />
        );

    });

    it('should ', () => {
        expect(screen.getByTestId('datatable')).toBeInTheDocument()
    });

    it('renders the table with correct headers', () => {
        tableHeader.forEach(column => {
            const headers = screen.getAllByText(column.title);
            expect(headers.length).toBeGreaterThan(0);

        });
    });

    test('renders the correct number of rows on the first page for both the large screen and mobile screen', () => {
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(18);


    });


    test('paginates correctly', () => {

        const nextButton = screen.getAllByText(/next/i);
        fireEvent.click(nextButton[0]);

        expect(screen.queryByText('Loan A')).not.toBeInTheDocument();
    });

        it('should render table with provided data and headers when tableData is not empty', () => {
            expect(screen.getByText('funds')).toBeInTheDocument();
            expect(screen.getByText('disburse')).toBeInTheDocument();
    });
})