import { render, screen, fireEvent,cleanup} from "@testing-library/react";
import OrganizationActionBar from "@/components/portfolio-manager/Organization-action-bar";


describe("OrganizationActionBar", () => {
    beforeEach(() => {
      
        cleanup()
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });

      const mockHandleInviteClick = jest.fn();
      const mockOnChange = jest.fn();
  
      afterEach(cleanup);

      const defaultProps = {
        id: "search-input",
        value: "",
        onChange: mockOnChange,
        handleInviteOrganizationClick: mockHandleInviteClick,
      }

      beforeEach(() => {
        render(<OrganizationActionBar {...defaultProps} />);
        
      })

      test("renders without crashing", () => {
        expect(screen.getByRole("textbox")).toBeInTheDocument();
      });

      test("renders the search input with the correct id", () => {
        expect(screen.getByRole("textbox")).toHaveAttribute("id", "search-input");
      });

      test("renders the Invite Organization button", () => {
        expect(screen.getByText("Invite organization")).toBeInTheDocument();
      });

      test("calls onChange when typing in the search input", () => {
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Test" } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
      });

      test("calls handleInviteClick when Invite Organization button is clicked", () => {
        const button = screen.getByText("Invite organization");
        fireEvent.click(button);
        expect(mockHandleInviteClick).toHaveBeenCalledTimes(1);
      });
      test("renders buttons with correct class names", () => {
        const inviteButton = screen.getByText("Invite organization");
        expect(inviteButton).toHaveClass("bg-meedlBlue");
      });

      test("handles empty search input without errors", () => {
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "" } });
        expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
      });

      test("Invite Organization button is clickable", () => {
        const button = screen.getByText("Invite organization");
        expect(button).toBeEnabled();
      });

      test("renders responsive classes for buttons", () => {
        const inviteButton = screen.getByText("Invite organization");
        expect(inviteButton).toHaveClass("md:w-[166px]");
      });

      test("renders responsive classes for search input", () => {
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("flex-grow");
      });
    })
       