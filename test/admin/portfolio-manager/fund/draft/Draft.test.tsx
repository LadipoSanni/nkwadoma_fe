import {
    handleClick,
    handleSaveAndBackToAllDraft,
    handleContinueButton
} from "@/features/portfolio-manager/fund/draft/Index";


describe("Draft Component Functions", () => {
    const setSelectedId = jest.fn();
    const setDisabled = jest.fn();
    const setStep = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("handleClick selects a new draft", () => {
        handleClick(1, null, setSelectedId, setDisabled);
        expect(setSelectedId).toHaveBeenCalledWith(1);
        expect(setDisabled).toHaveBeenCalledWith(false);
    });

    test("handleClick deselects the same draft", () => {
        handleClick(1, 1, setSelectedId, setDisabled);
        expect(setSelectedId).toHaveBeenCalledWith(null);
        expect(setDisabled).toHaveBeenCalledWith(true);
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
        handleSaveAndBackToAllDraft(setStep);
        expect(setStep).toHaveBeenCalledWith(1);
    });
});