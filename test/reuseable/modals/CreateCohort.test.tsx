import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateCohort from '@/reuseable/modals/CreateCohort';
import { Providers } from '@/app/provider';

// Mock dialog components if needed
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogClose: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    usePathname: () => jest.fn(),
}));

describe('CreateCohort Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    // it('should render the Create Cohort button', () => {
    //     render(
    //         <Providers>
    //             <CreateCohort />
    //         </Providers>
    //     );
    //     expect(screen.getByText(/Create cohort/i)).toBeInTheDocument();
    // });

    it("displays the Cohort Name input field", async () => {
        render(
            <Providers>
                <CreateCohort />
            </Providers>
        );
        expect(screen.getByLabelText(/Cohort Name/i)).toBeInTheDocument();
    });
});