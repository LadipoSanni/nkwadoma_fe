import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import AuthEmail from "@/reuseable/modals/AuthEmail";


describe("test email modal", ()=> {

    it('should renders auth email component', () => {
        render(<AuthEmail/>)
        expect(screen.getByTestId("authEmailModal"))
    });
    it('should render success icon', () => {
        render(<AuthEmail />)
        expect(screen.getByTestId("successIconContainer"))
        expect(screen.getByTestId("successIcon"))

    });
    it('should contain a modal header text', () => {
        render(<AuthEmail header={'Email sent'}/>)
        expect(screen.getByTestId("modalHeaderText"))
    });
    it('should contain text', () => {
        render(<AuthEmail text={'We’ve sent a link to create a new password to naeche@meddl.africa. If it’s not in your inbox, check your spam folder.'}/>)
        expect(screen.getByTestId("modalText"))
    });
})