import { cleanup,fireEvent, screen, render} from "@testing-library/react";
import NotificationLayout from "@/layout/notification-layout.tsx";
import { useRouter } from 'next/navigation';
import { Providers } from "@/app/provider";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

  function Wrapper() {
      
      return (
        <Providers>
          <NotificationLayout>
          <div>Modal Content</div>
        </NotificationLayout>
        </Providers>
        
      );
    }
  

describe("Notification Layout", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
          cleanup();
  
          (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
          jest.spyOn(console, 'log').mockReturnValue();
          jest.spyOn(console, 'warn').mockReturnValue();
          jest.spyOn(console, 'error').mockReturnValue();
      })


      it('Renders without crashing', () => {
        render(<Wrapper/>);
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });

      // test('Displays search input correctly', () => {
      //   render(<Wrapper/>);
      //   expect(screen.getByTestId('ProgramSearch')).toBeInTheDocument();
      // });

      // test('Handles search input change correctly', () => {
      //   render(<Wrapper/>);
      //   const searchInput = screen.getByTestId('ProgramSearch') as HTMLInputElement;
      //   fireEvent.change(searchInput, { target: { value: 'test' } });
      //   expect(searchInput.value).toBe('test');
      // });

      // test('Handles select all checkbox correctly', () => {
      //   render(<Wrapper/>);
      //   const selectAllCheckbox = screen.getByTestId('AllNotifications') as HTMLInputElement;
      //   fireEvent.click(selectAllCheckbox);
      //   expect(selectAllCheckbox.checked).toBe(true);
      //   fireEvent.click(selectAllCheckbox);
      //   expect(selectAllCheckbox.checked).toBe(false);
      // });

      // test('Handles individual checkbox selection correctly', () => {
      //   render(<Wrapper/>);
      //   const checkboxes = screen.getAllByTestId('UniqueCheck') as HTMLInputElement[];
      //  const individualCheckbox = checkboxes[0];
      //   fireEvent.click(individualCheckbox);
      //   expect(individualCheckbox.checked).toBe(true);
      //   fireEvent.click(individualCheckbox);
      //   expect(individualCheckbox.checked).toBe(false);
      // });

      // test('Disables delete button when no rows are selected', () => {
      //   render(<Wrapper/>);
      //   const deleteButton = screen.getByTestId('DeleteNotification');
      //   expect(deleteButton).toBeDisabled();
      // });

      // test('Enables delete button when rows are selected', () => {
      //   render(<Wrapper/>);
      //   const checkboxes = screen.getAllByTestId('UniqueCheck') as HTMLInputElement[];
      //   const individualCheckbox = checkboxes[0];
      //   fireEvent.click(individualCheckbox);
      //   const deleteButton = screen.getByTestId('DeleteNotification');
      //   expect(deleteButton).not.toBeDisabled();    

      // });

      // test('Displays unread notification indicator correctly', () => {
      //   render(<Wrapper/>);
      //   const unreadIndicators = screen.getAllByTestId('read');
      //   const individualUnreadIndicator = unreadIndicators[0];
      //   expect(individualUnreadIndicator).toBeInTheDocument();
      // });

      

})