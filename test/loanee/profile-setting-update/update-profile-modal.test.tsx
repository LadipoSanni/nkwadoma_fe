import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateProfile from "@/features/portfolio-manager/settings/loanee-profile-settings/update-profile-modal/update-profile";

const loaneeUpdate = jest.fn();
jest.mock("@/service/users/Loanee_query", () => ({
  useLoaneeUpdateProfileMutation: () => [
    loaneeUpdate,
    { isLoading: false }, 
  ],
}));

const toasts = jest.fn();
jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: toasts,
  }),
}));

jest.mock("@/reuseable/select/NigeriaStatesSelect", () => {
  const NigeriaStatesSelect = (props: Record<string, unknown>) => (
    <input
      aria-label="State of residence"
      value={props.value as string}
      onChange={(e) => (props.onChange as (value: string) => void)(e.target.value)}
    />
  );
  return NigeriaStatesSelect;
});

jest.mock("@/reuseable/Input/Custom-select-obj", () => {
  const CustomSelectObj = (props: Record<string, unknown>) => (
    <input
      aria-label="Level of education"
      value={props.value as string}
      onChange={(e) => (props.onChange as (value: string) => void)(e.target.value)}
    />
  );
  return CustomSelectObj;
});

jest.mock("@/reuseable/display/Isloading", () => {
  const Isloading = () => (
    <div data-testid="loading-spinner">Loading...</div>
  );
  return Isloading;
});

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
    fireEvent.change(screen.getByLabelText(/State of residence/i), { target: { value: "Lagos" }, });
    fireEvent.change(screen.getByLabelText(/State of residence/i), { target: { value: "" }, });

    expect(screen.queryByText(/State of residence is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Level of education is required/i)).not.toBeInTheDocument();
  });

  test("handling successful form submission", async () => {
    const successResponse = { message: "Profile Updated!" };
    loaneeUpdate.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue(successResponse)
    });

    fireEvent.change(screen.getByLabelText(/State of residence/i), {
      target: { value: "Lagos" },
    });
    fireEvent.change(screen.getByLabelText(/Level of education/i), {
      target: { value: "BSC" },
    });

    const updateButton = screen.getByRole("button", { name: /Update/i });
    await waitFor(() => {
      expect(updateButton).toBeEnabled();
    });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(loaneeUpdate).toHaveBeenCalledWith({stateOfResidence: "Lagos", levelOfEducation: "BSC",});
    });

    expect(toasts).toHaveBeenCalledWith({
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
    loaneeUpdate.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(errorResponse)
    });

    fireEvent.change(screen.getByLabelText(/State of residence/i), { target: { value: "Ogun" }, });
    fireEvent.change(screen.getByLabelText(/Level of education/i), { target: { value: "HND" }, });

    const updateButton = screen.getByRole("button", { name: /Update/i });
    await waitFor(() => {
      expect(updateButton).toBeEnabled();
    });
    fireEvent.click(updateButton);

    await waitFor(() => { expect(screen.getByText(errorResponse.data.message)).toBeInTheDocument(); });

    expect(toasts).not.toHaveBeenCalled();
    expect(refetch).not.toHaveBeenCalled();
    expect(setIsOpen).not.toHaveBeenCalled();
  });

  test("should calls setIsOpen(false) when Cancel button is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(setIsOpen).toHaveBeenCalledWith(false);
    expect(setIsOpen).toHaveBeenCalledTimes(1);
  });
});
