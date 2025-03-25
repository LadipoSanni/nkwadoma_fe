import Index from '@/reuseable/bar-chart/index'
import {render, screen} from "@testing-library/react";

describe('test bar chart component', () => {

    test('that bar chart exists', ()=> {
        render(<Index componentId={'testingBarChart'} maxWidth={''} maxHeight={''} />);
        expect(screen.getByTestId('testingBarChart')).toBeInTheDocument();
    })

    test('that bar chart display number of bar passed to it', ()=> {
        render(<Index componentId={'testingBarChart'} maxWidth={''} maxHeight={''} />);

    })

})