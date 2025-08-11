import { render, screen, fireEvent,cleanup,waitFor} from "@testing-library/react";
import Staff from "@/components/super-admin/staff/View-all-staff";
import { Providers } from "@/app/provider";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => jest.fn(),
}));

describe("ViewAllStaff", () => {
    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue();
        jest.spyOn(console,'warn').mockReturnValue();
        jest.spyOn(console,'error').mockReturnValue();
    })


    it('renders all main components', () => {
        render(
            <Providers>
            <Staff />
            </Providers>
        
    );
        expect(screen.getByTestId('search-input')).toBeInTheDocument();
        expect(screen.getByText('Invite staff')).toBeInTheDocument();
        expect(screen.getByTestId('table')).toBeInTheDocument();
      });

      it('filters table by status when prop provided', () => {
        const { rerender } = render(
            // <Providers>
           <Staff status="Active" />
            // </Providers>
       );
        
        const statusCells = screen.getAllByText(/Active|Pending|Deactivated/);
        statusCells.forEach(cell => {
          expect(cell).toHaveTextContent('Active');
        });
      
        rerender(<Staff status="Pending" />);
        statusCells.forEach(cell => {
          expect(cell).toHaveTextContent('Pending');
        });
      });

      it('updates search term state', () => {
        render(  <Providers>
            <Staff />
            </Providers>);
        const searchInput = screen.getByTestId('search-input');
        
        fireEvent.change(searchInput, { target: { value: 'John' } });
        expect(searchInput).toHaveValue('John');
      });

      it('applies correct CSS classes based on status', () => {
        render(<Providers>
            <Staff />
            </Providers>);
        
        const activeStatus = screen.getAllByText('Active')[0];
        expect(activeStatus).toHaveClass('bg-[#E6F2EA]');
        
        const pendingStatus = screen.getAllByText('Pending')[0];
        expect(pendingStatus).toHaveClass('bg-[#FEF6E8]');
      });


    it('renders invite button with correct attributes', () => {
        render(<Providers>
            <Staff />
            </Providers>);
        const button = screen.getByText('Invite staff');
        
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('id', 'inviteStaff');
        expect(button).toHaveClass('h-[45px]');
      });

      it('renders responsive layout correctly', () => {
        render(<Providers>
            <Staff />
            </Providers>);
        expect(screen.getByText('Invite staff').parentElement)
          .toHaveClass('md:mt-0');
      });

})