import "@testing-library/react"
import {Providers} from "@/app/provider";
import {cleanup, render, screen} from "@testing-library/react";
import SideBar from "@/components/sideBar";

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('side test', ()=> {
    beforeEach(() => {
        cleanup()
    })

    beforeEach(() => {
        render(
            <Providers>
                <SideBar/>
            </Providers>
        )
    })
    it('should contain organization logo', () => {

        expect(screen.getByTestId(/meddleMainLogoOnAdminLayout/i)).toBeInTheDocument()
    });

    it('should contain component router', () => {
        expect(screen.getByTestId("loan")).toBeInTheDocument()
    });
})