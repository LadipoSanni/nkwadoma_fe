import { render, screen, fireEvent,cleanup,within} from "@testing-library/react";
import TableContainer from "@/reuseable/table/TableContainer";


describe("TableContainer", () => {
    beforeEach(() => {
        cleanup()
    })

    it('test that the reusable component renders children correctly when used', () => {
        render(
          <TableContainer>
            <p>Test Child</p>
          </TableContainer>
        );
    
        
        expect(screen.getByText('Test Child')).toBeInTheDocument();
      });

      it('applies className prop correctly', () => {
        render(
          <TableContainer className="custom-class">
            <p>Test Child</p>
          </TableContainer>
        );
    
        const container = screen.getByText('Test Child').parentElement;
        expect(container).toHaveClass('overflow-auto border rounded-md custom-class');
      });


      it('inline styles correctly', () => {
        render(
          <TableContainer style={{ backgroundColor: 'red' }}>
            <p>Test Child</p>
          </TableContainer>
        );
    
        const container = screen.getByText('Test Child').parentElement;
        expect(container).toHaveStyle({
          backgroundColor: 'red',
         
        });
      });

      it('passes additional props to the container', () => {
        render(
          <TableContainer data-testid="table-container">
            <p>Test Child</p>
          </TableContainer>
        );
    
        const container = screen.getByTestId('table-container');
        expect(container).toBeInTheDocument();
      });
    

  
})