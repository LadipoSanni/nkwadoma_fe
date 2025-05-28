import '@testing-library/react'
import {render, screen} from '@testing-library/react'
import LoaneeProfileHeader from '@/components/loanee-my-profile/loaneeProfileHeader'
import {Providers} from "@/app/provider";


describe('test header', ()=> {
    test('that component is rendered when called', ()=> {
        render(
        <Providers>
            <LoaneeProfileHeader/>
        </Providers>
        )
        const  headerComponent = screen.getByTestId('loaneeProfileHeader')
        expect(headerComponent).toBeInTheDocument()
    })

})