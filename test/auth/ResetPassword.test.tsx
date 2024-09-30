import "@testing-library/react"
import ResetPassword from "@/features/auth/reset-password/ResetPassword";
import {queryByAttribute, render, screen} from "@testing-library/react";


describe("test reset password", ()=> {
    const getById = queryByAttribute.bind(null, "id")
    it('should display reset password component', () => {
        const view = render(
            <ResetPassword/>
        )
        expect(getById(view.container, "resetPasswordComponent")).toBeInTheDocument()
    });

    it('should display reset password component display it headers', () => {
        const view = render(
            <ResetPassword/>
        )
        expect(getById(view.container, "RESETPASSWORDHEADER")).toBeInTheDocument()
        expect(getById(view.container, "RESETPASSWORDTEXT")).toBeInTheDocument()

    });
})