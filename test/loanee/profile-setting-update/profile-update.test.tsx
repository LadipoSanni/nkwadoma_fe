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

jest.mock( "@/features/portfolio-manager/settings/loanee-profile-settings/update-profile-modal/update-profile", () => {
    const UpdateProfile = ({ isOpen }: { isOpen: boolean }) => {
      if (!isOpen) {
        return null;
      }
      return <div data-testid='update-profile'></div>;
    };
    UpdateProfile.displayName = "Update profile";
    return UpdateProfile;
  }
);

jest.mock("@/service/users/api", () => ({
  loaneeApi: {
    reducerPath: 'userApi',
    reducer: (state = {}) => state,
    middleware: jest.fn(() => (next: (action: AnyAction) => AnyAction) => (action: AnyAction)=> next(action))
  },
  useGetUserDetailsQuery: jest.fn(() => ({
    data: {
        dateOfBirth: "1990-01-01",
        gender: "Male",
        stateOfOrigin: "Lagos",
        stateOfResidence: "Abuja",
        email: "test@example.com",
        phoneNumber: "1234567890",
        residentialAddress: "123 Test St",
        image: "test-avatar.jpg",
        levelOfEducation: "Bsc",
        nextOfKinFirstName: "John",
        nextOfKinLastName: "Doe",
        nextOfKinEmail: "john@example.com",
        nextOfKinRelationship: "Brother",
        nextOfKinContactAddress: "456 Test Ave"
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
    expect(screen.getByTestId("update-profile")).toBeInTheDocument();
  });
});
