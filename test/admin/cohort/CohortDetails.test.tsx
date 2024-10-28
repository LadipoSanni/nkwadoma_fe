import {render, screen, fireEvent, cleanup} from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import CohortDetails from "@/pages/traineeInstitute/cohort/CohortDetails/Index";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("CohortDetails Component", () => {
    const mockPush = jest.fn();
    const mockRouter = {
        push: mockPush,
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        cleanup();
        jest.spyOn(console,'log').mockReturnValue();
        jest.spyOn(console,'warn').mockReturnValue();
        jest.spyOn(console,'error').mockReturnValue();
    });

    test("renders cohort title and description", () => {
        render(<CohortDetails />);

        expect(screen.getByText("Luminary")).toBeInTheDocument();
        expect(screen.getByText(/Design thinking is a process/i)).toBeInTheDocument();
    });

    test("displays the correct cohort details data", () => {
        render(<CohortDetails />);

        expect(screen.getByText("Start Date")).toBeInTheDocument();
        expect(screen.getByText("13, Dec 2023")).toBeInTheDocument();
        expect(screen.getByText("Number employed")).toBeInTheDocument();
        expect(screen.getByText("38")).toBeInTheDocument();
    });

    test("go back button navigates to /cohort", () => {
        render(<CohortDetails />);

        const backButton = screen.getByText("Back to Cohort");
        fireEvent.click(backButton);

        expect(mockPush).toHaveBeenCalledWith("/cohort");
    });

    test("renders tag buttons with correct data", () => {
        render(<CohortDetails />);

        expect(screen.getByText("Luminary")).toBeInTheDocument();
        expect(screen.getByText("Back to Cohort")).toBeInTheDocument();
    });
});
