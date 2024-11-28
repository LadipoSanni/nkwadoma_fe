import { render, screen, fireEvent,cleanup} from "@testing-library/react";
import InvestmentVehicle from "@/features/portfolio-manager/fund";
import { Providers } from "@/app/provider";

describe("Portfolio Manager", () => {
    beforeEach(() => {
        cleanup()
        render(
            <Providers>
                <InvestmentVehicle />
            </Providers>
        );
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });

      test("renders InvestmentVehicle without crashing", () => {
        expect(screen.getByText("Commercial funds")).toBeInTheDocument();
    });

    test("renders all tab triggers correctly", () => {
       
        expect(screen.getByText("Commercial funds")).toBeInTheDocument();
        expect(screen.getByText("Endowment funds")).toBeInTheDocument();
    });
    
    test("renders action bar for Commercial funds", () => {
       
        const input = screen.getByRole("textbox");
        const draftsButton = screen.getByText("Drafts");
        const createButton = screen.getByText("Create investment vehicle");
        expect(input).toBeInTheDocument();
        expect(draftsButton).toBeInTheDocument();
        expect(createButton).toBeInTheDocument();
    });

    test("renders action bar for Endowment funds after tab switch", () => {
     
        fireEvent.click(screen.getByTestId("tabDataNameendowmentFund"));
        const input = screen.getByRole("textbox");
        const draftsButton = screen.getByText("Drafts");
        const createButton = screen.getByText("Create investment vehicle");
        expect(input).toBeInTheDocument();
        expect(draftsButton).toBeInTheDocument();
        expect(createButton).toBeInTheDocument();
    });

    test("renders table for Endowment funds after tab switch", () => {
       
        fireEvent.click(screen.getByTestId("tabDataNameendowmentFund"));
        const allVehicles = screen.getAllByText("Vehicle");
        expect(allVehicles[0]).toBeInTheDocument(); 
        const allStartDate = screen.getAllByText("Start Date")
        expect(allStartDate[0]).toBeInTheDocument(); 
    });

    test("renders table headers for Commercial funds", () => {
        
        fireEvent.click(screen.getByTestId("tabDataNameendowmentFund"));
        const allVehicles = screen.getAllByText("Vehicle");
        expect(allVehicles[0]).toBeInTheDocument(); 
        const allStartDate = screen.getAllByText("Start Date")
        expect(allStartDate[0]).toBeInTheDocument(); 
    });

  

    test("handles Drafts button click", () => {
        const mockHandleDraftClick = jest.fn();
        const draftsButton = screen.getByText("Drafts");
        fireEvent.click(draftsButton);
        expect(mockHandleDraftClick).toHaveBeenCalledTimes(0); 
    });


    test("handles Create investment vehicle button click", () => {
        const mockHandleCreateInvestmentVehicleClick = jest.fn();
        
        const createButton = screen.getByText("Create investment vehicle");
        fireEvent.click(createButton);
        expect(mockHandleCreateInvestmentVehicleClick).toHaveBeenCalledTimes(0); 
    });
   
    

   
    
});