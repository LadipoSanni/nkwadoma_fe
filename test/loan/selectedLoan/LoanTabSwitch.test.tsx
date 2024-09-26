import "@testing-library/react"
import {Providers} from "@/app/provider";
import {render, screen} from "@testing-library/react";
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

})