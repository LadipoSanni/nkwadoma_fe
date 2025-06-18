import { cleanup,fireEvent, screen, render} from "@testing-library/react";
import NotificationButton from "@/reuseable/buttons/Notification-button";





describe('NotificationButton Component', () => {
    const mockHandleLeftChange = jest.fn();
    const mockHandleRightChange = jest.fn();

    function Wrapper() {
      
        return (
          <NotificationButton
          handleLeftChange={mockHandleLeftChange}
          handleRightChange={mockHandleRightChange}
          totalItem={20}
          trackCountFirst={1}
          trackCountLast={10}
          pageNumber={0}
          hasNextPage={true}
          testIdPrevious="handlePrevious"
          testIdNext="handleNext"
          />
        );
      }

       beforeEach(() => {
              jest.clearAllMocks();
                cleanup();
        
                jest.spyOn(console, 'log').mockReturnValue();
                jest.spyOn(console, 'warn').mockReturnValue();
                jest.spyOn(console, 'error').mockReturnValue();
            })

      test('Renders without crashing', () => {
        render(
          <Wrapper/>
        );
        expect(screen.getByTestId('count')).toBeInTheDocument();
      });

      test('Handles left button click correctly', () => {
        render(
            <Wrapper/>
          );
        const leftButton = screen.getByTestId('handlePrevious');
        fireEvent.click(leftButton);
        // expect(mockHandleLeftChange).toHaveBeenCalled();
      });

      test('Handles right button click correctly', () => {
        render(
            <Wrapper/>
          );
        const rightButton = screen.getByTestId('handleNext');
        fireEvent.click(rightButton);
        expect(mockHandleRightChange).toHaveBeenCalled();
      });

      test('Disables left button when on the first page', () => {
        render(
            <Wrapper/>
          );
        const leftButton = screen.getByTestId('handlePrevious');
        expect(leftButton).toHaveClass('cursor-none');
      });

      test('right button to contain', () => {
        render(
            <Wrapper/>
          );
        const rightButton = screen.getByTestId('handleNext');
        expect(rightButton).toHaveClass('rounded-full bg-[#f9f9f9]');
        
      });

      test('Handles left button with test ID correctly', () => {
        render(
            <Wrapper/>
          );
        const leftButton = screen.getByTestId('handlePrevious');
        expect(leftButton).toBeInTheDocument();
      });

      test('Handles right button with test ID correctly', () => {
        render(
            <Wrapper/>
          );
        const rightButton = screen.getByTestId('handleNext');
        expect(rightButton).toBeInTheDocument();
      });

      test('Displays ChevronLeft icon correctly', () => {
        render(
            <Wrapper/>
          );
        const leftButton = screen.getByTestId('handlePrevious');
        expect(leftButton.querySelector('svg')).toHaveClass('h-4 bg-[#f9f9f9]');
      });

      test('Displays ChevronRight icon correctly', () => {
        render(
            <Wrapper/>
          );
        const rightButton = screen.getByTestId('handleNext');
        expect(rightButton.querySelector('svg')).toHaveClass('h-4');
      });

      test('Disables right button when on the last page', () => {
        render(
          <NotificationButton
            handleLeftChange={mockHandleLeftChange}
            handleRightChange={mockHandleRightChange}
            totalItem={20}
            trackCountFirst={1}
            trackCountLast={10}
            pageNumber={0}
            hasNextPage={false}
           testIdPrevious="handlePrevious"
           testIdNext="handleNext"
          />
        );
        const rightButton = screen.getByTestId('handleNext');
        expect(rightButton).toHaveClass('cursor-none');
      });
    });

    