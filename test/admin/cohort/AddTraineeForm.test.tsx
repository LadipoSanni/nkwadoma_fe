import { render, screen, fireEvent,cleanup,waitFor} from "@testing-library/react";
import AddTraineeForm from "@/components/cohort/AddTraineeForm";
import userEvent from '@testing-library/user-event';
import { Providers } from "@/app/provider";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => jest.fn(),
}));
describe("AddTraineeForm", () => {
    beforeEach(() => {
        cleanup()
        global.fetch = jest.fn(() =>
            Promise.resolve(new Response(JSON.stringify({ data: [] }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }))
        );
        jest.spyOn(console,'log').mockReturnValue();
        jest.spyOn(console,'warn').mockReturnValue();
        jest.spyOn(console,'error').mockReturnValue();
    })



    it('should initialize form with default values when component is rendered', () => {
        const { getByPlaceholderText } = render(
            <Providers>
                <AddTraineeForm  />
            </Providers>

        );
        expect((getByPlaceholderText('Enter email address') as HTMLInputElement).value).toBe('');
        // expect((getByPlaceholderText('Enter Initial Deposit') as HTMLInputElement).value).toBe('');
      });

      it('should trigger validation errors when form is submitted with empty fields', async () => {
        render(
            <Providers>
                <AddTraineeForm  />
            </Providers>

        );
        fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
        await waitFor(() => {
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('Last name is required')).toBeInTheDocument();
            expect(screen.getByText('Email address is required')).toBeInTheDocument();

          });
      });


        it('should log formatted values when form is submitted', async () => {
      // const consoleSpy = jest.spyOn(console, 'log');
      const mockSetIsOpen = jest.fn();
      const { getByLabelText, getByRole } = render(
          <Providers>
              <AddTraineeForm  setIsOpen={mockSetIsOpen} />
          </Providers>
      );
  
      fireEvent.change(getByLabelText('First name'), { target: { value: 'John' } });
      fireEvent.change(getByLabelText('Last name'), { target: { value: 'Doe' } });
      fireEvent.change(getByLabelText('Email address'), { target: { value: 'john.doe@example.com' } });
      // fireEvent.change(getByLabelText('Initial Deposit'), { target: { value: 5000 } });
  
      fireEvent.click(getByRole('button', { name: 'Continue' }));

    });


    it('should display validation errors when fields are invalid',async () => {
      const { getByRole, getByText,getByLabelText } = render(
          <Providers>
              <AddTraineeForm  />
          </Providers>
      );
  
      fireEvent.click(getByRole('button', { name: 'Continue' }));
    
      await waitFor(() => {
      expect(getByText('First name is required')).toBeInTheDocument();
      expect(getByText('Last name is required')).toBeInTheDocument();
      expect(getByText('Email address is required')).toBeInTheDocument();
      // expect(getByText('Initial deposit is required')).toBeInTheDocument();
      })
  
      fireEvent.change(getByLabelText('First name'), { target: { value: 'John' } });
      fireEvent.change(getByLabelText('Last name'), { target: { value: 'Doe' } });
      fireEvent.change(getByLabelText('Email address'), { target: { value: 'invalid-email' } });
      // fireEvent.change(getByLabelText('Initial Deposit'), { target: { value: "" } });
  
      fireEvent.click(getByRole('button', { name: 'Continue' }));
  
      await waitFor(() => {
      expect(getByText('Invalid email address')).toBeInTheDocument();
      // expect(getByText('Initial deposit is required')).toBeInTheDocument();
    })
    });
   

  it('should trigger validation errors when form submitted with empty fields', async () => {
   
    const props = {
        cohortId: '123',
        setIsOpen: jest.fn()
    };
 
    render(
        <Providers>
            <AddTraineeForm {...props} />
        </Providers>
    );

    
    fireEvent.click(screen.getByText('Continue'));
   await waitFor(() => {
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
    // expect(screen.getByText('Initial deposit is required')).toBeInTheDocument();
   })
});

// it('should reject invalid email formats when email is entered', async () => {
//   const props = {
//     cohortId: '123',
//     setIsOpen: jest.fn()
// };
//
//   render(
//       <Providers>
//           <AddTraineeForm {...props}/>
//       </Providers>
//   );
//   const emailInput = screen.getByLabelText('Email address');
//   userEvent.type(emailInput, 'invalidemail');
//   fireEvent.click(screen.getByText('Continue'));
//
//   await waitFor(() =>  {
//     expect(screen.getByText('Invalid email address')).toBeInTheDocument();
//   })
//
// });

it('should close modal when cancel button is clicked', () => {
  const setIsOpen = jest.fn();
  render(
      <Providers>
          <AddTraineeForm  setIsOpen={setIsOpen} />
      </Providers>
  );
  
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  fireEvent.click(cancelButton);

  expect(setIsOpen).toHaveBeenCalledWith(false);
});


it('should clear all form fields when reset button is clicked', () => {
  const setIsOpen = jest.fn();
  render(
      <Providers>
          <AddTraineeForm  setIsOpen={setIsOpen} />
      </Providers>
          );

  const resetButton = screen.getByText('Cancel');
  userEvent.click(resetButton);

  expect((screen.getByLabelText('First name')as HTMLInputElement).value).toBe('');
  expect((screen.getByLabelText('Last name')as HTMLInputElement).value).toBe('');
  expect((screen.getByLabelText('Email address')as HTMLInputElement).value).toBe('');
  // expect((screen.getByLabelText('Initial Deposit')as HTMLInputElement).value).toBe('');
});
})    