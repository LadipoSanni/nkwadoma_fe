import "@testing-library/react"
import {render, screen} from "@testing-library/react";
import AuthEmail from "@/reuseable/modals/AuthEmail";
import {Providers} from "@/app/provider";

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("test email modal", ()=> {

    it('should renders auth email component', () => {
        render(
            <Providers>
                <AuthEmail/>

            </Providers>
        )
        expect(screen.getByTestId("authEmailModal"))
    });
    it('should render success icon', () => {
        render(
            <Providers>
                <AuthEmail/>
            </Providers>
        )
        expect(screen.getByTestId("successIconContainer"))
        expect(screen.getByTestId("successIcon"))

    });
    it('should contain a modal header text', () => {
        render(
        <Providers>
            <AuthEmail header={'Email sent'}/>
        </Providers>
        )
        expect(screen.getByTestId("modalHeaderText"))
    });
    // it('should contain text', () => {
    //     render(
    //         <Providers>
    //             <AuthEmail text={'We’ve sent a link to create a new password to naeche@meddl.africa. If it’s not in your inbox, check your spam folder.'}/>
    //         </Providers>
    //     )
    //     expect(screen.getByTestId("modalText"))
    // });
})