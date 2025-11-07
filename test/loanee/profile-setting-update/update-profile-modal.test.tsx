import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateProfile from "@/features/portfolio-manager/settings/loanee-profile-settings/update-profile-modal/Update-profile";

const loaneeUpdate = jest.fn();
jest.mock("@/service/users/Loanee_query", () => ({
  useLoaneeUpdateProfileMutation: () => [
    loaneeUpdate,
    { isLoading: false }, 
  ],
}));

const mockToast = jest.fn();
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: toast,
  }),
}));

jest.mock("@/reuseable/select/NigeriaStatesSelect", () => (props) => (
  <input
    aria-label="State of residence" 
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
  />
));

jest.mock("@/reuseable/Input/Custom-select-obj", () => (props) => (
  <input
    aria-label="Level of education" 
    value={props.value}
    onChange={(e) => props.onChange(e.target.value)}
  />
));

jest.mock("@/reuseable/display/Isloading", () => () => (
  <div data-testid="loading-spinner">Loading...</div>
));

describe("UpdateProfile Component", () => {
  const setIsOpen = jest.fn();
  const refetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(<UpdateProfile setIsOpen={setIsOpen} refetch={refetch} />);
  });

  test("renders the form fields and buttons", () => {
    expect(screen.getByLabelText(/State of residence/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Level of education/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update/i })).toBeInTheDocument();
  });

  test("shows validation errors for empty fields", async () => {
    const updateButton = screen.getByRole("button", { name: /Update/i });
    expect(updateButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/State of residence/i), { target: { value: "Lagos" }, });
    fireEvent.change(screen.getByLabelText(/State of residence/i), { target: { value: "" }, });

    expect( await screen.findByText(/State of residence is required/i)).toBeInTheDocument();
    expect( await screen.findByText(/Level of education is required/i)).toBeInTheDocument();
  });

  test("handling successful form submission", async () => {
    const successResponse = { message: "Profile Updated!" };
    loaneeUpdate.mockResolvedValue(successResponse);

    fireEvent.change(screen.getByLabelText(/State of residence/i), {
      target: { value: "Lagos" },
    });
    fireEvent.change(screen.getByLabelText(/Level of education/i), {
      target: { value: "BSC" },
    });

    const updateButton = screen.getByRole("button", { name: /Update/i });
    expect(updateButton).toBeEnabled(); 
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(loaneeUpdate).toHaveBeenCalledWith({stateOfResidence: "Lagos", levelOfEducation: "BSC",});
    });

    expect(mockToast).toHaveBeenCalledWith({
      description: successResponse.message,
      status: "success",
      duration: 1500,
    });

    expect(refetch).toHaveBeenCalledTimes(1);
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  test("should handle API error during submission", async () => {
    const errorResponse = {
      data: { message: "Internal Server Error" },
      status: 500,
    };
    loaneeUpdate.mockRejectedValue(errorResponse);

    fireEvent.change(screen.getByLabelText(/State of residence/i), { target: { value: "Ogun" }, });
    fireEvent.change(screen.getByLabelText(/Level of education/i), { target: { value: "HND" }, });
    fireEvent.click(screen.getByRole("button", { name: /Update/i }));

    await waitFor(() => {
      expect(screen.getByText(errorResponse.data.message)).toBeInTheDocument();
    });

    expect(toast).not.toHaveBeenCalled();
    expect(refetch).not.toHaveBeenCalled();
    expect(setIsOpen).not.toHaveBeenCalled();
  });

  test("should calls setIsOpen(false) when Cancel button is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setIsOpen).toHaveBeenCalledTimes(1);
  });
});