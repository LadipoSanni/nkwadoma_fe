// import React from 'react';
// import {cleanup, fireEvent, render, screen} from '@testing-library/react';
// import ProgramView from '@/features/program/program-view';
// import ProgramDetails from '@/features/program/program-details/Index';
// import { Providers } from '@/app/provider';

// jest.mock('next/navigation', () => ({
//     useRouter: jest.fn(),
// }));
// import {useRouter} from "next/navigation";

// describe('program-view Component', () => {
//     const mockPush = jest.fn();

//     beforeEach(() => {
//         jest.clearAllMocks();
//         cleanup();

//         (useRouter as jest.Mock).mockReturnValue({
//             push: mockPush,
//         });
//     });

//     test('renders program-view component', () => {
//         render(
//             <Providers>
//                 <ProgramView />
//             </Providers>
//     );
//         expect(screen.getByText('Create program')).toBeInTheDocument();
//     });

//     test('displays details tab content by default', () => {
//         render(
//             <Providers>
//                 <ProgramDetails/>
//             </Providers>
//     );
//         // expect(screen.getByText('Product Design')).toBeInTheDocument();
//         expect(screen.getByText('Edit program')).toBeInTheDocument();
//     });

//     test('displays cohorts tab content when clicked', () => {
//         render(
//             <Providers>
//                 <ProgramDetails/>
//             </Providers>
//     );
//         fireEvent.click(screen.getByText('Cohorts'));
//         expect(screen.getByText('Cohorts')).toBeInTheDocument();
//     });

//     test('navigates back to programs on back button click', () => {
//         render(
//             <Providers>
//                 <ProgramDetails/>
//             </Providers>
//     );
//         fireEvent.click(screen.getByTestId('backClick'));
//         expect(mockPush).toHaveBeenCalledWith('/program');
//     });

//     test('renders search input in cohorts tab', () => {
//         render(
//             <Providers>
//                 <ProgramDetails/>
//             </Providers>
//     );
//         fireEvent.click(screen.getByText('Cohorts'));
//     });

//     test('renders table in cohorts tab', () => {
//         render(
//             <Providers>
//                 <ProgramDetails/>
//             </Providers>
//     );
//         fireEvent.click(screen.getByText('Cohorts'));
//     });
// });
import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import ProgramView from '@/features/program/program-view';
import { Providers } from '@/app/provider';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useNavigation: jest.fn(),
    usePathname: () => jest.fn(),
}));

import {useRouter} from "next/navigation";

describe('program-view Component', () => {
    const mockPush = jest.fn();
    global.fetch = jest.fn(() =>
        Promise.resolve(new Response(JSON.stringify({ data: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }))
    );
    beforeEach(() => {
        cleanup()
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });

    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    test('renders program-view component', () => {
        // act(() => {
            render(
                <Providers>
                    <ProgramView />
                </Providers>
            );
        // });
        expect(screen.getByText('Create program')).toBeInTheDocument();
    });

    // test('displays details tab content by default', () => {
    //     act(() => {
    //         render(
    //             <Providers>
    //                 <ProgramDetails />
    //             </Providers>
    //         );
    //     });
      
    //     expect(screen.getByText('Edit program')).toBeInTheDocument();
    // });

    // test('displays cohorts tab content when clicked', () => {
    //     act(() => {
    //         render(
    //             <Providers>
    //                 <ProgramDetails />
    //             </Providers>
    //         );
    //     });
    //     act(() => {
    //         fireEvent.click(screen.getByText('Cohorts'));
    //     });
    //     expect(screen.getByText('Cohorts')).toBeInTheDocument();
    // });

    // test('navigates back to programs on back button click', () => {
    //     act(() => {
    //         render(
    //             <Providers>
    //                 <ProgramDetails />
    //             </Providers>
    //         );
    //     });
    //     act(() => {
    //         fireEvent.click(screen.getByTestId('backClick'));
    //     });
    //     expect(mockPush).toHaveBeenCalledWith('/program');
    // });

    // test('renders search input in cohorts tab', () => {
    //     act(() => {
    //         render(
    //             <Providers>
    //                 <ProgramDetails />
    //             </Providers>
    //         );
    //     });
    //     act(() => {
    //         fireEvent.click(screen.getByText('Cohorts'));
    //     });
       
    // });

    // test('renders table in cohorts tab', () => {
    //     act(() => {
    //         render(
    //             <Providers>
    //                 <ProgramDetails />
    //             </Providers>
    //         );
    //     });
    //     act(() => {
    //         fireEvent.click(screen.getByText('Cohorts'));
    //     });
        
    // });
});
