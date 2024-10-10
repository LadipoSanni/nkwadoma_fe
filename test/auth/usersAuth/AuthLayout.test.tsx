import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import Step1 from "@/features/auth/usersAuth/reset-password/step1";
import AuthLayout from "@/layout/authLayout/authLayout";

describe("test auth layout ", ()=> {
    it('should contain the layout container', () => {
        // eslint-disable-next-line react/no-children-prop
        render(<AuthLayout children={<Step1/>}/>)
        expect(screen.getByTestId("authLayoutContainer"))
    });
    it('should contain organization logo', ()=> {
        // eslint-disable-next-line react/no-children-prop
        render(<AuthLayout children={<Step1/>}/>)
        expect(screen.getByTestId("authLayoutOrganizationLogo"))
    })
})