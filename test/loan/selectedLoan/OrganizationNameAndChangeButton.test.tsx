import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";


describe("testing OrganizationNameAndChangeButton component", ()=> {


    beforeEach(() => {
        render(
            <OrganizationNameAndChangeButton/>
        )
    })

    it('test that component renders', ()=> {
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
        const container = screen.getByTestId('organizationNameContainer')
        expect(container).toBeInTheDocument()
    });
    it('should contain change Organization Button', () => {
        const button = screen.getByTestId('changeOrganizationButton')
        expect(button).toBeInTheDocument()
    });
})