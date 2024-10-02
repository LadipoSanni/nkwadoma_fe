import "@testing-library/react"
import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";
import AuthButton from "@/reuseable/buttons/AuthButton";

describe("test that auth button is rendering when it is called", ()=> {
    const getById = queryByAttribute.bind(null, "id")
    it('should display button component when called', () => {
        const handleClick = jest.fn()
        const buttonComponent  = render(
            <AuthButton buttonText={"test"} handleClick={handleClick} id={"testId"} width={"5rem"} backgroundColor={"#0d9b48"} key={"testing"} textColor={"white"}/>
        )
        expect(getById(buttonComponent.container, "testId")).toBeInTheDocument()
    });
    it('should display button text passed as props', () => {
        const handleClick = jest.fn()
        render(
            <AuthButton buttonText={"test"} handleClick={handleClick} id={"testId"} width={"5rem"} backgroundColor={"#0d9b48"} key={"testing"} textColor={"white"}/>
        )
        expect(screen.queryByText("test")).toBeInTheDocument()
    });
    it('should call the handleClick function passed as props when button is clicked', () => {
        const handleClick = jest.fn()
        render(
            <AuthButton buttonText={"test"} handleClick={handleClick} id={"testId"} width={"5rem"} backgroundColor={"#0d9b48"} key={"testing"} textColor={"white"}/>
        )
        const element = screen.getByText(/test/i)
        fireEvent.click(element)
        expect(handleClick).toHaveBeenCalled()
    });

})