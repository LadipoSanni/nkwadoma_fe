import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import Index from "@/features/auth/usersAuth/reset-password/step3";

describe('test step 3', () => {

    it('should contain parent container', () => {
        render(
            <Index/>
        )
        expect(screen.getByTestId("Step3Container"))
    });

    it("should contain two input field", ()=> {
        render(
            <Index/>
        )
        expect(screen.getByTestId("resetNewPasswordInput"))
        expect(screen.getByTestId("resetConfirmPasswordInput"))
    })
});