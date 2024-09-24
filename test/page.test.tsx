import "@testing-library/react"
import Home from "@/app/page";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import { Providers } from "@/app/provider";



describe("testing home component", ()=> {

    const renderComponent = () => {
     return render(
            <Providers>
                <Home />
            </Providers>
        )
    }


    it(`test that the img with the incorrect id will not render`, ()=> {
        renderComponent()
        const deployButton = screen.queryByTestId('deployButton');

        expect(deployButton).not.toBeInTheDocument();
    });

    
})