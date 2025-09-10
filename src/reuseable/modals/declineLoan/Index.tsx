'use client'
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cabinetGrotesk } from "@/app/fonts";
import { useRespondToLoanRequestMutation, useWithdrawLoanOfferMutation } from '@/service/admin/loan/loan-request-api';
import {useToast} from "@/hooks/use-toast";
import {store} from "@/redux/store";
import {setCurrentTab, setcurrentTabRoute, setCurrentTabStatus} from "@/redux/slice/loan/selected-loan";
import {useRouter} from "next/navigation";

interface DeclineLoanModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    loanRequestId?: string;
    loanProductId?: string;
    title: string;
    loanOfferStatus?: string;
    loanOfferId?: string,

}

interface LoanRequestPayload {
    id: string;
    loanProductId?: string;
    status: 'APPROVED' | 'DECLINED';
    amountApproved: number;
    loanRequestDecision: 'DECLINED';
    declineReason: string;
    loanOfferStatus?: string,
}

const DeclineLoanModal: React.FC<DeclineLoanModalProps> = ({ isOpen,loanOfferStatus, setIsOpen,loanOfferId, loanRequestId, loanProductId, title }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [respondToLoanRequest, { isLoading }] = useRespondToLoanRequestMutation();
    const [withdrawLoanOffer, {isLoading:isLoadingWithdraw}] = useWithdrawLoanOfferMutation()

    const router = useRouter();
    const {toast} = useToast()

    const handleDecline = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!reason.trim()) {
            setError("Please provide a reason.");
            return;
        }

        const id = loanRequestId ? loanRequestId : '';
        const payload: LoanRequestPayload = {
            id,
            loanProductId,
            status: 'DECLINED',
            amountApproved: 0,
            loanRequestDecision: 'DECLINED',
            declineReason: reason.trim()
        };

           const response = await respondToLoanRequest(payload)
            setReason('');
            setIsOpen(false);
            setError(null);
            if (response?.error){
                toast({
                    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    description: response?.error?.data?.message,
                    status: 'error',
                })
            }else{
                store.dispatch(setCurrentTab('Loan offers'))
                store.dispatch(setCurrentTabStatus('LOAN_OFFER'))
                store.dispatch(setcurrentTabRoute('loan-offer'))
                router.push('/loan/loan-offer')
                toast({
                    description: 'loan request declined',
                    status: 'success',
                })
            }
    }

    const withdrawALoanOffer = async () => {
        const props = {
            loanOfferId: loanOfferId ? loanOfferId : '',
            loanOfferStatus: loanOfferStatus ? loanOfferStatus : '',
        }

            const response = await withdrawLoanOffer(props)
            if (response?.error){
                toast({
                    // description: response?.error?.data?.message,
                    description: 'error has occured',
                    status: 'error',
                })
            }else{
                store.dispatch(setCurrentTab('Loan offers'))
                store.dispatch(setCurrentTabStatus('LOAN_OFFER'))
                store.dispatch(setcurrentTabRoute('loan-offer'))
                router.push('/loan/loan-offer')
                toast({
                    // description: response?.error?.data?.message,
                    description: 'Loan withdrawn successfully',
                    status: 'success',
                })
            }



    }

    return (
        // <div className={`${inter.className}`}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="  grid gap-6">
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
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className={`w-[140px] h-[57px] flex items-center font-bold text-[14px] justify-center rounded-md text-meedlWhite ${
                                reason.trim() ? 'bg-error500 hover:bg-error500' : 'bg-blue50 hover:bg-blue50'
                            }`}
                            disabled={!reason.trim() || isLoading}
                            onClick={!loanOfferId ? handleDecline : withdrawALoanOffer}
                        >
                            {!loanOfferId ?
                            <div>{isLoading ? 'Declining...' : 'Decline'}</div>
                            :
                            <div>{isLoadingWithdraw ? 'Withdrawing...' : 'Withdraw'}</div>}

                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        // </div>
    );
};

export default DeclineLoanModal;