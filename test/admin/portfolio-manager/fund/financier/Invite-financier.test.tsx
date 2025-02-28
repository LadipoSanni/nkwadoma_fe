import { cleanup, screen, render,fireEvent, waitFor} from "@testing-library/react";
import InviteFinancier from "@/components/portfolio-manager/fund/financier/Invite-financier";
import { Formik,Form } from 'formik';


describe("Invite financier", () => {
    const mockHandleBack = jest.fn();
  const mockSetFieldValue = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks();
          cleanup();
  
          jest.spyOn(console, 'log').mockReturnValue();
          jest.spyOn(console, 'warn').mockReturnValue();
          jest.spyOn(console, 'error').mockReturnValue();
      })

      const errors = {
        firstName: '',
        lastName: '',
        email: '',
        companyName: ''
      };
      const touched = {
        firstName: false,
        lastName: false,
        email: false,
        companyName: false
      };

      const setup = (financierType = '', errors = {}, touched = {}, isloading = false, isValid = true) => {
        render(
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              companyName: '',
              email: ''
            }}
            onSubmit={jest.fn()}
          >
            {({ setFieldValue }) => (
                <Form>
             <InviteFinancier
                financierType={financierType}
                isloading={isloading}
                isValid={isValid}
                handleBack={mockHandleBack}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
              />
                </Form>
              
            )}
          </Formik>
        );
      };

      test('Renders without crashing', () => {
        setup();
        expect(screen.getByPlaceholderText('Enter email address')).toBeInTheDocument();
      });

      test('Displays individual fields when financierType is "Individual"', () => {
        setup('Individual');
        expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
      });

     
      test('Displays company financier input field correctly', () => {
        setup('Company');
        expect(screen.getByLabelText('Full name')).toBeInTheDocument();
      });

      test('Displays first name field correctly', () => {
        setup('Individual');
        expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
      });
    
      test('Displays last name field correctly', () => {
        setup('Individual');
        expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
      });

      test('Handles unchange', async () => {
        setup('Individual');
        const firstNameInput = screen.getByPlaceholderText('Enter first name');
        const lastNameInput = screen.getByPlaceholderText('Enter last name');
        const emailInput = screen.getByPlaceholderText('Enter email address');
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'mark' } });
        fireEvent.change(emailInput, { target: { value: 'ikenna@gmail' } });


      });


      test('Calls handleBack when back button is clicked', () => {
        setup();
        const backButton = screen.getByText('Back'); 
        fireEvent.click(backButton);
        expect(mockHandleBack).toHaveBeenCalled();
      });

      test('Disables invite button when form is invalid', () => {
        setup('', {}, {}, false, false);
        const inviteButton = screen.getByText('Invite'); 
        expect(inviteButton).toBeDisabled();
      });

      test('Enables invite button when form is valid', () => {
        setup();
        const inviteButton = screen.getByText('Invite'); // Adjust the text based on your button content
        expect(inviteButton).not.toBeDisabled();
      });

      test('Correctly passes props to SubmitAndCancelButton', () => {
        setup();
        const submitButton = screen.getByText('Invite'); // Adjust the text based on your button content
        expect(submitButton).toBeInTheDocument();
      });
    
    })