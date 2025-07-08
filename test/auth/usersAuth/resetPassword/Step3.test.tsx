import "@testing-library/react"
import {render, screen,cleanup} from "@testing-library/react";
import Index from "../../../../src/features/auth/usersAuth/reset-password/change-password";
import {Providers} from "@/app/provider";


// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    useSearchParams: jest.fn().mockImplementation(() => {
        return new URLSearchParams(window.location.search);
    }),
    usePathname: jest.fn().mockImplementation((pathArg) => {
        return pathArg;
    })

}));

describe('test step 3', () => {
       beforeEach(() => {
            cleanup()
              jest.spyOn(console,'log').mockReturnValue()
              jest.spyOn(console,'warn').mockReturnValue()
              jest.spyOn(console,'error').mockReturnValue()
          });
    

    it('should contain parent container', () => {
        render(
            <Providers>
                <Index/>
            </Providers>
        )
        expect(screen.getByTestId("Step3Container")).toBeInTheDocument()
    });

    it("should contain two input field", ()=> {
        render(
            <Providers>
                <Index/>
            </Providers>
        )
        expect(screen.getByTestId("resetNewPasswordInput")).toBeInTheDocument()
        expect(screen.getByTestId("resetConfirmPasswordInput")).toBeInTheDocument()
    })

});