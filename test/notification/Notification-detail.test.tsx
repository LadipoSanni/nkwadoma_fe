import { cleanup, screen, render} from "@testing-library/react";
import NotificationDetailPage from "@/features/notification/Notification-details";
import { getInitials } from "@/utils/GlobalMethods";
import { useRouter } from 'next/navigation';
import { Providers } from "@/app/provider";


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: () => jest.fn(),
}));

describe('NotificationDetail Component',()=> {
  const mockPush = jest.fn();
    beforeEach(() => {
      global.fetch = jest.fn(() =>
          Promise.resolve(new Response(JSON.stringify({ data: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }))
      );
        jest.clearAllMocks();
          cleanup();

          (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
          });
  
          jest.spyOn(console, 'log').mockReturnValue();
          jest.spyOn(console, 'warn').mockReturnValue();
          jest.spyOn(console, 'error').mockReturnValue();
      })

      const mockNotification = {
        id: '1',
        type: 'Loan Application Received',
        subtitle: 'Exciting Opportunity!',
        message: 'Your loan application has been received.',
        read: true,
        senderName: 'John Doe',
        senderEmail: 'john.doe@example.com',
        timeSent: 'Today 10:45 AM',
        receiverName: 'Jane Doe',
        callToActionRequired: true,
      };

      function Wrapper() {
         return (
          <Providers>
            <NotificationDetailPage
              notificationId={mockNotification.id}
            />
          </Providers>
          
         )
      }

      it('renders without crashing', () => {
        render(<Wrapper />);
      });

      // it('displays notification type', () => {
      //   render(<Wrapper />);
      //   expect(screen.getByText(mockNotification.type)).toBeInTheDocument();
      // });

      // it('displays sender\'s email', () => {
      //   render(<Wrapper />);
      //   expect(screen.getByText(mockNotification.senderEmail)).toBeInTheDocument();
      // });
    
      // it('displays sender\'s initials', () => {
      //   render(<Wrapper />);
      //   const initials = getInitials(mockNotification.senderName);
      //   expect(screen.getByText(initials)).toBeInTheDocument();
      // });

      // it('displays the time sent', () => {
      //   render(<Wrapper />);
      //   expect(screen.getByText(mockNotification.timeSent)).toBeInTheDocument();
      // });
    
      // it('displays receiver\'s name', () => {
      //   render(<Wrapper />);
      //   expect(screen.getByText(mockNotification.receiverName)).toBeInTheDocument();
      // });
    
      // it('displays the notification message', () => {
      //   render(<Wrapper />);
      //   expect(screen.getByText(mockNotification.message)).toBeInTheDocument();
      // });

      // it('displays call to action text if callToActionRequired is true', () => {
      //   render(<Wrapper />);
      //   expect(screen.getByText('Click on the button to view the full details of your loan')).toBeInTheDocument();
      // });
    
      // it('hides call to action text if callToActionRequired is false', () => {
      //   const notification = { ...mockNotification, callToActionRequired: false };
      //   render(<NotificationDetailPage notification={notification} />);
      //   expect(screen.queryByText('Click on the button to view the full details of your loan')).not.toBeInTheDocument();
      // });
   
      // test('Renders with assistance', () => {
      //   render(<Wrapper />);
      //   expect(screen.getByText('If you have any question or further assistance, our customer service team is here to help you')).toBeInTheDocument();
      // });

      //   test('Renders call to action button if callToActionRequired is true', () => {
      //       render(<Wrapper />);
      //     expect(screen.getByText('View loan offer')).toBeInTheDocument();
      //   });
})


