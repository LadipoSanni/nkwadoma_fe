import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import Step3 from "@/features/auth/reset-password/Step3";

describe('test step 3', () => {

    it('should contain parent container', () => {
        render(
            <Step3/>
        )
        expect(screen.getByTestId("Step3Container"))
    });

    it("should contain two input field", ()=> {
        render(
            <Step3/>
        )
        expect(screen.getByTestId("resetNewPasswordInput"))
        expect(screen.getByTestId("resetConfirmPasswordInput"))
    })
});