import { render, screen, fireEvent,cleanup,waitFor,act} from "@testing-library/react";
import AddTraineeForm from "@/components/cohort/AddTraineeForm";
import userEvent from '@testing-library/user-event';


describe("AddTraineeForm", () => {
    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue();
        jest.spyOn(console,'warn').mockReturnValue();
        jest.spyOn(console,'error').mockReturnValue();
    })



    it('should initialize form with default values when component is rendered', () => {
        const { getByPlaceholderText } = render(<AddTraineeForm cohortId="123" />);
        expect((getByPlaceholderText('Enter first name') as HTMLInputElement).value).toBe('');
        expect((getByPlaceholderText('Enter last name') as HTMLInputElement).value).toBe('');
        expect((getByPlaceholderText('Enter email address') as HTMLInputElement).value).toBe('');
        expect((getByPlaceholderText('Enter Initial Deposit') as HTMLInputElement).value).toBe('');
      });

      it('should trigger validation errors when form is submitted with empty fields', async () => {
        render(<AddTraineeForm cohortId="123" />);
        fireEvent.click(screen.getByRole('button', { name: /Add/i }));
        await waitFor(() => {
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('Last name is required')).toBeInTheDocument();
            expect(screen.getByText('Email address is required')).toBeInTheDocument();
            expect(screen.getByText('Initial deposit is required')).toBeInTheDocument();

          });
      });


        it('should log formatted values when form is submitted', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const mockSetIsOpen = jest.fn();
      const { getByLabelText, getByRole } = render(<AddTraineeForm cohortId="123" setIsOpen={mockSetIsOpen} />);
  
      fireEvent.change(getByLabelText('First name'), { target: { value: 'John' } });
      fireEvent.change(getByLabelText('Last name'), { target: { value: 'Doe' } });
      fireEvent.change(getByLabelText('Email address'), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(getByLabelText('Initial Deposit'), { target: { value: 5000 } });
  
      fireEvent.click(getByRole('button', { name: 'Add' }));
  
      await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({ cohortId: '123', firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', initialDeposit: 'NGN5000' });
    });
      consoleSpy.mockRestore();
    });


    it('should display validation errors when fields are invalid',async () => {
      const { getByRole, getByText,getByLabelText } = render(<AddTraineeForm cohortId="123" />);
  
      fireEvent.click(getByRole('button', { name: 'Add' }));
    
      await waitFor(() => {
      expect(getByText('First name is required')).toBeInTheDocument();
      expect(getByText('Last name is required')).toBeInTheDocument();
      expect(getByText('Email address is required')).toBeInTheDocument();
      expect(getByText('Initial deposit is required')).toBeInTheDocument();
      })
  
      fireEvent.change(getByLabelText('First name'), { target: { value: 'John' } });
      fireEvent.change(getByLabelText('Last name'), { target: { value: 'Doe' } });
      fireEvent.change(getByLabelText('Email address'), { target: { value: 'invalid-email' } });
      fireEvent.change(getByLabelText('Initial Deposit'), { target: { value: "" } });
  
      fireEvent.click(getByRole('button', { name: 'Add' }));
  
      await waitFor(() => {
      expect(getByText('Invalid email address')).toBeInTheDocument();
      expect(getByText('Initial deposit is required')).toBeInTheDocument();
    })
    });

    it('should expand and collapse accordion to show tuition breakdown', () => {
      render(<AddTraineeForm cohortId="123" setIsOpen={jest.fn()} />);
  
      const accordionTrigger = screen.getByText('Expand to see the tuition breakdown');
      fireEvent.click(accordionTrigger);
      expect(screen.getByText('Tuition')).toBeInTheDocument();
  
      fireEvent.click(accordionTrigger);
      expect(screen.queryByText('Tuition')).not.toBeInTheDocument();
  });
   

  it('should trigger validation errors when form submitted with empty fields', async () => {
   
    const props = {
        cohortId: '123',
        setIsOpen: jest.fn()
    };
 
    render(<AddTraineeForm {...props} />);

    
    fireEvent.click(screen.getByText('Add'));
   await waitFor(() => {
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
    expect(screen.getByText('Initial deposit is required')).toBeInTheDocument();
   })
});

it('should reject invalid email formats when email is entered', async () => {
  const props = {
    cohortId: '123',
    setIsOpen: jest.fn()
};

  render(<AddTraineeForm {...props}/>);
  const emailInput = screen.getByLabelText('Email address');
  userEvent.type(emailInput, 'invalidemail');
  fireEvent.click(screen.getByText('Add'));

  await waitFor(() =>  {
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  })
 
});  

it('should toggle dropdown state correctly on repeated clicks', () => {
  render(<AddTraineeForm cohortId="123" setIsOpen={jest.fn()} />);
  
  const accordionTrigger = screen.getByText('Expand to see the tuition breakdown');
  fireEvent.click(accordionTrigger);
  expect(screen.getByText('Tuition')).toBeInTheDocument();
  expect(screen.getByText('Collapse to hide the tuition breakdown')).toBeInTheDocument();
  fireEvent.click(accordionTrigger);
  expect(screen.queryByText('Tuition')).not.toBeInTheDocument();
  expect(screen.getByText('Expand to see the tuition breakdown')).toBeInTheDocument();
 
});

it('should close modal when cancel button is clicked', () => {
  const setIsOpen = jest.fn();
  render(<AddTraineeForm cohortId="123" setIsOpen={setIsOpen} />);
  
  const cancelButton = screen.getByRole('button', { name: /cancel/i });
  fireEvent.click(cancelButton);

  expect(setIsOpen).toHaveBeenCalledWith(false);
});


it('should clear all form fields when reset button is clicked', () => {
  const setIsOpen = jest.fn();
  render(<AddTraineeForm cohortId="123" setIsOpen={setIsOpen} />);
  const resetButton = screen.getByText('Cancel');
  userEvent.click(resetButton);

  expect((screen.getByLabelText('First name')as HTMLInputElement).value).toBe('');
  expect((screen.getByLabelText('Last name')as HTMLInputElement).value).toBe('');
  expect((screen.getByLabelText('Email address')as HTMLInputElement).value).toBe('');
  expect((screen.getByLabelText('Initial Deposit')as HTMLInputElement).value).toBe('');
});






})    