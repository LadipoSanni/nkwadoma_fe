import React, { useState } from 'react';
import { formatAmount } from '@/utils/Format';
import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';
import { store} from '@/redux/store';
import { setWalletTab,setRepaymentAmount  } from '@/redux/slice/make-payment/payment';

interface paymentData {
    referenceNumber: string,
    dateTime:string,
    paymentMethod: string,
    amount: string
};

interface Props {
    paymentObj: paymentData
    handleCloseModal: () => void
}

function SuccessfulPayment({paymentObj,handleCloseModal}:Props) {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const formatAmountForPDF = (amount: string) => {
        const numericPrice = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
        if (!isNaN(numericPrice)) {
            return new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
            }).format(numericPrice);
        }
        return "0.00";
    };

    const handleDownloadReceipt = async () => {
        setIsGeneratingPDF(true);
        
        try {
            
            const { default: jsPDF } = await import('jspdf');
            
            const doc = new jsPDF();
            
            
            doc.setFontSize(20);
            doc.setTextColor(34, 40, 84);
            doc.text('PAYMENT RECEIPT', 105, 25, { align: 'center' });
            
            doc.setFillColor(220, 252, 231);
            doc.roundedRect(80, 35, 50, 10, 3, 3, 'F');
            doc.setFontSize(10);
            doc.setTextColor(22, 101, 52);
            doc.text('SUCCESSFUL', 105, 41, { align: 'center'});
            
            doc.setDrawColor(209, 213, 219);
            doc.setFillColor(249, 250, 251);
            doc.roundedRect(20, 50, 170, 70, 5, 5, 'F');
            doc.roundedRect(20, 50, 170, 70, 5, 5, 'S');
            
            
            doc.setFontSize(11);
            
            const details = [
                { label: 'Reference Number', value: paymentObj.referenceNumber },
                { label: 'Date & Time', value: paymentObj.dateTime },
                { label: 'Payment Method', value: paymentObj.paymentMethod },
                { label: 'Amount', value: `NGN ${formatAmountForPDF(paymentObj.amount)}` }, // Use NGN instead
                { label: 'Status', value: 'Completed' }
            ];
            
            details.forEach((detail, index) => {
                const yPosition = 60 + (index * 12);
                
                doc.setTextColor(107, 114, 128);
                doc.setFont('helvetica', 'normal');
                doc.text(`${detail.label}:`, 30, yPosition);
                
                doc.setTextColor(17, 24, 39);
                doc.setFont('helvetica', 'bold');
                doc.text(detail.value, 85, yPosition);
            });
            
           
            doc.setFillColor(239, 246, 255);
            doc.roundedRect(20, 115, 170, 12, 3, 3, 'F');
            
            doc.setFontSize(12);
            doc.setTextColor(34, 40, 84);
            doc.setFont('helvetica', 'bold');
            doc.text('TOTAL AMOUNT:', 30, 123);
            doc.text(`NGN ${formatAmountForPDF(paymentObj.amount)}`, 150, 123, { align: 'right' });
            
            doc.setFontSize(9);
            doc.setTextColor(156, 163, 175);
            doc.setFont('helvetica', 'normal');
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 152, { align: 'center' });
            
            doc.save(`payment-receipt-${paymentObj.referenceNumber}.pdf`);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
        
            const receiptContent = `
PAYMENT RECEIPT
===============================

Reference Number: ${paymentObj?.referenceNumber}
Date & Time: ${paymentObj?.dateTime}
Payment Method: ${paymentObj?.paymentMethod}
Amount: ${formatAmount(paymentObj?.amount)}
Status: Successful

Thank you for your payment!
===============================
            `;
            
            const blob = new Blob([receiptContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `receipt-${paymentObj?.referenceNumber}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const handleBack = () => {
        store.dispatch(setWalletTab(0))
        store.dispatch(setRepaymentAmount(""))
        handleCloseModal()
    }

    return (
        <div className='py-2'>
            <section className='flex flex-col items-center justify-center'>
                <div className='w-[70px] h-[70px] rounded-full bg-[#E6F2EA] flex items-center justify-center'>
                    <div className='w-[44px] h-[44px] rounded-full bg-[#045620] flex items-center justify-center'>
                        <svg 
                            className="w-6 h-6 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={3} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                    </div>
                </div>

                <p className='mt-3 text-[#121212] text-[18px] font-medium'>Payment Successful!</p>
            </section>

            <section className='grid grid-cols-1 gap-y-3 mt-9' >
                <div className='flex items-center justify-between'>
                    <p className='text-[#707070] text-[14px] font-normal'>Reference Number</p>
                    <p className='text-[#121212] text-[14px] font-medium'>{paymentObj?.referenceNumber}</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p className='text-[#707070] text-[14px] font-normal'>Date & Time</p>
                    <p className='text-[#121212] text-[14px] font-medium pl-2 md:pl-0'>{paymentObj?.dateTime}</p>
                </div>

                <div className='flex items-center justify-between border-b border-dashed pb-3 border-[#667085] w-full'>
                    <p className='text-[#707070] text-[14px] font-normal'>Payment Method</p>
                    <p className='text-[#121212] text-[14px] font-medium'>{paymentObj?.paymentMethod}</p>
                </div>
                
                <div className='flex items-center justify-between'>
                    <p className='text-[#707070] text-[14px] font-normal'>Amount</p>
                    <p className='text-[#121212] text-[14px] font-medium'>{formatAmount(paymentObj?.amount)}</p>
                </div>
            </section>
            
            <section className='mt-7 grid grid-cols-1 gap-y-4 mb-14'>
                <Button
                    id='receiptId'
                    type='button'
                    variant={"outline"}
                    disabled={isGeneratingPDF}
                    className='w-full border-[#DEDEDE] bg-white h-[48px] focus:bg-white hover:border-[#DEDEDE] hover:bg-[#F9F9F9] disabled:bg-gray-100 disabled:cursor-not-allowed'
                    onClick={handleDownloadReceipt}
                >
                    {isGeneratingPDF ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-[#4D4E4D] border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-[14px] font-medium text-[#4D4E4D]">Generating PDF...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <FiDownload className='w-[18px] h-[18px] text-[#4D4E4D]'/> 
                            <span className='ml-1 relative top-[2px] text-[14px] font-medium'>Download receipt</span>
                        </div>
                    )}
                </Button>

                <Button
                    id='backButton'
                    type='button'
                    variant={"outline"}
                    className='w-full h-[36px]'
                    onClick={handleBack}
                >
                    Back to payment
                </Button>
            </section>
        </div>
    )
}

export default SuccessfulPayment;