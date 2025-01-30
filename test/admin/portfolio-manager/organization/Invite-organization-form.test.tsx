import { render, screen, fireEvent,cleanup} from "@testing-library/react";
import { Providers } from "@/app/provider";
import InviteOrganizationForm from "@/components/portfolio-manager/organization/Invite-organization-form";


describe("InviteOrganizationForm", () => {
    beforeEach(() => {
        cleanup()
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });

      beforeEach(() => {
        render( <Providers> <InviteOrganizationForm /> </Providers> );  
      })

      test("renders the form with initial elements", () => { 
        expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument(); 
        expect(screen.getByPlaceholderText("Enter email address")).toBeInTheDocument(); 
        expect(screen.getByPlaceholderText("Enter website")).toBeInTheDocument(); 
        expect(screen.getByPlaceholderText("Enter registration number")).toBeInTheDocument(); 
        expect(screen.getByPlaceholderText("Enter tax number")).toBeInTheDocument(); 
        expect(screen.getByPlaceholderText("Enter admin first name")).toBeInTheDocument(); 
        expect(screen.getByPlaceholderText("Enter admin email address")).toBeInTheDocument(); 
    });

    test("renders the form with validation errors", () => { 
        fireEvent.change(screen.getByPlaceholderText("Enter name"), { target: { value: "Test123" } }); 
        fireEvent.change(screen.getByPlaceholderText("Enter email address"), { target: { value: "test123@example.com" } }); 
        fireEvent.change(screen.getByPlaceholderText("Enter website"), { target: { value: "www.test" } }); 
    })

    test("validates that fields are required", async () => { 
    fireEvent.click(screen.getByText("Invite")); 
     expect(await screen.findByText("Name is required")).toBeInTheDocument(); 
     expect(await screen.findByText("Email address is required")).toBeInTheDocument(); 
     expect(await screen.findByText("Industry is required")).toBeInTheDocument(); 
     expect(await screen.findByText("Service is required")).toBeInTheDocument(); 
     expect(await screen.findByText("Registration number is required")).toBeInTheDocument(); 
     expect(await screen.findByText("Tax number is required")).toBeInTheDocument(); 
     expect(await screen.findByText("Admin first name is required")).toBeInTheDocument(); 
     expect(await screen.findByText("Admin email address is required")).toBeInTheDocument(); 
    });

   
       
    

    


})