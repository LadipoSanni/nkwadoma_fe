import { render, screen, fireEvent,cleanup} from "@testing-library/react";
import { Providers } from "@/app/provider";
import Organization from "@/features/portfolio-manager/organization/view-organization";

describe("Portfolio Manager", () => {
    beforeEach(() => {
        cleanup()
        render(
            <Providers>
                <Organization />
            </Providers>
        );
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });

      test("renders Organization without crashing", () => {
        expect(screen.getByText("Active")).toBeInTheDocument();
        expect(screen.getByText("Invited")).toBeInTheDocument();
        expect(screen.getByText("Deactivated")).toBeInTheDocument();
    });

    // test("renders table headers for organizations", () => {
    //     const headers = screen.getAllByText("Name");
    //     expect(headers[0]).toBeInTheDocument();
    //     expect(headers[1] ).toBeInTheDocument();
    //
    // });
    //
    // test("renders table data for organizations", () => {
    //     const allRows = screen.getAllByRole("row");
    //     expect(allRows.length).toBeGreaterThan(0);
    // });
    //
    // test("renders action bar", () => {
    //     const input = screen.getByRole("textbox");
    //     const createButton = screen.getByText("Invite organization");
    //     expect(input).toBeInTheDocument();
    //     expect(createButton).toBeInTheDocument();
    // });
    //
    // test("renders action bar for Invited after tab switcher", () => {
    //     fireEvent.click(screen.getByTestId("tabDataNameactive"));
    //     const input = screen.getByRole("textbox");
    //     const createButton = screen.getByText("Invite organization");
    //     expect(input).toBeInTheDocument();
    //     expect(createButton).toBeInTheDocument();
    // })
    //
    // test("renders action bar for Deactivated after tab switcher", () => {
    //     fireEvent.click(screen.getByTestId("tabDataNamedeactivate"));
    //     const input = screen.getByRole("textbox");
    //     const createButton = screen.getByText("Invite organization");
    //     expect(input).toBeInTheDocument();
    //     expect(createButton).toBeInTheDocument();
    // })
    //
    // test("renders table headers for Commercial fund", () => {
    //     fireEvent.click(screen.getByTestId("tabDataNameactive"));
    //     const allVehicles = screen.getAllByText("Name");
    //     expect(allVehicles[0]).toBeInTheDocument();
    //     const allStartDate = screen.getAllByText("Historical debt")
    //     expect(allStartDate[0]).toBeInTheDocument();
    // });
    //
    // test("handles Invite organization button click", () => {
    //     const mockHandleInviteOrganizationClick = jest.fn();
    //
    //     const createButton = screen.getByText("Invite organization");
    //     fireEvent.click(createButton);
    //     expect(mockHandleInviteOrganizationClick).toHaveBeenCalledTimes(0);
    // });

})