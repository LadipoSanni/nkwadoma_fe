import {render, screen} from "@testing-library/react";
import CreditScore from "@/features/display/CreditScore";

describe('test credit score', () => {

    test('that credit score component exist ', () => {
        render(
            <CreditScore creditScore={1}/>
        )
        expect(screen.getByTestId('CreditScoreComponent')).toBeInTheDocument()
    })

    test('should contain credit score description and score ', ()=> {
        render(
            <CreditScore creditScore={0}/>
        )
        const score = screen.getByTestId('creditScore')
        const description = screen.getByTestId('creditScoreDescription')
        expect(score).toBeInTheDocument()
        expect(description).toBeInTheDocument()
    })
})