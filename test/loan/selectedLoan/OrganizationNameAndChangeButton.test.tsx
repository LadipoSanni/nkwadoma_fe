import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";
import {Providers} from "@/app/provider";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));
describe("testing OrganizationNameAndChangeButton component", ()=> {


    beforeEach(() => {
        render(
            <Providers>
                <OrganizationNameAndChangeButton/>
            </Providers>
        )
    })

    it('test that component renders', ()=> {
        const container = screen.getByTestId("OrganizationNameAndChangeButtonContainer");
        expect(container).toBeInTheDocument()
    })
    it('should ', () => {
        const container = screen.getByTestId('organizationNameContainer')
        expect(container).toBeInTheDocument()
    });
    it('should contain change Organization Button', () => {
        const button = screen.getByTestId('changeOrganizationButton')
        expect(button).toBeInTheDocument()
    });
    // it('should contain a disable button if no organization tab has been clicked', () => {
    //     const button = screen.getByTestId('continueButtonOnOrganizationModal')
    //     expect(button).toBeDisabled()
    // });
})