import React, {useState} from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {cabinetGrotesk} from "@/app/fonts";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

interface ModalProps {
    modalId: string;
    isOpen?: boolean;
    setIsOpen: (value: boolean) => void;
    title?: string;
    buttonText?: string;
}

const Modal = ({modalId, title, isOpen, setIsOpen, buttonText}: ModalProps) => {
    const [reason, setReason] = useState('');
    const [error] = useState<string | null>(null);


    return (
       <div
           id={modalId}
           data-testid={modalId}
       >
           <Dialog
               open={isOpen} onOpenChange={setIsOpen}
           >
               <DialogContent className="grid gap-6">
                   <DialogHeader>
                       <DialogTitle
                           className={`${cabinetGrotesk.className} text-[28px] font-medium leading-[120%] text-labelBlue`}
                       >
                           {title}
                       </DialogTitle>
                   </DialogHeader>
                   <div>
                       <Label htmlFor="reason" className="text-sm font-medium text-labelBlue">
                           Reason
                       </Label>
                       <Textarea
                           id="reason"
                           name="reason"
                           placeholder="Enter reason"
                           className="resize-none placeholder:text-grey250 focus-visible:outline-0 ring-transparent focus-visible:ring-transparent"
                           value={reason}
                           onChange={(e) => setReason(e.target.value)}
                       />
                   </div>
                   {error && <p className="text-red-500">{error}</p>}
                   <div className="flex justify-end gap-5">
                       <Button
                           type="button"
                           className="w-[140px] h-[57px] flex items-center font-bold text-[14px] justify-center rounded-md text-meedlBlue border border-meedlBlue bg-meedlWhite"
                           onClick={() => setIsOpen(false)}
                           // disabled={isLoading}
                       >
                           Cancel
                       </Button>
                       <Button
                           type="button"
                           className={`w-[140px] h-[57px] flex items-center font-bold text-[14px] justify-center rounded-md text-meedlWhite ${
                               reason.trim() ? 'bg-meedlBlue hover:bg-meedlBlue' : 'bg-blue50 hover:bg-blue50'
                           }`}
                           // disabled={!reason.trim() || isLoading}
                           // onClick={handleDecline}
                       >
                           {/*{isLoading ? 'Declining...' : 'Decline'}*/}
                           {buttonText}
                       </Button>
                   </div>
               </DialogContent>
           </Dialog>
       </div>
    );
};

export default Modal;