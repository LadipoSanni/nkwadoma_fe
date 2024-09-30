import "@testing-library/react"
import {queryByAttribute, render} from "@testing-library/react";
import {Providers} from "@/app/provider";
import SideBar from "@/layout/AdminLayout/SideBar";


// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("should render side bar component", ()=>{
    it('test that side bar component renders', ()=> {
        const getById = queryByAttribute.bind(null, "id")
        const view = render(
            <Providers>
                <SideBar/>
            </Providers>
        )
        const container = getById(view.container, "adminMediumSideBar")
        expect(container).toBeInTheDocument()
    })

    it('test that project logo exist ', ()=> {
        const getById = queryByAttribute.bind(null, "id")
        const view = render(
            <Providers>
                <SideBar/>
            </Providers>
        )
        const container = getById(view.container, "Logo")
        expect(container).toBeInTheDocument()
    })

    it("should render mobile side bar after clicking on hamburger icon ", ()=>{
        const getById = queryByAttribute.bind(null, "id");
        const view = render(
            <Providers>
                <SideBar/>
            </Providers>
        )
        const container = getById(view.container, "blurry")

        expect(container).toBeInTheDocument()
    })


})