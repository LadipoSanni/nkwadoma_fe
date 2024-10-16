import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cabinetGrotesk, inter } from "@/app/fonts";
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CreateProgramProps {
    buttonText: string;
    title: string;
    programTypes: string[];
    programDeliveryTypes: string[];
    programModes: string[];
    programDurations: string[];
}

const CreateProgramButton: React.FC<CreateProgramProps> = ({
                                                               buttonText,
                                                               title,
                                                               programTypes,
                                                               programDeliveryTypes,
                                                               programModes,
                                                               programDurations,
                                                           }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    id="triggerButton"
                    data-testid="trigger-button"
                    variant="secondary"
                    size={`lg`}
                    className={`bg-meedlBlue h-12 text-meedlWhite text-sm font-semibold leading-5`}
                >
                    {buttonText}
                </Button>
            </DialogTrigger>
            <DialogContent id="dialogContent" data-testid="dialog-content" className="max-w-[425px] md:max-w-lg">
                <DialogHeader id="dialogHeader" data-testid="dialog-header">
                    <DialogTitle
                        id="dialogTitle"
                        data-testid="dialog-title"
                        className={`${cabinetGrotesk.className} text-2xl font-medium`}
                    >
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription id="dialogDescription" data-testid="dialog-description">
                    <div id="formContainer" data-testid="form-container" className="grid gap-4 py-4 flex-col text-labelBlue">
                        <div id="programNameContainer" data-testid="program-name-container" className="grid items-center gap-2.5">
                            <Label htmlFor="programName" id="programNameLabel" data-testid="program-name-label">Program Name</Label>
                            <Input
                                id="programNameInput"
                                data-testid="program-name-input"
                                placeholder="Enter name"
                                className={`h-14`}
                            />
                        </div>

                        <div id="selectInputsContainer" data-testid="select-inputs-container" className="grid grid-cols-2 gap-5 pt-3">
                            <div id="leftColumn" data-testid="left-column" className={`space-y-3`}>
                                <Label htmlFor="programType" id="programTypeLabel" data-testid="program-type-label" className={`mb-8`}>Program Type</Label>
                                <Select data-testid="program-type-select">
                                    <SelectTrigger id="programTypeTrigger" data-testid="program-type-trigger">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent id="programTypeContent" data-testid="program-type-content">
                                        {programTypes.map((type, index) => (
                                            <SelectItem key={index} value={type} id={`programTypeItem-${index}`} data-testid={`program-type-item-${index}`}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>   

                                <Label
                                    htmlFor="programDeliveryType"
                                    id="programDeliveryTypeLabel"
                                    data-testid="program-delivery-type-label"
                                >
                                    Program Delivery Type
                                </Label>
                                <Select data-testid="program-delivery-type-select">
                                    <SelectTrigger id="programDeliveryTypeTrigger" data-testid="program-delivery-type-trigger">
                                        <SelectValue placeholder="Select delivery type" />
                                    </SelectTrigger>
                                    <SelectContent id="programDeliveryTypeContent" data-testid="program-delivery-type-content">
                                        {programDeliveryTypes.map((deliveryType, index) => (
                                            <SelectItem key={index} value={deliveryType} id={`programDeliveryTypeItem-${index}`} data-testid={`program-delivery-type-item-${index}`}>
                                                {deliveryType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div id="rightColumn" data-testid="right-column" className={`space-y-3`}>
                                <Label htmlFor="programMode" id="programModeLabel" data-testid="program-mode-label">Program Mode</Label>
                                <Select  data-testid="program-mode-select">
                                    <SelectTrigger id="programModeTrigger" data-testid="program-mode-trigger">
                                        <SelectValue placeholder="Select mode" />
                                    </SelectTrigger>
                                    <SelectContent id="programModeContent" data-testid="program-mode-content">
                                        {programModes.map((mode, index) => (
                                            <SelectItem key={index} value={mode} id={`programModeItem-${index}`} data-testid={`program-mode-item-${index}`}>
                                                {mode}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Label
                                    htmlFor="programDuration"
                                    id="programDurationLabel"
                                    data-testid="program-duration-label"
                                    className=""
                                >
                                    Program Duration
                                </Label>
                                <Select data-testid="program-duration-select">
                                    <SelectTrigger id="programDurationTrigger" data-testid="program-duration-trigger">
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent id="programDurationContent" data-testid="program-duration-content">
                                        {programDurations.map((duration, index) => (
                                            <SelectItem key={index} value={duration} id={`programDurationItem-${index}`} data-testid={`program-duration-item-${index}`}>
                                                {duration}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className={`pt-3`}>
                        <Textarea
                            id="programDescription"
                            data-testid="program-description"
                            placeholder="Enter description"
                        />
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
                    >
                        Cancel
                    </Button>
                    <Button
                        id="createButton"
                        data-testid="create-button"
                        variant="secondary"
                        size={`lg`}
                        className="bg-meedlBlue h-14 text-meedlWhite text-sm font-semibold"
                    >
                        Create Program
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProgramButton;
