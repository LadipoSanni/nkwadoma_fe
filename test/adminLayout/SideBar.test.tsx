import "@testing-library/react"
import {queryByAttribute, render} from "@testing-library/react";
import {Providers} from "@/app/provider";
import SideBar from "@/components/sideBar/index";


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



})