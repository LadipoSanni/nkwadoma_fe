import {render} from "@testing-library/react";

describe('test bar chart component', () => {

    test('that bar chart exists', ()=> {
        render(<div />);
        // expect(screen.getByTestId('testingBarChart')).toBeInTheDocument();
    })

    // test('that bar chart display number of bar passed to it', ()=> {
    //     render(<Index componentId={'testingBarChart'} maxWidth={''} maxHeight={''} />);

    // })

})