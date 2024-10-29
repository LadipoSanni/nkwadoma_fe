import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import Index from "../../../../src/features/auth/usersAuth/reset-password/change-password";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('test step 3', () => {

    it('should contain parent container', () => {
        render(
            <Index/>
        )
        expect(screen.getByTestId("Step3Container")).toBeInTheDocument()
    });

    it("should contain two input field", ()=> {
        render(
            <Index/>
        )
        expect(screen.getByTestId("resetNewPasswordInput")).toBeInTheDocument()
        expect(screen.getByTestId("resetConfirmPasswordInput")).toBeInTheDocument()
    })

});