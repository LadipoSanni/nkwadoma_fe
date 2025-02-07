import "@testing-library/react"
import {Providers} from "@/app/provider";
import { render, screen} from "@testing-library/react";
import SelectLoanTab from "@/components/selected-loan/SelectLoanTab";


// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));


describe("testing loan tab switch component", ()=> {

    beforeEach(() => {
        <Providers>
            <SelectLoanTab/>
        </Providers>
    })

    it("test that loan tab is rendered", ()=> {
       render(
           <Providers>
               <SelectLoanTab/>
           </Providers>
       )
       const tab = screen.getByTestId("selectLoanContainer")
       expect(tab).toBeInTheDocument();
    })
    // it("test that onClick event works on tab click", ()=> {
    //
    //
    //     const tab = screen.getByTestId("Loan requests")
    //     fireEvent.click(tab)
    //     const currentTab = useAppSelector(state => state.selectedLoan.currentTab)
    //     expect(currentTab).toBe("loan requests")
    // })

    // it("test that store update when the tab is been click", ()=> {
    //     render(
    //         // <Providers>
    //             <SelectLoanTab/>
    //         // </Providers>
    //     )
    //
    // })


})