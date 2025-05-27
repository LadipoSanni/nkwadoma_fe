import { render, screen, fireEvent,cleanup} from "@testing-library/react";
import { Providers } from "@/app/provider";
import { useRouter,usePathname } from 'next/navigation';
import OrganizationLoaneeLayout from "@/layout/organization-loanee-layout";
import { store } from "@/redux/store";
import { setOrganizationDetail } from "@/redux/slice/organization/organization";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(), 
  }));

  const mockChildren = <div>Test Children</div>;


describe("InviteOrganizationForm", () => {
    const mockPush = jest.fn();
    const mockPathname = '/organizations/loanees/all'; 
    beforeEach(() => {
        cleanup();

       
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
         
          (usePathname as jest.Mock).mockReturnValue(mockPathname);

          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()

          store.dispatch(setOrganizationDetail('cohorts'));
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it("displays the back button", () => {
        render(
          <Providers>
            <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
          </Providers>
        );
        expect(screen.getByText("Back")).toBeInTheDocument();
      });

      it("back button click triggers router push", () => {
        render(
          <Providers>
            <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
          </Providers>
        );
        fireEvent.click(screen.getByText("Back"));
        expect(mockPush).toHaveBeenCalledWith('/organizations/details');
      });

      it("renders TabSwitch component", () => {
        render(
          <Providers>
            <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
          </Providers>
        );
        expect(screen.getByRole("tablist")).toBeInTheDocument();
      });

      it("passes correct props to TabSwitch", () => {
        render(
          <Providers>
            <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
          </Providers>
        );
        expect(screen.getByText("All")).toBeInTheDocument();
        expect(screen.getByText("Archived")).toBeInTheDocument();
      });

      it("repayment tab as specified", () => {
        render(
          <Providers>
            <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
          </Providers>
        );
        const repaymentTab = screen.queryByText("Repayment");
        expect(repaymentTab).toBeInTheDocument();
      });

      it("applies correct styling to cohort initials", () => {
        
        render(
          <Providers >
            <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
          </Providers>
        );
        const initials = screen.getByTestId("cohortInitials");
        expect(initials).toHaveClass("bg-[#FEF6F0]");
        expect(initials).toHaveClass("text-[#68442E]");
      });

  it("applies correct font classes", () => {
    render(
      <Providers>
        <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
      </Providers>
    );
    expect(screen.getByTestId("cohortInitials")).toHaveClass(" bg-[#FEF6F0]");
    expect(screen.getByTestId("cohortName")).toHaveClass("text-[#212221]");
  });

  it("maintains proper layout structure", () => {
    render(
      <Providers>
        <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
      </Providers>
    );
    const main = screen.getByRole("main");
    expect(main).toHaveClass("w-full");
    expect(main).toHaveClass("h-full");
  });

  it("dispatches correct Redux action on back button click", () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');
    render(
      <Providers>
        <OrganizationLoaneeLayout>{mockChildren}</OrganizationLoaneeLayout>
      </Providers>
    );
    fireEvent.click(screen.getByText("Back"));
    expect(mockDispatch).toHaveBeenCalledWith(setOrganizationDetail('cohorts'));
  });
})