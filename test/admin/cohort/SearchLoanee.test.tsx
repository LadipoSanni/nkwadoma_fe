import React, {useState} from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {LoaneeInCohortView} from "@/features/cohort/cohort-details/LoaneeInCohortView/Index";
import {Providers} from "@/app/provider";
import {Input} from "@/components/ui/input";

describe("LoaneeInCohortView - Search Functionality (Integration)", () => {
    it("should test that search input placeholder is search",  () => {
        render(
            <Providers>
            <LoaneeInCohortView />
            </Providers>
        );

        const searchInput = screen.getByPlaceholderText("Search");
        expect(searchInput).toBeInTheDocument();

    });

    test('allows text to be inputted into the search input', () => {
        const TestComponent = () => {
            const [loaneeName, setLoaneeName] = useState('');
            return (
                <Input
                    className='w-full lg:w-80 h-12 focus-visible:outline-0 focus-visible:ring-0 shadow-none border-solid border border-neutral650 text-grey450 pl-10'
                    type="search"
                    value={loaneeName}
                    id="search"
                    placeholder="Search"
                    onChange={(e) => setLoaneeName(e.target.value)}
                />
            );
        };

        render(<TestComponent />);

        const inputElement = screen.getByPlaceholderText('Search');

        expect(inputElement).toHaveValue('');

        fireEvent.change(inputElement, { target: { value: 'John Doe' } });

        expect(inputElement).toHaveValue('John Doe');
    });

});
