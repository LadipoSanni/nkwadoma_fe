import '@testing-library/react'
import {render, screen} from '@testing-library/react'
import Header from '@/components/loanee-my-profile/header'
import {Providers} from "@/app/provider";
import SelectLoanTab from "@/components/selected-loan/SelectLoanTab";


describe('test header', ()=> {
    test('that component is rendered when called', ()=> {
        render(
        <Providers>
            <Header/>
        </Providers>
        )
        const  headerComponent = screen.getAllByTestId('loaneeProfileHeader')
        expect(headerComponent).toBeInTheDocument()
    })
})