import "@testing-library/react"
import Home from "@/app/page";
import {render, screen} from "@testing-library/react";


describe("testing home component", ()=> {
    it('test that button renders', ()=> {
        render(<Home />);
        const button = screen.getAllByText("Deploy now");
        expect(button);
    })
})