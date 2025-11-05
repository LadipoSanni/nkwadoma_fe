import { render, screen } from "@testing-library/react";
import Details from "@/components/loanee-my-profile/Details";

// Mock formatting utils so tests don’t depend on their implementation
jest.mock("@/utils/Format", () => ({
    formatAmount: (val: number) => `$${val.toFixed(2)}`,
    formateDigits: (val: number) => val.toLocaleString(),
}));

describe("Details component", () => {
    it("renders name and value", () => {
        render(<Details id="detail1" name="Balance" value={500} valueType="currency" />);

        expect(screen.getByTestId("detail1")).toBeInTheDocument();
        expect(screen.getByText("Balance")).toBeInTheDocument();
        expect(screen.getByText("$500.00")).toBeInTheDocument();
    });

    it("renders percentage value", () => {
        render(<Details id="detail2" name="Progress" value={75} valueType="percentage" />);
        expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("renders years correctly (singular vs plural)", () => {
        render(<Details id="detail3" name="Duration" value={1} valueType="years" />);
        expect(screen.getByText("1 year")).toBeInTheDocument();

        render(<Details id="detail4" name="Duration" value={3} valueType="years" />);
        expect(screen.getByText("3 years")).toBeInTheDocument();
    });

    it("renders digit value formatted", () => {
        render(<Details id="detail5" name="Users" value={1000} valueType="digit" />);
        expect(screen.getByText("1,000")).toBeInTheDocument();
    });

    it("renders tenor correctly (singular vs plural)", () => {
        render(<Details id="detail6" name="Loan Term" value={1} valueType="tenor" />);
        expect(screen.getByText("1 month")).toBeInTheDocument();

        render(<Details id="detail7" name="Loan Term" value={12} valueType="tenor" />);
        expect(screen.getByText("12 months")).toBeInTheDocument();
    });

    it("shows icon when showIcon is true", () => {
        render(<Details id="detail8" name="Info" value={42} valueType="digit" showIcon />);
        expect(screen.getByTestId("detail8").querySelector("svg")).toBeInTheDocument();
    });

    it("hides content and shows loading state when isLoading is true", () => {
        render(<Details id="detail9" name="Loading" value={999} valueType="digit" isLoading />);
        const container = screen.getByTestId("detail9");
        expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    });

    it("applies custom className and sx styles", () => {
        render(
            <Details
                id="detail10"
                name="Custom"
                value={250}
                valueType="currency"
                className="bg-red-100"
                sx="w-1/2"
            />
        );
        const container = screen.getByTestId("detail10");
        expect(container).toHaveClass("bg-red-100");
        expect(container.querySelector("div > div")).toHaveClass("w-1/2");
    });
});
