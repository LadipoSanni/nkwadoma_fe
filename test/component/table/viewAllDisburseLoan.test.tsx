import "@testing-library/react"
import LoanDisbursalTable from "@/components/viewAll/LoanDisbursalTable";
import {render, screen} from "@testing-library/react";
import {Providers} from "@/app/provider";

const mockUsePathname = jest.fn();
// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    usePathname: () => mockUsePathname,

    // useSearchParams: jest.fn().mockImplementation(() => {
    //     return new URLSearchParams(window.location.search);
    // }),
    // usePathname: jest.fn().mockImplementation((pathArg) => {
    //     return pathArg;
    // })

}));

describe('test view all loan disbursal', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve(new Response(JSON.stringify({ data: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }))
    );
    beforeEach(() => {
        render(
            <Providers>
                <LoanDisbursalTable/>
            </Providers>
        )
    })

    test("that component exist", () => {
        const container = screen.getByTestId('LoanDisbursalMainDivContainer')
        expect(container).toBeInTheDocument()
    })
    // test('that component renders empty state if data fetch is empty', () => {
    //     const emptyState =  screen.getByTestId('LoanDisbursalEmptyState')
    //     expect(emptyState).toBeInTheDocument()
    // })
})