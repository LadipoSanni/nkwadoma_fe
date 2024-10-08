import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import Index from "@/features/auth/usersAuth/reset-password/step1";
import AuthLayout from "@/layout/authLayout/authLayout";

describe("test auth layout ", ()=> {
    it('should contain the layout container', () => {
        // eslint-disable-next-line react/no-children-prop
        render(<AuthLayout children={<Index/>}/>)
        expect(screen.getByTestId("authLayoutContainer"))
    });
    it('should contain organization logo', ()=> {
        // eslint-disable-next-line react/no-children-prop
        render(<AuthLayout children={<Index/>}/>)
        expect(screen.getByTestId("authLayoutOrganizationLogo"))
    })
})