import React from "react";
import { Providers } from "@/app/provider";
import { ConfigProvider } from "@/app/config-context";
import { render, screen, fireEvent } from "@testing-library/react";
import { AnyAction } from "@reduxjs/toolkit";
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

jest.mock("@/reuseable/buttons/loaneeUpdateButton", () => {
  const UploadButton = () => <div data-testid='upload-button'></div>;
  UploadButton.displayName = "UploadButton";
  return UploadButton;
});

jest.mock( "@/features/portfolio-manager/settings/loanee-profile-settings/update-profile-modal/updateProfile", () => {
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

jest.mock("@/service/users/Loanee_query", () => ({
  loaneeApi: {
    reducerPath: 'loaneeApi',
    reducer: (state = {}) => state,
    middleware: jest.fn(() => (next: (action: AnyAction) => AnyAction) => (action: AnyAction)=> next(action))
  },
  useViewUserDetailQuery: jest.fn(() => ({
    data: {
      userIdentity: {
        dateOfBirth: "1990-01-01",
        gender: "Male",
        stateOfOrigin: "Lagos",
        stateOfResidence: "Lagos",
        email: "test@example.com",
        phoneNumber: "1234567890",
        residentialAddress: "123 Test St",
        avatar: "test-avatar.jpg"
      },
      highestLevelOfEducation: "Bachelor's Degree",
      institutionName: "Test University",
      nextOfKin: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        nextOfKinRelationship: "Brother",
        contactAddress: "456 Test Ave"
      }
    },
    isLoading: false,
    error: null
  }))
}));

describe("LoaneeProfileComponent", () => {
  beforeEach(() => {
    render(
      <ConfigProvider config={{
        uploadPreset: 'test-preset',
        cloudName: 'test-cloud',
        googleMapsApiKey: 'test-key',
        countryCodeUrl: 'test-url',
        backendBaseUrl: 'test-backend'
      }}>
        <Providers>
          <LoaneeProfileSetting
            whoseProfile='user'
          />
        </Providers>
      </ConfigProvider>
    );
  });

  test("renders the profile header and sections on page loading", () => {
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Manage and update your personal details")).toBeInTheDocument();
    expect(screen.getByText("Basic details")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Next of Kin")).toBeInTheDocument();
  });

  test('should opens the modal when "Update profile" is clicked', () => {
    expect(screen.queryByTestId("update-profile-modal")).not.toBeInTheDocument();

    const updateButton = screen.getByRole("button", { name: /Update profile/i });
    fireEvent.click(updateButton);

    expect(screen.getByTestId("update-profile-modal")).toBeInTheDocument();
  });
});
