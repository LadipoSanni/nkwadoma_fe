import {cleanup, render, screen} from "@testing-library/react";
import NavbarItems from "@/reuseable/ui/navbarItems";
import {Providers} from "@/app/provider";
import {navbarItemsProps} from "@/types/Component.type";
import {MdOutlineHome} from "react-icons/md"

const mockData: navbarItemsProps[] = [
    {id: 'loanRoute', name: 'Loan', route: '/loan', icon: <MdOutlineHome/> },
    {id: 'overView', name: 'Overview', route: '/overview',icon:<MdOutlineHome/>},
    {id: 'program', name: 'Program', route: '/program',icon:<MdOutlineHome/> },
    {id: 'cohort', name: 'Cohort', route: '/cohort',icon:<MdOutlineHome/>},
]

describe('test navbar item', ()=> {
    beforeEach(() => {
        cleanup()
    })

    beforeEach(()=> {
        render(
            <Providers>
                <NavbarItems
                    navbarItems={mockData}
                />
            </Providers>
        )
    })
    it('should contain the parent container', ()=> {
        expect(screen.getByTestId(/navBarItemsContainer/i)).toBeInTheDocument()
    })
    it('should contain nav items', () => {
        expect(screen.getByTestId(/loan/i)).toBeInTheDocument()
        expect(screen.getByTestId(/adminOverview/i)).toBeInTheDocument()
        expect(screen.getByTestId(/cohort/i)).toBeInTheDocument()
        expect(screen.getByTestId(/program/i)).toBeInTheDocument()

    });
})