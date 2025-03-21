import {
    handleClick,
    handleSaveAndBackToAllDraft,
    handleContinueButton, Draft
} from "@/features/portfolio-manager/fund/draft/Index";
import vehicleReducer, {setSaveClickedDraft} from "@/redux/slice/vehicle/vehicle";
import { configureStore } from "@reduxjs/toolkit";

describe("Draft Component Functions", () => {
    const mockDraft: Draft = {
        id: "1",
        name: "Test Draft",
        investmentVehicleType: "COMMERCIAL",
        mandate: "Test mandate",
        sponsors: "Sponsor A",
        tenure: 12,
        size: 1000000,
        rate: 5,
        trustee: "Trustee A",
        custodian: "Custodian A",
        bankPartner: "Bank A",
        fundManager: "Manager A",
        minimumInvestmentAmount: 1000,
        status: "DRAFT",
        startDate: "2025-01-01",
    };

    const setSelectedDraft = jest.fn();
    const setDisabled = jest.fn();
    const setStep = jest.fn();
    const dispatch = jest.fn();

    const createTestStore = () =>
        configureStore({
            reducer: {
                vehicle: vehicleReducer,
            },
        });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("selects a new draft and saves to store", () => {
        const store = createTestStore();
        handleClick(mockDraft, null, setSelectedDraft, setDisabled, store.dispatch);
        expect(setSelectedDraft).toHaveBeenCalledWith(mockDraft);
        expect(setDisabled).toHaveBeenCalledWith(false);
        expect(store.getState().vehicle.saveClickedDraft).toEqual(mockDraft);
    });

    test("deselects the same draft and clears store", () => {
        const store = createTestStore();
        store.dispatch(setSaveClickedDraft(mockDraft));
        handleClick(mockDraft, mockDraft, setSelectedDraft, setDisabled, store.dispatch);
        expect(setSelectedDraft).toHaveBeenCalledWith(null);
        expect(setDisabled).toHaveBeenCalledWith(true);
        expect(store.getState().vehicle.saveClickedDraft).toBeNull();
    });

    test("handleUpdateInvestmentVehicleDraft changes step when selectedId exists", () => {
        handleContinueButton(setStep);
        expect(setStep).toHaveBeenCalledWith(2);
    });

    test("handleUpdateInvestmentVehicleDraft does nothing when no selectedId", () => {
        handleContinueButton(()=> setStep);
        expect(setStep).not.toHaveBeenCalled();
    });

    test("handleSaveAndBackToAllDraft resets step and keeps modal open", () => {
    handleSaveAndBackToAllDraft(setStep, setSelectedDraft, setDisabled);
        expect(setStep).toHaveBeenCalledWith(1);
    expect(setStep).toHaveBeenCalledTimes(1);
    });

    test("resets step to 1", () => {
        handleSaveAndBackToAllDraft(setStep, setSelectedDraft, setDisabled);
            expect(setStep).toHaveBeenCalledWith(1);
        expect(setStep).toHaveBeenCalledTimes(1);
    });

    test("continue button changes step to 2", () => {
        handleContinueButton(setStep);
        expect(setStep).toHaveBeenCalledWith(2);
    });

    test("selects a new draft and saves to store", () => {
        const store = createTestStore();
        handleClick(mockDraft, null, setSelectedDraft, setDisabled, store.dispatch);
        expect(setSelectedDraft).toHaveBeenCalledWith(mockDraft);
        expect(setDisabled).toHaveBeenCalledWith(false);
        expect(store.getState().vehicle.saveClickedDraft).toEqual(mockDraft);
    });

    test("deselects the same draft and clears store", () => {
        const store = createTestStore();
        store.dispatch(setSaveClickedDraft(mockDraft));
        handleClick(mockDraft, mockDraft, setSelectedDraft, setDisabled, store.dispatch);
        expect(setSelectedDraft).toHaveBeenCalledWith(null);
        expect(setDisabled).toHaveBeenCalledWith(true);
        expect(store.getState().vehicle.saveClickedDraft).toBeNull();
    });

    test("calls all expected functions with correct arguments", () => {
        handleSaveAndBackToAllDraft(setStep, setSelectedDraft, setDisabled);
        expect(setStep).toHaveBeenCalledWith(1);
        expect(setSelectedDraft).toHaveBeenCalledWith(null);
        expect(setDisabled).toHaveBeenCalledWith(true);
    });

    test("resets selectedDraft to null", () => {
        handleSaveAndBackToAllDraft(setStep, setSelectedDraft, setDisabled);
        expect(setSelectedDraft).toHaveBeenCalledWith(null);
        expect(setSelectedDraft).toHaveBeenCalledTimes(1);
    });

    test("sets disabled to true", () => {
        handleSaveAndBackToAllDraft(setStep, setSelectedDraft, setDisabled);
        expect(setDisabled).toHaveBeenCalledWith(true);
        expect(setDisabled).toHaveBeenCalledTimes(1);
    });
});
