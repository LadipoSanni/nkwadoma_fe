import '@testing-library/react'
import {render, screen} from '@testing-library/react'
import {Providers} from "@/app/provider";
import Index from "@/pages/loanee/MyProfile";


describe('test header', ()=> {
    test('that component is rendered when called', ()=> {
        render(
        <Providers>
            <Index/>
        </Providers>
        )
        const  headerComponent = screen.getByTestId('loaneeProfileHeader')
        expect(headerComponent).toBeInTheDocument()
    })

})