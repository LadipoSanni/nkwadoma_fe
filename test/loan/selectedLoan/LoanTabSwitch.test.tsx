import "@testing-library/react"
import {Providers} from "@/app/provider";
import {render, screen, fireEvent} from "@testing-library/react";
import SelectLoanTab from "@/component/selectedLoan/SelectLoanTab";


describe("testing loan tab switch component", ()=> {

    it("test that loan tab is rendered", ()=> {
       render(
           <Providers>
               <SelectLoanTab/>
           </Providers>
       )
       const tab = screen.getByTestId("selectLoanTabs")
       expect(tab).toBeInTheDocument();
    })
    // it("test that onClick event works on tab click", ()=> {
    //      render(
    //         <Providers>
    //             <SelectLoanTab/>
    //         </Providers>
    //     )
    //     const tab = screen.getByTestId("loan requests")
    //     fireEvent.click(tab)
    //     expect(jest.fn()).toHaveBeenCalled()
    // })

    it("test that store update when the tab is been click", ()=> {
        render(
            <Providers>
                <SelectLoanTab/>
            </Providers>
        )

    })


})