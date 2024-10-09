import "@testing-library/react"

import {render, screen} from "@testing-library/react";
import LoanEmptyState from "@/reuseable/emptyStates/Index";


describe("LoanEmptyState component", () => {
    it('should test that LoanEmptyState component does not exist', () => {
        const {queryByTestId} = render(<div></div>);

        const emptyState = queryByTestId('loanEmptyState');

        expect(emptyState).not.toBeInTheDocument();
    });

    it('should est that LoanEmptyState component exist', () => {
        const {queryByTestId} = render(<LoanEmptyState title={`Loan Disbursal`}/>);

        expect(queryByTestId('loanEmptyState')).toBeInTheDocument();
    });

    it('should extract and display the first and second word of the title to lowercase in the description', () => {
        const title = 'LOAN OFFER WILL SHOW HERE';

        render(<LoanEmptyState title={title}/>);

        const [firstWord, secondWord] = title.split(' ').slice(0, 2).map(word => word.toLowerCase());

        const expectedDescription = `There are no ${firstWord} ${secondWord} available for this institute`;

        expect(expectedDescription).toEqual("There are no loan offer available for this institute");

        const descriptionElement = screen.getByTestId('emptyStateDescription');

        expect(descriptionElement).toHaveTextContent(expectedDescription);
    });


    it('should test that empty state component renders the correct number of blocks', () => {
        const {getAllByTestId} = render(<LoanEmptyState title="Loan books will show here"/>);
        const blocks = getAllByTestId(/empty_StateBlock/i);
        expect(blocks.length).toBe(3);
    });

    it("should test that box shadow is applied to second block only", () => {
        const {getByTestId} = render(<LoanEmptyState title="Loan refferers will show here"/>);
        const secondBlock = getByTestId('empty_StateBlock1');
        expect(secondBlock).toHaveStyle('box-shadow: 0px 2px 8px 0px rgba(99, 99, 99, 0.12)');
    });

    it('should test that empty state component renders the description with the first two words of the title in it', () => {
        const title = "Loan request will show here";
        render(<LoanEmptyState title={title}/>);

        const [firstWord, secondWord] = title.split(' ').slice(0, 2).map(word => word.toLowerCase());

        const expected = `There are no ${firstWord} ${secondWord} available for this institute`;

        const received = "There are no loan request available for this institute"

        expect(expected).toContain(received);
    })
});
