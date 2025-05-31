import '@testing-library/react'
import {render, screen} from '@testing-library/react'
import {Providers} from "@/app/provider";
import Index from "@/pages/loanee/MyProfile";


describe('test header', ()=> {
    beforeEach(()=> {
        render(
            <Providers>
                <Index/>
            </Providers>
        )
    })
    test('that component is rendered when called', ()=> {
        const  headerComponent = screen.getByTestId('loaneeProfileHeader')
        expect(headerComponent).toBeInTheDocument()
    })

    // test('that component contains loanee basic details', () => {
    //     const  loaneeGender = screen.getByTestId('name:Gender')
    //     const loaneeEmails = screen.getByTestId('name:Date of birth')
    //     expect(loaneeGender).toBeInTheDocument()
    //     expect(loaneeEmails).toBeInTheDocument()
    // })

})