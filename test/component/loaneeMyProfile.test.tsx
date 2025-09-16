import '@testing-library/react'
import {render, screen, act, waitFor} from '@testing-library/react'
import {Providers} from "@/app/provider";
import Index from "@/pages/loanee/MyProfile";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useParams: jest.fn(),
    usePathname: () => jest.fn(),
    useSearchParams: jest.fn(),
}));
;
describe('test header', ()=> {
    beforeEach(async ()=> {
        global.fetch = jest.fn(() =>
            Promise.resolve(new Response(JSON.stringify({ data: [] }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }))
        );

        await act(async () => render(
            <Providers>
                <Index/>
            </Providers>
        ))
    })
    test('that component is rendered when called', async ()=> {
        const  headerComponent = screen.getByTestId('loaneeProfileHeader')
        await waitFor(() => {
            expect(headerComponent).toBeInTheDocument()
        });
    })

    // test('that component contains loanee basic details', () => {
    //     const  loaneeGender = screen.getByTestId('name:Gender')
    //     const loaneeEmails = screen.getByTestId('name:Date of birth')
    //     expect(loaneeGender).toBeInTheDocument()
    //     expect(loaneeEmails).toBeInTheDocument()
    // })

})