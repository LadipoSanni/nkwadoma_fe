import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import Step1 from "@/features/auth/usersAuth/reset-password/step1/index";
import Index from "@/layout/authLayout";


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
        render(<Index children={<Step1/>}/>)
        expect(screen.getByTestId("authLayoutContainer")).toBeInTheDocument()
    });
    it('should contain organization logo', ()=> {
        render(<Index children={<Step1/>}/>)
        expect(screen.getAllByTestId("authLayoutOrganizationLogo"))
    })
})