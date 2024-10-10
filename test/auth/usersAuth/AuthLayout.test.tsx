import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import Step1 from "@/features/auth/usersAuth/reset-password/step1/index";
import AuthLayout from "@/layout/authLayout/authLayout";


// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("test auth layout ", ()=> {
    it('should contain the layout container', () => {
        // eslint-disable-next-line react/no-children-prop
        render(<AuthLayout children={<Step1/>}/>)
        expect(screen.getByTestId("authLayoutContainer")).toBeInTheDocument()
    });
    it('should contain organization logo', ()=> {
        // eslint-disable-next-line react/no-children-prop
        render(<AuthLayout children={<Step1/>}/>)
        expect(screen.getByTestId("authLayoutOrganizationLogo")).toBeInTheDocument()
    })
})