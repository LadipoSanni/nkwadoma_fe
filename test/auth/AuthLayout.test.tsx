import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import ResetPassword from "@/features/auth/reset-password/ResetPassword";
import AuthLayout from "@/layout/authLayout/authLayout";

describe("test auth layout ", ()=> {
    it('should contain the layout container', () => {
        // eslint-disable-next-line react/no-children-prop
        render(<AuthLayout children={<ResetPassword/>}/>)
        expect(screen.getByTestId("authLayoutContainer"))
    });
    it('should contain organization logo', ()=> {
        // eslint-disable-next-line react/no-children-prop
        render(<AuthLayout children={<ResetPassword/>}/>)
        expect(screen.getByTestId("authLayoutOrganizationLogo"))
    })
})