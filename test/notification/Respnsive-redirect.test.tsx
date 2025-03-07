import { cleanup,screen, render} from "@testing-library/react";
import { useRouter, usePathname } from 'next/navigation'
import ResponsiveRedirect from "@/layout/responsive-redirect-layout.tsx";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

const MockComponent = () => <div>Mock Component</div>;

describe('ResponsiveRedirect Component', () => {
    let useRouterMock: ReturnType<typeof useRouter>;
    let usePathnameMock: ReturnType<typeof usePathname>;

    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();
        useRouterMock = {
            replace: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
            push: jest.fn(),
            prefetch: jest.fn(),
          } as unknown as ReturnType<typeof useRouter>;
        usePathnameMock = '/';
        (useRouter as jest.Mock).mockReturnValue(useRouterMock);
        (usePathname as jest.Mock).mockReturnValue(usePathnameMock);
        jest.spyOn(console, 'log').mockReturnValue();
        jest.spyOn(console, 'warn').mockReturnValue();
        jest.spyOn(console, 'error').mockReturnValue();
    });

    test('Renders children if on mobile view', () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === '(max-width: 767px)',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }));

        render(
            <ResponsiveRedirect mobilePath="/mobile" webPath="/web">
                <MockComponent />
            </ResponsiveRedirect>
        );

        expect(screen.getByText('Mock Component')).toBeInTheDocument();
    });

    test('Does not render children if not on mobile view', () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query !== '(max-width: 767px)',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }));

        render(
            <ResponsiveRedirect mobilePath="/mobile" webPath="/web">
                <MockComponent />
            </ResponsiveRedirect>
        );

        expect(screen.queryByText('Mock Component')).not.toBeInTheDocument();
    });

    test('Redirects to mobilePath when on mobile view', () => {
        // Set up a mobile view
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === '(max-width: 767px)',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }));

        render(
            <ResponsiveRedirect mobilePath="/mobile" webPath="/web">
                <MockComponent />
            </ResponsiveRedirect>
        );

        expect(useRouterMock.replace).toHaveBeenCalledWith('/mobile');
    });

    test('Redirects to webPath when not on mobile view', () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query !== '(max-width: 767px)',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }));

        render(
            <ResponsiveRedirect mobilePath="/mobile" webPath="/web">
                <MockComponent />
            </ResponsiveRedirect>
        );

        expect(useRouterMock.replace).toHaveBeenCalledWith('/web');
    });

    


})