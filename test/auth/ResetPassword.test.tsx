import "@testing-library/react"
import ResetPassword from "@/features/auth/reset-password/ResetPassword";
import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";


// type TestElement = Document | Element | Window | Node

describe("test reset password", ()=> {
    const getById = queryByAttribute.bind(null, "id")
    // function hasInput ( element:TestElement , testValue: string) {
    //     return screen.getByDisplayValue(testValue) === element
    // }


    it('should display reset password component', () => {
        const view = render(
            <ResetPassword/>
        )
        expect(getById(view.container, "resetPasswordComponent")).toBeInTheDocument()
    });

    it('should display reset password component display it headers', () => {
        const view = render(
            <ResetPassword/>
        )
        expect(getById(view.container, "RESETPASSWORDHEADER")).toBeInTheDocument()
        expect(getById(view.container, "RESETPASSWORDTEXT")).toBeInTheDocument()

    });
    it('should contain email input field', () => {
        const view = render(
            <ResetPassword/>
        )
        expect(getById(view.container, "resetEmailInput")).toBeInTheDocument()
    });
    it('should contain email input field which ', () => {
         render(
            <ResetPassword/>
        )
        const emailInput = screen.getByRole('textbox' ,{name: /Email address/i})
        expect(emailInput).toBeInTheDocument()
        fireEvent.change(emailInput, {target: {value : "Jay"}});
        expect(emailInput).toHaveValue("Jay")

    });
    it('should disable submit button if input field is empty ', () => {
        render(
            <ResetPassword/>
        )
        const button = screen.getByRole('button')
        expect(button).toBeDisabled();
    });
    it('should able submit button if input field is not empty ', () => {
        render(
            <ResetPassword/>
        )
        const button = screen.getByRole('button')
        const emailInput = screen.getByRole('textbox' ,{name: /Email address/i})
        expect(emailInput).toBeInTheDocument()
        fireEvent.change(emailInput, {target: {value : "Jay"}});
        expect(button);
    });
    // it("should route to login when log in is clicked", ()=> {
    //     const history = createMemoryHistory({initialEntries : ['/auth/login']})
    // })
})