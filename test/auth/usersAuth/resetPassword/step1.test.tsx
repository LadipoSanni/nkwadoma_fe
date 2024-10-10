import "@testing-library/react"
import Step1 from "@/features/auth/usersAuth/reset-password/step1";
import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";


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
            <Step1/>
        )
        expect(getById(view.container, "resetPasswordComponent")).toBeInTheDocument()
    });

    it('should display reset password component display it headers', () => {
        const view = render(
            <Step1/>
        )
        expect(getById(view.container, "RESETPASSWORDHEADER")).toBeInTheDocument()
        expect(getById(view.container, "RESETPASSWORDTEXT")).toBeInTheDocument()

    });
    it('should contain email input field', () => {
        const view = render(
            <Step1/>
        )
        expect(getById(view.container, "resetEmailInput")).toBeInTheDocument()
    });
    it('should contain email input field which ', () => {
         render(
            <Step1/>
        )
        const emailInput = screen.getByRole('textbox' ,{name: /Email address/i})
        expect(emailInput).toBeInTheDocument()
        fireEvent.change(emailInput, {target: {value : "Jay"}});
        expect(emailInput).toHaveValue("Jay")

    });
    it('should disable submit button if input field is empty ', () => {
        render(
            <Step1/>
        )
        const button = screen.getByRole('button')
        expect(button).toBeDisabled();
    });
    it('should able submit button if input field is not empty ', () => {
        render(
            <Step1/>
        )
        const button = screen.getByRole('button',{name: /Log in/i})
        const emailInput = screen.getByRole('textbox' ,{name: /Email address/i})
        expect(emailInput).toBeInTheDocument()
        fireEvent.change(emailInput, {target: {value : "Jay"}});
        expect(button).toBeInTheDocument();
    });

    // it("should route to login when log in is clicked", ()=> {
    //     render(<Index/>
    //     )
    //
    //     fireEvent.click(screen.getByRole('button', {name: /Reset password/i}))
    //     awaitExpression() expect(screen.getAllByText(/Log in to your account/i)).toBeInTheDocument()
    // })
})