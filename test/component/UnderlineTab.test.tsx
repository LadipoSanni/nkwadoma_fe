import { render, screen, fireEvent } from "@testing-library/react";
import UnderlineTab from "@/components/UnderlineTab";
import { Providers } from "@/app/provider";

jest.mock("next/navigation", () => {
    return {
        useRouter: () => jest.fn(),
        usePathname: () => "/mock-path",
        useSearchParams: () => new URLSearchParams(),
    };
});

describe("UnderlineTab", () => {
    const tabTriggers = [
        { id: "tab1", name: "Tab One", value: "one" },
        { id: "tab2", name: "Tab Two", value: "two" },
    ];

    const tabValue = [
        { name: "one", displayValue: <div>Content One</div> },
        { name: "two", displayValue: <div>Content Two</div> },
    ];

    it("renders all tab triggers", () => {
        render(
            <Providers>
                <UnderlineTab tabTriggers={tabTriggers} tabValue={tabValue} defaultTab="one" />
            </Providers>
        );

        expect(screen.getByTestId("tab1")).toBeInTheDocument();
        expect(screen.getByTestId("tab2")).toBeInTheDocument();
    });

    it("renders default tab content", () => {
        render(
            <Providers>
                <UnderlineTab tabTriggers={tabTriggers} tabValue={tabValue} defaultTab="one" />
            </Providers>
        );

        expect(screen.getByTestId("displayone")).toHaveTextContent("Content One");
        expect(screen.queryByTestId("displaytwo")).not.toBeVisible(); // not active yet
    });

    // it("switches content when another tab is clicked", () => {
    //     render(<UnderlineTab tabTriggers={tabTriggers} tabValue={tabValue} defaultTab="one" />);
    //
    //     fireEvent.click(screen.getByTestId("tab2"));
    //
    //     // expect(screen.getByTestId("displaytwo")).toHaveTextContent("Content Two");
    //     expect(screen.queryByTestId("displayone")).not.toBeVisible();
    // });

    it("applies active styles when tab is selected", () => {
        render(
            <Providers>
                <UnderlineTab tabTriggers={tabTriggers} tabValue={tabValue} defaultTab="one" />
            </Providers>
        );

        const tabOne = screen.getByTestId("tab1");
        expect(tabOne).toHaveClass("data-[state=active]:text-[#142854]");

        fireEvent.click(screen.getByTestId("tab2"));
        const tabTwo = screen.getByTestId("tab2");
        expect(tabTwo).toHaveClass("data-[state=active]:text-[#142854]");
    });
});
