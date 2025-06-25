import { fireEvent, render, screen } from '@testing-library/react';
import * as scriptLoader from '@/lib/google-maps';
import GoogleLocationsearch from '@/reuseable/google-location/Google-location-search';
import usePlacesAutocomplete from 'use-places-autocomplete';

jest.mock('use-places-autocomplete', () => ({
    __esModule: true,
    default: jest.fn(() => ({
      value: '',
      setValue: jest.fn(),
      suggestions: { data: [] },
      clearSuggestions: jest.fn(),
    })),
  }));

  jest.mock('@/lib/google-maps', () => ({
    __esModule: true,
    loadGoogleMapsScript: jest.fn().mockResolvedValue(undefined),
  }));

  jest.spyOn(scriptLoader, 'loadGoogleMapsScript').mockResolvedValue();

  const mockedUsePlacesAutocomplete = usePlacesAutocomplete as jest.Mock;
  describe('GoogleLocationsearch', () => {
    const setAddress = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(console, 'log').mockReturnValue();
      jest.spyOn(console, 'warn').mockReturnValue();
      jest.spyOn(console, 'error').mockReturnValue();
    });

    it('renders an input by default', async () => {
        render(<GoogleLocationsearch address="" setAddress={setAddress} />);
        const input = await screen.findByPlaceholderText(/search address/i);
        expect(input).toBeInTheDocument();
      });

      it('renders a textarea if variant is textarea', () => {
        render(<GoogleLocationsearch address="" setAddress={setAddress} variant="textarea" />);
        const textarea = screen.getByPlaceholderText(/search address/i);
        expect(textarea.tagName.toLowerCase()).toBe('textarea');
      });

      it('displays helper text when provided', () => {
        render(<GoogleLocationsearch address="" setAddress={setAddress} helperText="Hint" />);
        expect(screen.getByText(/hint/i)).toBeInTheDocument();
      });
    
      it('applies error styles when error prop is true', () => {
        render(<GoogleLocationsearch address="" setAddress={setAddress} error helperText="Error text" />);
        expect(screen.getByText(/error text/i)).toHaveClass('text-red-500');
      });

      it('calls setAddress when input value changes', () => {
        render(<GoogleLocationsearch address="" setAddress={setAddress} />);
        const input = screen.getByPlaceholderText(/search address/i);
        fireEvent.change(input, { target: { value: 'Lagos' } });
        expect(setAddress).toHaveBeenCalledWith('Lagos');
      });

      it('renders an input by default', async () => {
        mockedUsePlacesAutocomplete.mockReturnValue({
          value: '',
          setValue: jest.fn(),
          suggestions: { data: [] },
          clearSuggestions: jest.fn(),
        });
    
        render(<GoogleLocationsearch address="" setAddress={setAddress} />);
        const input = await screen.findByPlaceholderText(/search address/i);
        expect(input).toBeInTheDocument();
      });
    
      it('renders a textarea when variant is textarea', () => {
        mockedUsePlacesAutocomplete.mockReturnValue({
          value: '',
          setValue: jest.fn(),
          suggestions: { data: [] },
          clearSuggestions: jest.fn(),
        });
    
        render(<GoogleLocationsearch address="" setAddress={setAddress} variant="textarea" />);
        const textarea = screen.getByPlaceholderText(/search address/i);
        expect(textarea.tagName.toLowerCase()).toBe('textarea');
      });

      it('displays helper text', () => {
        mockedUsePlacesAutocomplete.mockReturnValue({
          value: '',
          setValue: jest.fn(),
          suggestions: { data: [] },
          clearSuggestions: jest.fn(),
        });
    
        render(<GoogleLocationsearch address="" setAddress={setAddress} helperText="Hint message" />);
        expect(screen.getByText(/hint message/i)).toBeInTheDocument();
      });

      it('calls setAddress when input changes', () => {
        const mockSetValue = jest.fn();
        mockedUsePlacesAutocomplete.mockReturnValue({
          value: '',
          setValue: mockSetValue,
          suggestions: { data: [] },
          clearSuggestions: jest.fn(),
        });
    
        render(<GoogleLocationsearch address="" setAddress={setAddress} />);
        const input = screen.getByPlaceholderText(/search address/i);
        fireEvent.change(input, { target: { value: 'Abuja' } });
        expect(mockSetValue).toHaveBeenCalledWith('Abuja');
        expect(setAddress).toHaveBeenCalledWith('Abuja');
      });

   
      
  })