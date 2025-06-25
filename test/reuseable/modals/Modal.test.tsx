import "@testing-library/react";
import Modal from "@/reuseable/modals/Modal";
import {render, screen} from "@testing-library/react";

describe('Modal', () => {
    test('Modal', () => {
        render(<Modal modalId={'testingModal'}/>)
        expect(screen.getByTestId('testingModal')).toBeInTheDocument();
     });
});