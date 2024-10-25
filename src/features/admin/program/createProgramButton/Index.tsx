import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {cabinetGrotesk} from "@/app/fonts";
import {Input} from '@/components/ui/input'
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import React, {useCallback, useState} from "react";

interface CreateProgramProps {
    buttonText: string;
    title: string;
    programDeliveryTypes: string[];
    programModes: string[];
    programDurations: string[];
    useSecondaryButton: boolean;
    submitButtonText: string;
}

const CreateProgramButton: React.FC<CreateProgramProps> = ({
                                                               buttonText,
                                                               title,
                                                               programDeliveryTypes,
                                                               programModes,
                                                               programDurations,
                                                               useSecondaryButton,
                                                               submitButtonText
                                                           }) => {

    const [isDropdown, setIsDropdown] = useState(false)
    const [programName, setProgramName] = useState('');
    const [programDeliveryType, setProgramDeliveryType] = useState('');
    const [programMode, setProgramMode] = useState('');
    const [programDuration, setProgramDuration] = useState('');
    const [programDescription, setProgramDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const isProgramNameValid = /^[A-Za-z\s]+$/.test(programName);
    const isDescriptionValid = programDescription.length >= 10;
    const isFormValid = isProgramNameValid && programDeliveryType && programMode && programDuration && isDescriptionValid;

    const closeDialog = () => {
        setIsOpen(false);
        resetFormFields();
    };
    const resetFormFields = () => {
        setProgramName('');
        setProgramDeliveryType('');
        setProgramMode('');
        setProgramDuration('');
        setProgramDescription('');
    };

    const toggleDropdown = useCallback(() => {
        setIsDropdown((prev) => !prev);
    }, []);

    function submit() {
        if (isFormValid) {
            closeDialog();
        }
    }

    return (
        <Dialog open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetFormFields();
            }}
        >
            <DialogTrigger asChild>
                {useSecondaryButton ? (
                    <Button
                        id="triggerButton"
                        data-testid="trigger-button"
                        variant="secondary"
                        size="lg"
                        className={`bg-meedlBlue h-12 text-meedlWhite md:mt-0 mt-3 text-sm font-semibold leading-5`}
                    >
                        {buttonText}
                    </Button>
                ) : (
                    <Button
                        id="triggerButton"
                        data-testid="trigger-button"
                        variant="outline"
                        size="lg"
                        className={`h- text-meedlBlue w-full md:mt-0 mt-3 text-sm font-semibold leading-5`}
                    >
                        {buttonText}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent id="dialogContent" data-testid="dialog-content" className="max-w-[425px] md:max-w-lg">
                <DialogHeader id="dialogHeader" data-testid="dialog-header" className={`flex flex-row justify-between`}>
                    <DialogTitle
                        data-testid="dialog-title"
                        className={`${cabinetGrotesk.className} text-2xl font-medium`}
                    >
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription data-testid="dialog-description">
                    <div id="formContainer" data-testid="form-container"
                         className="grid gap-4 py-4 flex-col text-labelBlue">
                        <div id="programNameContainer" data-testid="program-name-container"
                             className="grid items-center gap-2.5">
                            <Label htmlFor="programName" id="programNameLabel" data-testid="program-name-label">Program
                                Name</Label>
                            <Input
                                id="programNameInput"
                                data-testid="program-name-input"
                                placeholder="Enter name"
                                onChange={(e) => setProgramName(e.target.value)}
                                className={`h-14 focus:outline-none focus:ring-0 focus-visible:ring-0`}
                            />
                            {!isProgramNameValid && programName && (
                                <p className="text-red-500 text-sm">Name must contain only letters.</p>
                            )}
                        </div>

                        <div className={`grid grid-col`} id="selectInputsContainer"
                             data-testid="select-inputs-container">
                            <div id=" selectInputsContainer" data-testid="select-inputs-container">
                                <Label
                                    htmlFor="programDeliveryType"
                                    id="programDeliveryTypeLabel"
                                    data-testid="program-delivery-type-label"
                                >
                                    Program Delivery Type
                                </Label>
                                <Select data-testid="program-delivery-type-select" onOpenChange={toggleDropdown}
                                        onValueChange={setProgramDeliveryType}>
                                    <SelectTrigger id="programDeliveryTypeTrigger"
                                                   data-testid="program-delivery-type-trigger"
                                                   className={`focus:outline-none focus:ring-0 shadow-none`}>
                                        <SelectValue placeholder="Select delivery type"/>
                                        <div className={`ml-4`}>
                                            {isDropdown ? (
                                                <ChevronUpIcon className={`h-4 w-5 font-bold`}/>
                                            ) : (
                                                <ChevronDownIcon className={`h-4 w-5 font-bold`}/>
                                            )}

                                        </div>
                                    </SelectTrigger>
                                    <SelectContent id="programDeliveryTypeContent"
                                                   data-testid="program-delivery-type-content">
                                        {programDeliveryTypes.map((deliveryType, index) => (
                                            <SelectItem key={index} value={deliveryType}
                                                        id={`programDeliveryTypeItem-${index}`}
                                                        data-testid={`program-delivery-type-item-${index}`}>
                                                {deliveryType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div id="leftColumn" data-testid="left-column"
                                 className="grid grid-cols-2 gap-5 ">
                                <div>
                                    <Label htmlFor="programMode" id="programModeLabel" data-testid="program-mode-label">Program
                                        Mode</Label>
                                    <Select data-testid="program-mode-select" onOpenChange={toggleDropdown}
                                            onValueChange={setProgramMode}>
                                        <SelectTrigger id="programModeTrigger" data-testid="program-mode-trigger"
                                                       className={`focus:outline-none focus:ring-0 shadow-none`}>
                                            <SelectValue placeholder="Select mode"/>
                                            <div className={`ml-4`}>
                                                {isDropdown ? (
                                                    <ChevronUpIcon className={`h-4 w-5 font-bold`}/>
                                                ) : (
                                                    <ChevronDownIcon className={`h-4 w-5 font-bold`}/>
                                                )}

                                            </div>
                                        </SelectTrigger>
                                        <SelectContent id="programModeContent" data-testid="program-mode-content">
                                            {programModes.map((mode, index) => (
                                                <SelectItem key={index} value={mode} id={`programModeItem-${index}`}
                                                            data-testid={`program-mode-item-${index}`}>
                                                    {mode}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label
                                        htmlFor="programDuration"
                                        id="programDurationLabel"
                                        data-testid="program-duration-label"
                                        className=""
                                    >
                                        Program Duration
                                    </Label>
                                    <Select data-testid="program-duration-select" onOpenChange={toggleDropdown}
                                            onValueChange={setProgramDuration}>
                                        <SelectTrigger id="programDurationTrigger"
                                                       data-testid="program-duration-trigger"
                                                       className={`focus:outline-none focus:ring-0 shadow-none`}>
                                            <SelectValue placeholder="Select duration"/>
                                            <div className={`ml-4`}>
                                                {isDropdown ? (
                                                    <ChevronUpIcon className={`h-4 w-5 font-bold`}/>
                                                ) : (
                                                    <ChevronDownIcon className={`h-4 w-5 font-bold`}/>
                                                )}

                                            </div>
                                        </SelectTrigger>
                                        <SelectContent id="programDurationContent"
                                                       data-testid="program-duration-content">
                                            {programDurations.map((duration, index) => (
                                                <SelectItem key={index} value={duration}
                                                            id={`programDurationItem-${index}`}
                                                            data-testid={`program-duration-item-${index}`}>
                                                    {duration}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>

                        </div>
                        <div id="rightColumn" data-testid="right-column">
                            <Label htmlFor="programDescription" id="programDescriptionLabel"
                                   data-testid="program-mode-label">Program description</Label>
                            <Textarea
                                id="programDescription"
                                data-testid="program-description"
                                placeholder="Enter description"
                                onChange={(e) => setProgramDescription(e.target.value)}
                                className={`focus:outline-none focus:ring-0  focus-visible:ring-0`}
                            />
                            {!isDescriptionValid && programDescription && (
                                <p className="text-red-500 text-sm">Description must be at least 10 characters long.</p>
                            )}
                        </div>
                    </div>
                </DialogDescription>

                <DialogFooter id="dialogFooter" data-testid="dialog-footer" className="gap-3">
                    <Button
                        id="cancelButton"
                        data-testid="cancel-button"
                        variant="outline"
                        size={`lg`}
                        className="bg-meedlWhite h-14 text-grey800 text-sm font-semibold"
                        onClick={closeDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        id="createButton"
                        data-testid="create-button"
                        variant="secondary"
                        size={`lg`}
                        className="bg-meedlBlue h-14 text-meedlWhite text-sm font-semibold"
                        disabled={!isFormValid}
                        onClick={submit}
                    >
                        {submitButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProgramButton;

