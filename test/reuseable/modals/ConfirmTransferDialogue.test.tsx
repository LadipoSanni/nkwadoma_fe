import ConfirmTransferDialogue from "@/reuseable/modals/ConfirmTransferDualogue";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("ConfirmTransferDialogue", () => {
    it("renders the component", () => {
        render(<ConfirmTransferDialogue headerTitle="Success" amount="$100" />);
        expect(screen.getByTestId('Successful transfer modal')).toBeInTheDocument();
    });

    it("renders the success modal with the correct content", () => {
        render(<ConfirmTransferDialogue headerTitle="Success" amount="$100" />);

        expect(screen.getByAltText("Success Icon")).toBeInTheDocument();
        expect(screen.getByText("Transfer Success")).toBeInTheDocument();
        expect(
            screen.getByText("Congratulations! You’ve successfully completed the transfer of $100 to Meedl Africa")
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Go to market/i })).toBeInTheDocument();
    });

    it("navigates to marketplace when the button is clicked", () => {
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push });

        render(<ConfirmTransferDialogue headerTitle="Success" amount="$100" />);

        fireEvent.click(screen.getByRole("button", { name: /Go to market/i }));
        expect(push).toHaveBeenCalledWith("/marketplace");
    });
});
