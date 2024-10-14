import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import OrganizationNameAndChangeButton from "@/components/selectedLoan/OrganizationNameAndChangeButton";


describe("testing OrganizationNameAndChangeButton component", ()=> {

    it('test that component renders', ()=> {
        render(
            <OrganizationNameAndChangeButton/>
        )
        const container = screen.getByTestId("OrganizationNameAndChangeButtonContainer");
        expect(container).toBeInTheDocument()
    })
    // it("test that organization image renders", ()=> {
    //     render(
    //         <OrganizationNameAndChangeButton/>
    //     )
    //     const container = screen.getByTestId("OrganizationImage");
    //     expect(container).toBeInTheDocument()
    // })
    it('should ', () => {
        render(
            <OrganizationNameAndChangeButton/>
        )
        const container = screen.getByTestId('organizationNameContainer')
        expect(container).toBeInTheDocument()
    });
})