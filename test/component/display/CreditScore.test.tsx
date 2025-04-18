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

    // test('should display good as description of credit score is good', ()=> {
    //     const renderedCreditScore1 = render(
    //         <CreditScore creditScoreDescriptionId={'testing1'} creditScore={700}/>
    //     );
    //     const renderedCreditScore2 = render(
    //         <CreditScore creditScoreDescriptionId={'testing2'} creditScore={739}/>
    //     )
    //     const renderedCreditScore3 = render(
    //         <CreditScore creditScoreDescriptionId={'testing3'} creditScore={749}/>
    //     )
    //     const renderedCreditScore4 = render(
    //         <CreditScore creditScoreDescriptionId={'testing4'} creditScore={720}/>
    //     )
    //     const description1 = renderedCreditScore1.getByTestId('testing1')
    //     const description2 = renderedCreditScore2.getByTestId('testing2')
    //     const description3 = renderedCreditScore3.getByTestId('testing3')
    //     const description4 = renderedCreditScore4.getByTestId('testing4')
    //     expect(description1).toHaveTextContent('/Good$/i')
    //     expect(description2).toHaveTextContent('/Good$/i')
    //     expect(description3).toHaveDisplayValue('/Good$/i')
    //     expect(description4).toHaveDisplayValue('/Good$/i')
    // })


})