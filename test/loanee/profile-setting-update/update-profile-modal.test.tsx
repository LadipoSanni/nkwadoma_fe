import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import UpdateLoaneeProfile from "@/features/portfolio-manager/settings/loanee-profile-settings/update-profile-modal/updateProfile";

jest.useFakeTimers();

jest.mock("lucide-react", () => ({
  X: () => <svg data-testid='x-icon'></svg>
}));

const onClose = jest.fn();
const onUpdateSuccess = jest.fn();

const profileUpdateProps = {
  isOpen: true,
  onClose: onClose,
  onUpdateSuccess: onUpdateSuccess,
  currentData: {
    education: "B.Sc. Computer Science",
    stateOfResidence: "Lagos"
  }
};

describe("UpdateLoaneeProfile", () => {
  beforeEach(() => {
    cleanup();
    jest.spyOn(console, "log").mockReturnValue();
    jest.spyOn(console, "warn").mockReturnValue();
    jest.spyOn(console, "error").mockReturnValue();

    onClose.mockReset();
    onUpdateSuccess.mockReset();
  });

  test("should renders nothing when isOpen is false", () => {
    render(<UpdateLoaneeProfile {...profileUpdateProps} isOpen={false} />);
    expect(screen.queryByText("Update profile")).not.toBeInTheDocument();
  });

  test("modal title and buttons when isOpen is true", () => {
    render(<UpdateLoaneeProfile {...profileUpdateProps} />);
    expect(screen.getByText("Update profile")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  test("pre-fills form fields when currentData is provided ", () => {
    render(<UpdateLoaneeProfile {...profileUpdateProps} />);
    expect(screen.getByText("Update profile")).toBeInTheDocument();
    expect(screen.getByLabelText(/State of residence/i)).toHaveValue(
      profileUpdateProps.currentData.stateOfResidence
    );
    expect(screen.getByLabelText(/Highest level of education/i)).toHaveValue(
      profileUpdateProps.currentData.education
    );
  });

  test("should calls onClose when the Cancel button is clicked", () => {
    render(<UpdateLoaneeProfile {...profileUpdateProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("update button loading state calls onUpdateSuccess with user new data", async () => {
    render(<UpdateLoaneeProfile {...profileUpdateProps} />);

    const residenceInput = screen.getByLabelText(/State of residence/i);
    const educationInput = screen.getByLabelText(/Highest level of education/i);
    fireEvent.change(residenceInput, { target: { value: "Abuja" } });
    fireEvent.change(educationInput, { target: { value: "M.Sc. Education" } });
    fireEvent.click(screen.getByText("Update"));

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(onUpdateSuccess).toHaveBeenCalledTimes(1);
      expect(onUpdateSuccess).toHaveBeenCalledWith({
        education: "M.Sc. Education",
        stateOfResidence: "Abuja"
      });
    });
    expect(screen.getByRole("button", { name: /Update/i })).toBeEnabled();
  });

  test("buttons are disabled when submitting", () => {
    render(<UpdateLoaneeProfile {...profileUpdateProps} />);
    fireEvent.click(screen.getByText("Update"));
    expect(screen.getByText("Cancel")).toBeDisabled();
    expect(screen.getByText("Updating...")).toBeDisabled();
  });

  test("should shows an error message if the update fails", async () => {
    onUpdateSuccess.mockImplementation(() => {
      throw new Error("Simulated API failure");
    });

    render(<UpdateLoaneeProfile {...profileUpdateProps} />);
    fireEvent.click(screen.getByText("Update"));

    const errorMessage = await screen.findByTestId("error-message", undefined, {
      timeout: 1500
    });
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Update failed. Please try again.");
    expect(screen.getByText("Update")).toBeEnabled();
  });
});
