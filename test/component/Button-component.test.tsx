import {render, screen} from "@testing-library/react";
import BackButton from "@/components/back-button/index"
import fn = jest.fn;

describe("test button component" , () => {

    beforeEach(() => {
        render(<BackButton handleClick={fn} id={"testing"} textColor={'#142854'} iconRight={true} text={"backto loan"} />)
    })

    test("test that button component display when it is called ", ()=> {
        const component = screen.getByTestId("testing")
        expect(component).toBeInTheDocument()
    })
     test("test that component display test passed into the component", ()=> {
         const text = screen.getByText(/backto loan/)
         expect(text).toBeInTheDocument()
     })
})