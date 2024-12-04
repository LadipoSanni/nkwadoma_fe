import { render, screen, fireEvent,cleanup} from "@testing-library/react";
import InvestmentActionBar from "@/components/portfolio-manager/fund/Investment-action-bar";


describe("InvestmentActionBar", () => {
    beforeEach(() => {
      
        cleanup()
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });

      const mockHandleDraftClick = jest.fn();
      const mockHandleCreateInvestmentVehicleClick = jest.fn();
      const mockOnChange = jest.fn();
  
      afterEach(cleanup);

      const defaultProps = {
        id: "search-input",
        value: "",
        onChange: mockOnChange,
        handleDraftClick: mockHandleDraftClick,
        handleCreateInvestmentVehicleClick: mockHandleCreateInvestmentVehicleClick,
    };

    test("renders without crashing", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("renders the search input with the correct id", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        expect(screen.getByRole("textbox")).toHaveAttribute("id", "search-input");
    });

    test("renders the Drafts button", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        expect(screen.getByText("Drafts")).toBeInTheDocument();
    });

    test("renders the Create Investment Vehicle button", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        expect(screen.getByText("Create investment vehicle")).toBeInTheDocument();
    });

    test("calls onChange when typing in the search input", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Test" } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    test("calls handleDraftClick when Drafts button is clicked", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        const button = screen.getByText("Drafts");
        fireEvent.click(button);
        expect(mockHandleDraftClick).toHaveBeenCalledTimes(1);
    });

    test("calls handleCreateInvestmentVehicleClick when Create Investment Vehicle button is clicked", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        const button = screen.getByText("Create investment vehicle");
        fireEvent.click(button);
        expect(mockHandleCreateInvestmentVehicleClick).toHaveBeenCalledTimes(1);
    });

    test("renders buttons with correct class names", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        const draftsButton = screen.getByText("Drafts");
        const createButton = screen.getByText("Create investment vehicle");
        expect(draftsButton).toHaveClass("border-[#142854]");
        expect(createButton).toHaveClass("h-[45px]");
    });
   
    test("handles empty search input without errors", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "" } });
        expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
    });

    test("Drafts button is clickable", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        const button = screen.getByText("Drafts");
        expect(button).toBeEnabled();
    });

    test("Create Investment Vehicle button is clickable", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        const button = screen.getByText("Create investment vehicle");
        expect(button).toBeEnabled();
    });

    test("renders responsive classes for buttons", () => {
        render(<InvestmentActionBar {...defaultProps} />);
        const draftsButton = screen.getByText("Drafts");
        const createButton = screen.getByText("Create investment vehicle");
        expect(draftsButton).toHaveClass("md:w-[105px]");
        expect(createButton).toHaveClass("md:w-[217px]");
    });

    test("handles custom id for the search input", () => {
        const props = { ...defaultProps, id: "custom-search" };
        render(<InvestmentActionBar {...props} />);
        expect(screen.getByRole("textbox")).toHaveAttribute("id", "custom-search");
    });

})