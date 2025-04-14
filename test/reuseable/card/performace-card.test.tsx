import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";
import React from "react";
import {render, screen} from "@testing-library/react";


describe('test performance card', ()=> {

    test('performance card exist', ()=> {
        render(
            <PerformanceCard id={'performanceCard'} showContainerBorder={false} percentage={20} showPerformancePercentage={true} maxWidth={'100%'} title={'Percentage '} value={20000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>
        )
        expect(screen.getByTestId('performanceCard')).toBeInTheDocument();
    })

    test('performance card display title passed into component', ()=> {
        const title = 'test title';
        render(
            <PerformanceCard id={'testing'} showContainerBorder={false} percentage={20} showPerformancePercentage={true} maxWidth={'100%'} title={title} value={20000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>

        )
        const titleTag = screen.getByText(title)
        expect(titleTag).toHaveTextContent('test title');
    })

    test('performance card display value passed into component', ()=> {
        const value = '₦20,000.00';
        render(
            <PerformanceCard id={'testing'} showContainerBorder={false} percentage={20} showPerformancePercentage={false} maxWidth={'100%'} title={'title'} value={20000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>

        )

        const displayedValue = screen.getByText(value);
        // console.log('displayedValue', displayedValue);
        expect(displayedValue).toHaveTextContent('₦20,000.00');
    })

    test('performance card display percentage when showPerformancePercentage parameter is true', ()=> {
        const expectedPercentage = '20%'
         render(
            <PerformanceCard id={'testing'} showContainerBorder={false} percentage={20} showPerformancePercentage={true} maxWidth={'100%'} title={'title'} value={20000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>
        )
        const performancePercentage = screen.getByText(expectedPercentage)
        expect(performancePercentage).toHaveTextContent(expectedPercentage);
    })

    test('performance card does not display percentage when showPerformancePercentage parameter is false', ()=> {
        const expectedPercentage = '20%'
        render(
            <PerformanceCard id={'testing'} showContainerBorder={false} percentage={20} showPerformancePercentage={false} maxWidth={'100%'} title={'title'} value={20000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>
        )
        expect(screen.queryByText(expectedPercentage)).not.toBeInTheDocument();
    })
})