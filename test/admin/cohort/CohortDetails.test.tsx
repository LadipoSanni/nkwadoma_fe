import {render,  cleanup} from "@testing-library/react";
import {useRouter} from "next/navigation";
import "@testing-library/jest-dom";
import CohortDetails from "../../../src/features/cohort/cohort-details/details/Index";
import {Providers} from "@/app/provider";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
    usePathname: () => jest.fn(),
}));

describe("cohort-details Component", () => {
    const mockPush = jest.fn();
    const mockRouter = {
        push: mockPush,
    };

    // const handleBackClick = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        cleanup();
        jest.spyOn(console, 'log').mockReturnValue();
        jest.spyOn(console, 'warn').mockReturnValue();
        jest.spyOn(console, 'error').mockReturnValue();
    });

    test("renders cohort-details title and description", () => {
        render(
            <Providers>
                <CohortDetails/>
            </Providers>
        );
    });

    // test("displays the correct cohort-details details data", () => {
    //     render(
    //         <Providers>
    //             <CohortDetails/>
    //         </Providers>
    //     );
    //
    //     expect(screen.getByText("Number employed")).toBeInTheDocument();
    // });
    //
    // test("renders data with correct data", () => {
    //     render(
    //         <Providers>
    //             <CohortDetails/>
    //         </Providers>
    //     );
    //
    //     const assert = screen.getByTestId("backClickContainer");
    //     expect(assert).toBeInTheDocument();
    // });
    //
    // it("should test that arrowBack routes to the previous page", async () => {
    //     render(
    //         <Providers>
    //             <CohortDetails/>
    //         </Providers>
    //     );
    //
    //     const assert = screen.getByTestId("backClickContainer");
    //     expect(assert).toBeInTheDocument();
    //     const check = screen.getByTestId("backClickContainer");
    //
    //     fireEvent.click(check);
    //     expect(handleBackClick).toHaveBeenCalledTimes(0);
    // });
});
