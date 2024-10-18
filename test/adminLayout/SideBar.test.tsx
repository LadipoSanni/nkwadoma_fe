import "@testing-library/react"
import {cleanup, queryByAttribute,screen, render} from "@testing-library/react";
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
    beforeEach(() => {
        cleanup()
    })
    const handleClick = jest.fn()

    beforeEach(()=> {
        render(
            <Providers>
                <Providers>
                    <SideBar/>
                </Providers>
            </Providers>
        )
    })
    it('test that side bar component renders', ()=> {
        expect(screen.getByTestId(/adminMediumSideBar/i)).toBeInTheDocument()
    })

    it('test that project logo exist ', ()=> {
        const getById = queryByAttribute.bind(null, "id")
        const view = render(
            <Providers>
                <SideBar/>
            </Providers>
        )
        const container = getById(view.container, "meddleMainLogoOnAdminLayout")
        expect(container).toBeInTheDocument()
    })
    it('should contain navbar items ', () => {
        expect(screen.getByTestId("program")).toBeInTheDocument()
        expect(screen.getByTestId("loan")).toBeInTheDocument()
        expect(screen.getByTestId("cohort")).toBeInTheDocument()

    });


})