import { render,screen,cleanup } from "@testing-library/react";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import { MdOutlinePeople } from 'react-icons/md'

describe("TableEmptyState", () => {
    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
    })



    it("renders the table empty state component correctly", () => {
        render(<TableEmptyState name="item" />);

        const title = screen.getAllByText(/items/i);
        expect(title[0]).toBeInTheDocument();

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Items will show here/i);
    });

    it("renders with an optional filter name", () => {
       
            render(<TableEmptyState name="Item" optionalFilterName="filtered" />);
            
            expect(screen.getByText(/There are no filtered Items available yet/i)).toBeInTheDocument();
         
    });

    it('renders with an icon when provided', () => {
        render(<TableEmptyState name="Item" icon={MdOutlinePeople} />);
        
        const icon = screen.getByTestId('icon-container');
        expect(icon).toBeInTheDocument();
       
      });
      
      it('applies the custom className', () => {
        const { container } = render(<TableEmptyState name="Item" className="custom-class" />);
        
        expect(container.firstChild).toHaveClass('custom-class');
      });

      it('renders with an icon when provided', () => {
        render(<TableEmptyState name="Item" icon={MdOutlinePeople} />);
    
        const iconContainer = screen.getByTestId('icon-container');
        expect(iconContainer).toBeInTheDocument();
        expect(iconContainer).toHaveClass('bg-lightBlue500');
        expect(iconContainer).toHaveClass('w-20 h-20');
      });


      // it('renders correctly without any props', () => {
      //   render(<TableEmptyState />);
      
      //   const defaultText = screen.getByText(/s will show here/i);
      //   expect(defaultText).toBeInTheDocument();
      // });

      it('renders the name correctly with proper formatting', () => {
        render(<TableEmptyState name="TestItem" />);
      
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent('TestItems will show here');
      });

      it('does not render the icon container if icon prop is not provided', () => {
        render(<TableEmptyState name="Item" />);
      
        expect(screen.queryByTestId('icon-container')).toBeNull();
      });

      it('renders correct layout for different screen sizes', () => {
        const { container } = render(<TableEmptyState name="Item" className="mt-28 md:mt-36" />);
      
        expect(container.firstChild).toHaveClass('mt-28');
        expect(container.firstChild).toHaveClass('md:mt-36');
      });

     

    // it('updates the content when props change', () => {
    //     const { rerender } = render(<TableEmptyState name="User" />);
      
    //     expect(screen.getByText(/Users will show here/i)).toBeInTheDocument();
      
    //     rerender(<TableEmptyState name="Admin" />);
    //     expect(screen.getByText(/Admins will show here/i)).toBeInTheDocument();
    //   });
      

    
});