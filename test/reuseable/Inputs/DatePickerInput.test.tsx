import React from 'react';
import { render, fireEvent, screen,cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePickerInput from '@/reuseable/Input/DatePickerInput';
import { format } from 'date-fns';


const onDateChangeMock = jest.fn();

const setup = (props = {}) =>
  render(
    <DatePickerInput
      selectedDate={undefined}
      onDateChange={onDateChangeMock}
      {...props}
    />
  );

  describe('DatePickerInput Component', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
        cleanup()
        jest.spyOn(console,'log').mockReturnValue()
        jest.spyOn(console,'warn').mockReturnValue()
        jest.spyOn(console,'error').mockReturnValue()
    })

    test(' Renders without crashing', () => {
        setup();
        expect(screen.getByText('Select a date')).toBeInTheDocument();
      });
    
      test('Displays placeholder text if no date is selected', () => {
        setup();
        expect(screen.getByText('Select a date')).toBeInTheDocument();
      });

      test('Displays the selected date in "dd-MM-yyyy" format', () => {
        const date = new Date('2024-10-29');
        setup({ selectedDate: date });
    
        expect(screen.getByText(format(date, 'dd-MM-yyyy'))).toBeInTheDocument();
      });

      test('Opens the calendar popover on button click', () => {
        setup();
        const button = screen.getByTestId("calenderButton")
        fireEvent.click(button);
        expect(screen.getByRole('dialog')).toBeVisible();
      });

      test('Closes the calendar popover on date selection', () => {
        setup();
        const button = screen.getByTestId("calenderButton")
        fireEvent.click(button);
        expect(screen.getByRole('dialog')).toBeVisible();
        const selected = screen.getAllByText('29');
        fireEvent.click(selected[0]); 
        expect(screen.queryByRole('rounded-md border ')).not.toBeInTheDocument();
      });

      test('Triggers onDateChange callback when Done is clicked', async () => {
        setup();
        const button = screen.getByTestId("calenderButton");
        fireEvent.click(button);
        const day29 = screen.getAllByText('29')[0];
        fireEvent.click(day29);
        const doneButton = screen.getByText('Done');
        fireEvent.click(doneButton);
        
        expect(onDateChangeMock).toHaveBeenCalledWith(expect.any(Date));
      });

      test(' Applies the `className` prop correctly to the button', () => {
        const customClass = 'w-full';
        setup({ className: customClass });
    
        const button = screen.getByTestId("calenderButton")
        expect(button).toHaveClass(customClass);
      });



  test('Applies the `calendarStyle` prop correctly to PopoverContent', () => {
    const customCalendarStyle = 'custom-calendar-style';
    setup({ calendarStyle: customCalendarStyle });

    const button = screen.getByTestId("calenderButton")
    fireEvent.click(button);
    expect(screen.getByRole('dialog')).toHaveClass(customCalendarStyle);
  });

  test('Disables interaction when popover is open and clicking the button again and closing the popover content', () => {
    setup();
    const button = screen.getByTestId("calenderButton")
    fireEvent.click(button);
    fireEvent.click(button);
   
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('Does not trigger onDateChange if no date is selected', () => {
    setup();
    const button = screen.getByTestId("calenderButton")
    fireEvent.click(button);
    fireEvent.click(document.body); 

    expect(onDateChangeMock).not.toHaveBeenCalled();
  });

  test('Renders correctly with a pre-selected date', () => {
    const date = new Date('2024-10-29');
    setup({ selectedDate: date });

    expect(screen.getByText(format(date, 'dd-MM-yyyy'))).toBeInTheDocument();
  });

  test(' Popover text properly using the text-popover-foreground  prop', () => {
    setup();
    const button = screen.getByTestId("calenderButton")
    fireEvent.click(button);

    const popoverContent = screen.getByRole('dialog');
    expect(popoverContent).toHaveClass('text-popover-foreground '); 
  });

});

    



