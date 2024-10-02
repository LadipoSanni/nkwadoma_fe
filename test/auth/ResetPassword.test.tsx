import "@testing-library/react"
import ResetPassword from "@/features/auth/reset-password/ResetPassword";
import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

type TestElement = Document | Element | Window | Node

describe("test reset password", ()=> {
    const getById = queryByAttribute.bind(null, "id")
    function hasInput ( element:TestElement , testValue: string) {
        return screen.getByDisplayValue(testValue) === element
    }


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
    it('should contain two input fields', () => {
        const view = render(
            <ResetPassword/>
        )
        expect(getById(view.container, "newPassWordContainer")).toBeInTheDocument()
        expect(getById(view.container, 'resetEmailField')).toBeInTheDocument()
    });
    // it('should contain two input fields where one is and disabled and the other is not', () => {
    //      render(
    //         <ResetPassword/>
    //     )
    //     const disabledInput = screen.getByTestId('resetEmailField' )
    //     const Input = screen.getByTestId('newPassWordContainer' )
    //     // fireEvent.change(disabledInput, {target: {value: "hello@gmail.com"}})
    //     // fireEvent.change(Input, {target: {value: "hello@12.com"}})
    //     // const input = screen.findByTestId("name-input");
    //     userEvent.type(Input, "Jay");
    //     expect(Input.ariaValueNow).toHaveValue("Jay")
    //
    // });
})