import DropdownFilter from '@/reuseable/Dropdown/DropdownFilter';
import '@testing-library/react'
import {render, screen} from "@testing-library/react";


describe('test dropdown component', () => {
    test('should render dropdown', () => {
        render(<DropdownFilter />)
        const component =   screen.getByTestId('dropdownFilter')
        expect(component).toBeInTheDocument()
    })

})