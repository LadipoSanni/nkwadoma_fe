import "@testing-library/react"
import Index from "@/features/auth/usersAuth/reset-password/step1";
import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";
import { useRouter } from 'next/router';


// type TestElement = Document | Element | Window | Node
// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));


describe("test reset password", ()=> {
    const getById = queryByAttribute.bind(null, "id")
    // function hasInput ( element:TestElement , testValue: string) {
    //     return screen.getByDisplayValue(testValue) === element
    // }


    it('should display reset password component', () => {
        const view = render(
            <Index/>
        )
        expect(getById(view.container, "resetPasswordComponent")).toBeInTheDocument()
    });

    it('should display reset password component display it headers', () => {
        const view = render(
            <Index/>
        )
        expect(getById(view.container, "RESETPASSWORDHEADER")).toBeInTheDocument()
        expect(getById(view.container, "RESETPASSWORDTEXT")).toBeInTheDocument()

    });
    it('should contain email input field', () => {
        const view = render(
            <Index/>
        )
        expect(getById(view.container, "resetEmailInput")).toBeInTheDocument()
    });
    it('should contain email input field which ', () => {
         render(
            <Index/>
        )
        const emailInput = screen.getByRole('textbox' ,{name: /Email address/i})
        expect(emailInput).toBeInTheDocument()
        fireEvent.change(emailInput, {target: {value : "Jay"}});
        expect(emailInput).toHaveValue("Jay")

    });
    it('should disable submit button if input field is empty ', () => {
        render(
            <Index/>
        )
        const button = screen.getByRole('button')
        expect(button).toBeDisabled();
    });
    it('should able submit button if input field is not empty ', () => {
        render(
            <Index/>
        )
        const button = screen.getByRole('button')
        const emailInput = screen.getByRole('textbox' ,{name: /Email address/i})
        expect(emailInput).toBeInTheDocument()
        fireEvent.change(emailInput, {target: {value : "Jay"}});
        expect(button);
    });

    // it("should route to login when log in is clicked", ()=> {
    //     // useRouter.mockReturnValue({
    //     //     pathname: '/auth/login'
    //     // });
    //     render(<Index/>
    //     )
    //
    //     fireEvent.click(screen.getByRole('button'))
    //     expect(useRouter().push).toHaveBeenCalledTimes(1)
    //     expect(useRouter().push).toHaveBeenCalledWith("/auth/login")
    // })
})