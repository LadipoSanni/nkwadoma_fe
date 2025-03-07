import { cleanup,renderHook, act } from "@testing-library/react";
import ToastPopUp from "@/reuseable/notification/ToastPopUp";
import { useToast } from '@/hooks/use-toast';

jest.mock('@/hooks/use-toast', () => ({
    useToast: jest.fn(),
  }));

describe("ToastPopUp", () => {
    const mockToast = jest.fn();
   

    beforeEach(() => {
        jest.clearAllMocks();
        (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
        cleanup();
      });
    
      it('should call toast with the correct arguments', () => {
        const actionElement = <button>Test Action</button>;
        const { result } = renderHook(() =>
          ToastPopUp({
            title: 'Test Title',
            description: 'Test Description',
            className: 'test-class',
            action:actionElement,
          })
        );
    
       
        act(() => {
          result.current.showToast();
        });
    
        expect(mockToast).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Test Title',
                description: 'Test Description',
                className: 'test-class',
                action: actionElement,
            })
        );
      });

      it('should work without an optional title and action', () => {
        const { result } = renderHook(() =>
          ToastPopUp({
            description: 'Test Description',
            className: 'test-class',
          })
        );
    
        act(() => {
          result.current.showToast();
        });
    
        expect(mockToast).toHaveBeenCalledWith(
            expect.objectContaining({  
          title: undefined,
          description: 'Test Description',
          className: 'test-class',
          action: undefined,
            })
        );
      });


      it('should call toast with custom className if provided', () => {
        const { result } = renderHook(() =>
            ToastPopUp({
                title: 'Custom Class Title',
                description: 'Custom Class Description',
                className: 'custom-toast-class',
            })
        );

        act(() => {
            result.current.showToast();
        });

        expect(mockToast).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Custom Class Title',
                description: 'Custom Class Description',
                className: 'custom-toast-class',
                action: undefined,
            })
        );
    });

    it('should call toast with an action if provided', () => {
        const actionElement = <button>Action Button</button>;

        const { result } = renderHook(() =>
            ToastPopUp({
                title: 'Action Title',
                description: 'Action Description',
                action: actionElement,
            })
        );

        act(() => {
            result.current.showToast();
        });

        expect(mockToast).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Action Title',
                description: 'Action Description',
                className: undefined,
                action: actionElement,
            })
        );
    });

    it('should call toast with default props if no title or action is provided', () => {
        const { result } = renderHook(() =>
            ToastPopUp({
                description: 'Default Prop Description',
                className: 'bg-red-100',
            })
        );

        act(() => {
            result.current.showToast();
        });

        expect(mockToast).toHaveBeenCalledWith(
            expect.objectContaining({
                title: undefined,
                description: 'Default Prop Description',
                className: 'bg-red-100',
                action: undefined,
            })
        );
    });
})


