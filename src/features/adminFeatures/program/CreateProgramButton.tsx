import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {cabinetGrotesk} from "@/app/fonts";
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"

interface CreateProgramProps {
    buttonText: string;
    title:string;
    programName:string;
    programType:string;
    programDeliveryType: string;
    programMode: string;
    programDuration:string;
    programDescription:string;
}
const CreateProgramButton: React.FC<CreateProgramProps>=({buttonText, title, programName, programType, programDeliveryType, programMode, programDuration, programDescription}) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">{buttonText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={`${cabinetGrotesk.className} text-2xl font-medium`}>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-labelBlue flex-col">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">programName</Label>
                        <Input type="email" id="email" placeholder="Enter name"/>
                    </div>

                    <div>
                        <div className={`flex flex-row justify-start`}>
                            <Label htmlFor="email">{programName}</Label>



                        </div>
                        <div>

                        </div>

                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default CreateProgramButton;
