import '@testing-library/react';
import {render,screen} from '@testing-library/react';
import ViewAllLoaneeOverview from "@/features/admin-loanee-view/view-all-loanee-overview";
import {Providers} from '@/app/provider';


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
})