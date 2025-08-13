import "@testing-library/react"
import {render, screen,cleanup} from "@testing-library/react";
import Step1 from "@/features/auth/usersAuth/reset-password/enter-email-component/index";
import Index from "@/layout/authLayout";


const mockUsePathname = jest.fn();

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },

    usePathname: () => mockUsePathname,

}));

describe("test auth layout ", ()=> {
    
  beforeEach(() => {
          cleanup()
            jest.spyOn(console,'log').mockReturnValue()
            jest.spyOn(console,'warn').mockReturnValue()
            jest.spyOn(console,'error').mockReturnValue()
        });


    it('should contain the layout container', () => {
        // eslint-disable-next-line react/no-children-prop
        render(<Index children={<Step1/>}/>)
        expect(screen.getByTestId("authLayoutContainer")).toBeInTheDocument()
    });
    it('should contain organization logo', ()=> {
        // eslint-disable-next-line react/no-children-prop
        render(<Index children={<Step1/>}/>)
        expect(screen.getAllByTestId("authLayoutOrganizationLogo"))
    })
})