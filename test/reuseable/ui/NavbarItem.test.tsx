import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import NavbarRouter from "../../../src/reuseable/ui/navbarRouter";
import {Providers} from "@/app/provider";
import {navbarRouterItemsProps} from "@/types/Component.type";
import {MdOutlineHome} from "react-icons/md"

const mockData: navbarRouterItemsProps[] = [
    {id: 'loanRoute', name: 'Loan', route: '/loan', icon: <MdOutlineHome/> },
    {id: 'overView', name: 'Overview', route: '/overview',icon:<MdOutlineHome/>},
    {id: 'program', name: 'Program', route: '/program',icon:<MdOutlineHome/> },
    {id: 'cohort', name: 'Cohort', route: '/cohort',icon:<MdOutlineHome/>},
]

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => jest.fn(),
}));
describe('test navbar item', ()=> {
    beforeEach(() => {
        cleanup()
    })
    const handleClick = jest.fn()

    beforeEach(()=> {
        render(
            <Providers>
                <NavbarRouter
                    currentTab={''}
                    handleClick={handleClick}
                    navbarItems={mockData}
                />
            </Providers>
        )
    })
    it('should contain the parent container', ()=> {
        expect(screen.getByTestId(/navBarItemsContainer/i)).toBeInTheDocument()
    })
    it('should contain nav items', () => {
        expect(screen.getByTestId("loanRoute")).toBeInTheDocument()
        expect(screen.getByTestId("overView")).toBeInTheDocument()
        expect(screen.getByTestId("cohort")).toBeInTheDocument()
        expect(screen.getByTestId("program")).toBeInTheDocument()

    });
    it('should called on click function when clicked', () => {
        const button = screen.getByTestId("overView")
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalled()
    });
})