import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cabinetGrotesk, inter } from "@/app/fonts";
import { useRespondToLoanRequestMutation } from '@/service/admin/loan/loan-request-api';

interface DeclineLoanModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    loanRequestId: string;
    loanProductId: string;
    title: string;
}

const DeclineLoanModal: React.FC<DeclineLoanModalProps> = ({ isOpen, setIsOpen, loanRequestId, loanProductId, title }) => {
    const [reason, setReason] = useState('');
    const [respondToLoanRequest, { isLoading }] = useRespondToLoanRequestMutation();

    const handleDecline = async () => {
        try {
            await respondToLoanRequest({
                loanRequestId,
                loanProductId,
                status: 'NEW',
                amountApproved: 0,
                loanRequestDecision: 'DECLINED',
                declineReason: reason
            }).unwrap();
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to decline loan request:', error);
        }
    };

    return (
        <div className={`${inter.className}`}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className={'grid gap-6'}>
                    <DialogHeader>
                        <DialogTitle
                            className={`${cabinetGrotesk.className} text-[28px] font-medium leading-[120%] text-labelBlue`}>
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
                            placeholder={'Enter reason'}
                            className={'resize-none placeholder:text-grey250 focus-visible:outline-0 ring-transparent focus-visible:ring-transparent'}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                    <div className={'flex justify-end gap-5'}>
                        <Button
                            className={'w-[140px] h-[57px] flex items-center font-bold text-[14px] justify-center rounded-md text-meedlBlue border border-meedlBlue bg-meedlWhite'}
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`w-[140px] h-[57px] flex items-center font-bold text-[14px] justify-center rounded-md text-meedlWhite ${reason ? 'bg-error450 hover:bg-error450' : 'bg-blue50 hover:bg-blue50'}`}
                            disabled={!reason || isLoading}
                            onClick={handleDecline}
                        >
                            Decline
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DeclineLoanModal;