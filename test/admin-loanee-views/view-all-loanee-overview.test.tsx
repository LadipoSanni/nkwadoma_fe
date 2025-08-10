import '@testing-library/react';
import { render, screen} from '@testing-library/react';
import ViewAllLoaneeOverview from "@/features/admin-loanee-view/view-all-loanee-overview";
import {Providers} from '@/app/provider';
// import { useRouter } from 'next/router';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: () => mockUsePathname,

}));
describe('test view all loanee overview component', () => {
    beforeEach(() => {
        render(
            <Providers>
                <ViewAllLoaneeOverview/>
            </Providers>
        )
    })
    test('that component should contain key datas', () => {
        expect(screen.getByTestId('totalNumberOfLoanees')).toBeInTheDocument();
        expect(screen.getByTestId('historicalDept')).toBeInTheDocument();
        expect(screen.getByTestId('totalOutstanding')).toBeInTheDocument();

    })

    // test('that component should contains search and table',async () => {
    //     // const tableRow =  screen.getByTestId('dynamicTableCellname0');
    //     // fireEvent.click(tableRow)
    //     // await expect(screen.getByTestId("detailsPAGE"))
    //
    //     expect(screen.getByTestId('dynamicTableCellname0')).toBeInTheDocument()
    //     // const mockRouter = useRouter();
    //     // const tableRow = screen.getByTestId('dynamicTableCellname0')
    //     // fireEvent.click(tableRow);
    //     // expect(mockRouter.push).toHaveBeenCalledWith('/loanees/loans');
    //
    // })
})