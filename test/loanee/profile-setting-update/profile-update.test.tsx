import React from "react";
import { Providers } from "@/app/provider";
import { render, screen, fireEvent } from "@testing-library/react";
import LoaneeProfileSetting from "@/features/portfolio-manager/settings/loanee-profile-settings/loaneeProfile";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn()
  })),

  useSearchParams: jest.fn(() => new URLSearchParams()),
  useParams: jest.fn(() => ({})),
  redirect: jest.fn()
}));

jest.mock("@/reuseable/buttons/LoaneeUploadButton", () => {
  const UploadButton = () => <div data-testid='upload-button'></div>;
  UploadButton.displayName = "UploadButton";
  return UploadButton;
});

jest.mock(
  "@/features/portfolio-manager/settings/loanee-profile-settings/update-profile/updateProfile",
  () => {
    const UpdateProfile = ({ isOpen }: { isOpen: boolean }) => {
      if (!isOpen) {
        return null;
      }
      return <div data-testid='update-profile-modal'></div>;
    };
    UpdateProfile.displayName = "Update profile";
    return UpdateProfile;
  }
);

describe("LoaneeProfileSetting Component", () => {
  beforeEach(() => {
    render(
      <Providers>
        <LoaneeProfileSetting
          whoseProfile='user'
          userName='user_name'
          userEmail='user_email'
        />
      </Providers>
    );
  });

  test("renders the profile header and sections on page loading", () => {
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(
      screen.getByText("Manage and update your personal details")
    ).toBeInTheDocument();
    expect(screen.getByText("Basic details")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Next of kin")).toBeInTheDocument();
  });

  test('opens the modal when "Update profile" is clicked', () => {
    expect(
      screen.queryByTestId("update-profile-modal")
    ).not.toBeInTheDocument();

    const updateButton = screen.getByRole("button", {
      name: /Update profile/i
    });
    fireEvent.click(updateButton);

    expect(screen.getByTestId("update-profile-modal")).toBeInTheDocument();
  });
});
