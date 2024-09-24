import "@testing-library/react"
import Home from "@/app/page";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';


describe("testing home component", ()=> {
    it('test that button renders', ()=> {
        render(<Home />);
        const button = screen.getAllByText("Deploy now");
        expect(button);
    })

    it(`test that the img with the incorrect id will not render`, ()=> {
        render(<Home/>);
        const deployButton = screen.queryByTestId('deployButton');

        expect(deployButton).not.toBeInTheDocument();
    });

    it(`test that the img with the correct property is rendered`, ()=>{
        render(<Home/>)
        const deployButton = screen.getByTestId('deploy-button');

        expect(deployButton).toBeInTheDocument();

        const parentAnchor = deployButton.closest('a');
        expect(parentAnchor).toHaveAttribute('href', 'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app');

        expect(deployButton).toHaveAttribute('alt', 'Vercel logomark');

        expect(deployButton).toHaveAttribute('width', '20');
        expect(deployButton).toHaveAttribute('height', '20');
    });
})