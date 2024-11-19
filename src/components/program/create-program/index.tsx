import {Button} from "@/components/ui/button"
import {
    DialogFooter,
} from "@/components/ui/dialog"
import {inter} from "@/app/fonts";
import {Input} from '@/components/ui/input'
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import React, {useCallback, useState} from "react";
import {useCreateProgramMutation} from "@/service/admin/program_query";
import {toast} from "@/hooks/use-toast";

interface CreateProgramProps {
    programDeliveryTypes: string[];
    programModes: string[];
    programDurations: string[];
    submitButtonText: string;
    setIsOpen?: (isOpen: boolean) => void
}

const CreateProgram: React.FC<CreateProgramProps> = ({
                                                         programDeliveryTypes,
                                                         programModes,
                                                         programDurations,
                                                         submitButtonText,
                                                         setIsOpen
                                                     }) => {

    const [isDropdown, setIsDropdown] = useState(false)
    const [programName, setProgramName] = useState('');
    const [deliveryType, setDeliveryType] = useState('');
    const [programMode, setProgramMode] = useState('');
    const [programDuration, setProgramDuration] = useState('');
    const [programDescription, setProgramDescription] = useState('');
    const [error, setError] =  useState('');
    const [createProgram] = useCreateProgramMutation();

    const isProgramNameValid = /^(?!\s)(?!\d)(?!.\d.[a-zA-Z].|\d.[a-zA-Z].*\d)[a-zA-Z\s]+$/.test(programName);
    const isDescriptionValid = /^(?!\s)(?!\d)(?!.\d.[a-zA-Z].|\d.[a-zA-Z].*\d)[a-zA-Z\s]+$/.test(programDescription);
    const isFormValid = isProgramNameValid && deliveryType && programMode && programDuration && isDescriptionValid;

    const handleCancelButton = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
        resetFormFields();
    };
    const resetFormFields = () => {
        setProgramName('');
        setDeliveryType('');
        setProgramMode('');
        setProgramDuration('');
        setProgramDescription('');
    };

    const toggleDropdown = useCallback(() => {
        setIsDropdown((prev) => !prev);
    }, []);



    // const instituteId = "06fd45a1-364c-464e-b3de-c3432e72bd03";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            toast({
                description: 'Please fill in all the required fields',
                status: 'error',
            });
        } else {
            try {
                const newProgram = {
                     programName: programName,
                    programDescription: programDescription,
                    programDuration: programDuration,
                    deliveryType: deliveryType,
                    programMode: programMode,
                };
                const response = await createProgram(newProgram).unwrap();
                if (response) {
                    toast({
                        description: 'Program created successfully',
                        status: 'success',
                    })
                    // if (setIsOpen) setIsOpen(false);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            }
        }
    };

    return (
        <form data-testid="dialog-description" className={`w-full md:px-0 px-3`} onSubmit={handleSubmit}>
            <div id="formContainer" data-testid="form-container"
                 className="grid py-3 flex-col text-labelBlue">
                <div id="programNameContainer" data-testid="program-name-container"
                     className="">
                    <Label htmlFor="programName" id="programNameLabel" data-testid="program-name-label"
                           className={`${inter.className} text-meedlBlack font-bold pb-1`}>Program
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
                    <div id=" selectInputsContainer" data-testid="select-inputs-container" className={`pt-4`}>
                        <Label
                            htmlFor="programDeliveryType"
                            id="programDeliveryTypeLabel"
                            data-testid="program-delivery-type-label"
                            className={`${inter.className} text-meedlBlack font-bold`}
                        >
                            Program Delivery Type
                        </Label>
                        <Select data-testid="program-delivery-type-select" onOpenChange={toggleDropdown}
                                onValueChange={setDeliveryType}>
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
                                           style={{
                                               zIndex: 1000
                                           }}
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
                         className="grid md:grid-cols-2 gap-5 ">
                        <div>
                            <Label htmlFor="programMode" id="programModeLabel" data-testid="program-mode-label"
                                   className={`${inter.className} text-meedlBlack font-bold`}>Program
                                Mode</Label>
                            <Select data-testid="program-mode-select" onOpenChange={toggleDropdown}
                                    onValueChange={setProgramMode}>
                                <SelectTrigger id="programModeTrigger" data-testid="program-mode-trigger"
                                               className={`focus:outline-none focus:ring-0 shadow-none min-w-0 w-full`}>
                                    <SelectValue placeholder="Select mode"/>
                                    <div className={`ml-4`}>
                                        {isDropdown ? (
                                            <ChevronUpIcon className={`h-4 w-5 font-bold`}/>
                                        ) : (
                                            <ChevronDownIcon className={`h-4 w-5 font-bold`}/>
                                        )}

                                    </div>
                                </SelectTrigger>
                                <SelectContent id="programModeContent" data-testid="program-mode-content"
                                               style={{
                                                   zIndex: 1000
                                               }}
                                >
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
                                className={`${inter.className} text-meedlBlack font-bold`}>
                                Program Duration
                            </Label>
                            <Select data-testid="program-duration-select" onOpenChange={toggleDropdown}
                                    onValueChange={setProgramDuration}>
                                <SelectTrigger id="programDurationTrigger"
                                               data-testid="program-duration-trigger"
                                               className={`focus:outline-none focus:ring-0 shadow-none min-w-0 w-full`}>
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
                                               data-testid="program-duration-content"
                                               style={{
                                                   zIndex: 1000
                                               }}
                                >
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
                           data-testid="program-mode-label"
                           className={`${inter.className} text-meedlBlack font-bold`}>Program description</Label>
                    <Textarea
                        id="programDescription"
                        data-testid="program-description"
                        placeholder="Enter description"
                        onChange={(e) => setProgramDescription(e.target.value)}
                        className={`focus:outline-none focus:ring-0  focus-visible:ring-0 resize-none`}
                    />
                    {!isDescriptionValid && programDescription && (
                        <p className="text-red-500 text-sm">Description must contain only letters.</p>
                    )}
                </div>
            </div>

            <DialogFooter id="dialogFooter" data-testid="dialog-footer" className="gap-3 py-5">
                <Button
                    id="cancelButton"
                    data-testid="cancel-button"
                    variant="outline"
                    size={`lg`}
                    className={`${inter.className}  bg-meedlWhite h-14 text-grey800 text-sm font-semibold `}
                    onClick={handleCancelButton}
                >
                    Cancel
                </Button>
                <Button
                    id="createButton"
                    data-testid="create-button"
                    variant="secondary"
                    size={`lg`}
                    className={`${inter.className} bg-meedlBlue h-14 text-meedlWhite text-sm font-semibold `}
                    disabled={!isFormValid}
                    type={"submit"}
                >
                    {submitButtonText}
                </Button>
            </DialogFooter>
            {
                <div className={`text-error500 flex justify-center items-center`}>{error}</div>
            }
        </form>

    )
}

export default CreateProgram;

