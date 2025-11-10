/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen,
    // fireEvent, waitFor
} from "@testing-library/react";
import SearchableDropdown, { DropdownItem } from "@/reuseable/Dropdown/SearchableDropDown";

// // Mock shadcn/ui dropdown primitives to render directly
// jest.mock("@/components/ui/dropdown-menu", () => {
//     const Actual = jest.requireActual("react");
//     return {
//         DropdownMenu: ({ children }: any) => <div>{children}</div>,
//         DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
//         DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
//         DropdownMenuItem: ({ children, onClick }: any) => (
//             <div data-testid="dropdown-item" onClick={onClick}>
//                 {children}
//             </div>
//         ),
//     };
// });

// jest.mock("@/components/ui/input", () => ({
//     Input: (props: any) => (
//         <input
//             {...props}
//             data-testid={props["data-testid"] || "input"}
//             onChange={(e) => props.onChange?.(e)}
//         />
//     ),
// }));
//
// // Mock font imports
// jest.mock("@/app/fonts", () => ({
//     inter500: { className: "mock-font" },
// }));

describe("SearchableDropdown", () => {
    const items: DropdownItem<string>[] = [
        { id: 1, label: "Access Bank", subLabel: "1234567890" },
        { id: 2, label: "GTBank", subLabel: "9876543210" },
    ];

    it("renders placeholder correctly", () => {
        render(<SearchableDropdown items={items} placeholder="Select bank" />);
        expect(screen.getByText("Select bank")).toBeInTheDocument();
    });

    // it("renders all dropdown items", async () => {
    //     render(<SearchableDropdown items={items} placeholder="Select bank" />);
    //     const triggerButton = screen?.getByTestId('dropDown'+ 'Selectbank')
    //     // Open dropdown (since mock doesn't handle internal state)
    //     fireEvent.click(triggerButton)
    //     await waitFor(() => {
    //         expect( screen.getByTestId('item' + 0)).toBeInTheDocument();
    //         expect(screen.getByTestId('item' + 1)).toBeInTheDocument();
    //     })
    // });
    //
    // it("filters items when typing in search input", async () => {
    //     render(<SearchableDropdown items={items} showSearch />);
    //
    //     const searchInput = screen.getByTestId("searchBar");
    //     fireEvent.change(searchInput, { target: { value: "GTBank" } });
    //
    //     await waitFor(() => {
    //         expect(screen.getByText("GTBank")).toBeInTheDocument();
    //         expect(screen.queryByText("Access Bank")).not.toBeInTheDocument();
    //     });
    // });
    //
    // it("calls onSelect when item clicked", async () => {
    //     const onSelectMock = jest.fn();
    //     render(<SearchableDropdown items={items} onSelect={onSelectMock} />);
    //
    //     const gtBankItem = screen.getByText("GTBank");
    //     fireEvent.click(gtBankItem);
    //
    //     expect(onSelectMock).toHaveBeenCalledWith(
    //         expect.objectContaining({ id: 2, label: "GTBank" })
    //     );
    // });
    //
    // it("renders footer note when provided", () => {
    //     render(
    //         <SearchableDropdown
    //             items={items}
    //             footerNote="You can pay from one or more linked accounts."
    //         />
    //     );
    //     expect(
    //         screen.getByText("You can pay from one or more linked accounts.")
    //     ).toBeInTheDocument();
    // });
    //
    // it("renders custom item using renderItem prop", () => {
    //     render(
    //         <SearchableDropdown
    //             items={items}
    //             renderItem={(item) => <div>Custom: {item.label}</div>}
    //         />
    //     );
    //     expect(screen.getByText("Custom: Access Bank")).toBeInTheDocument();
    //     expect(screen.getByText("Custom: GTBank")).toBeInTheDocument();
    // });
});
