import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import MarketPlaceView from '@/features/market-place/Index';

jest.mock('@/reusable/Input/SearchInput', () => ({
    __esModule: true,
    default: ({ id, value, onChange }: { id: string; value: string; onChange: () => void }) => (
        <input
            data-testid={id}
            value={value}
            onChange={onChange}
            placeholder="Search..."
        />
    ),
}));

jest.mock('@/reusable/cards/Investment-card/InvestmentCard', () => ({
    __esModule: true,
    default: ({
                  id,
                  HandleCardDetails
              }: {
        id: string;
        HandleCardDetails: (id: string) => void;
    }) => (
        <div data-testid={`investment-card-${id}`} onClick={() => HandleCardDetails(id)}>
            Mock Investment Card
        </div>
    ),
}));

describe('MarketPlaceView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.dispatch({ type: 'RESET' });
    });

    test('renders without crashing', () => {
        render(
            <Provider store={store}>
                <MarketPlaceView />
            </Provider>
        );
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    test('renders all investment cards', () => {
        render(
            <Provider store={store}>
                <MarketPlaceView />
            </Provider>
        );

        const investmentCards = screen.getAllByText(/Mock Investment Card/i);
        expect(investmentCards.length).toBe(10); // Should match dummyInvestments length
    });

    test('search input is rendered and can be interacted with', () => {
        render(
            <Provider store={store}>
                <MarketPlaceView />
            </Provider>
        );

        const searchInput = screen.getByTestId('ProgramSearchInput');
        fireEvent.change(searchInput, { target: { value: 'Software' } });
    });

    test('clicking on investment card dispatches correct action', () => {
        render(
            <Provider store={store}>
                <MarketPlaceView />
            </Provider>
        );

        const firstCard = screen.getByTestId('investment-card-1');
        fireEvent.click(firstCard);

        const state = store.getState();
        expect(state.program.marketInvestmentVehicleId).toBe('1');
    });

    test('matches snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MarketPlaceView />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders correct number of Commercial and Endowment cards', () => {
        render(
            <Provider store={store}>
                <MarketPlaceView />
            </Provider>
        );

        const commercialCards = screen.getAllByText(/Mock Investment Card/i);
        expect(commercialCards.length).toBe(10);
    });
});