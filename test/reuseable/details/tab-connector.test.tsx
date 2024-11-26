import {render, screen} from "@testing-library/react";
import TabConnector from "@/reuseable/details/tab-connector";


describe("test tab connector component",()=> {
    it('should contain main container', () => {
        const tab = [
            "user",
            "anme"
        ]
        render(<TabConnector tabNames={tab}/>)
        expect(screen.getByTestId("tabConnectContainer"))
    });
    it('should contain the tabs passed as a props', () => {
            const tab = [
                "user",
                "anme"
            ]
            render(<TabConnector tabNames={tab}/>)
            expect(screen.getByTestId("tabuser"))
    });

} )