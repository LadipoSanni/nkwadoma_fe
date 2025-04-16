"use client";
import React, { useState} from 'react';
import InfoCard from '@/reuseable/details/InfoCard';
import {MdOutlinePayments} from 'react-icons/md';
import InfoPanel from '@/reuseable/details/InfoPanel';
import {formatAmount} from '@/utils/Format';
import {useGetInvestmentVehicleDetailQuery} from '@/service/admin/fund_query';
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import {useAppSelector} from "@/redux/store";
import { MdEdit } from "react-icons/md";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Details = () => {
    const currentVehicleId = useAppSelector(state => (state.vehicle.currentVehicleId))
    const [investmentId] = useState(currentVehicleId);
    const [isVerifying, setIsVerifying] = useState(false);
    const [docError, setDocError] = useState<string | null>(null);

    const {data, isLoading} = useGetInvestmentVehicleDetailQuery({id: investmentId}, {skip: !investmentId});

    const getFilenameFromUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            return urlObj.pathname.split('/').pop();
        } catch {
            return url?.split('/').pop() || 'No file available';
        }
    };

    const verifyDocumentExists = async (url: string): Promise<boolean> => {
        if (url.includes('cloudinary.com')) {
            return url.toLowerCase().endsWith('.pdf') || 
                   url.toLowerCase().endsWith('.docx');
        }

        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('content-type') || '';
            return response.ok && (
                contentType.includes('application/pdf') || 
                contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            );
        } catch {
            return false;
        }
    };

    const docUrl = data?.data?.mandate;
    const docFilename = getFilenameFromUrl(docUrl);
    const isCloudinaryUrl = docUrl?.includes('cloudinary.com');
    const fileExtension = docFilename?.split('.').pop()?.toLowerCase();

    
    const handleViewDocument = async () => {
        if (!docUrl) return;
        
        setIsVerifying(true);
        setDocError(null);
        
        try {
            if (fileExtension !== 'pdf' && fileExtension !== 'docx') {
                setDocError('Invalid document format');
                return;
            }

            if (!isCloudinaryUrl) {
                const docExists = await verifyDocumentExists(docUrl);
                if (!docExists) {
                    setDocError('Document not found');
                    return;
                }
            }

            window.open(docUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
            setDocError('Error opening document');
            console.error('Document open error:', error);
        } finally {
            setIsVerifying(false);
        }
    };

    const detailInfo = [
        {name: 'Vehicle type', value: capitalizeFirstLetters(data?.data?.investmentVehicleType )|| 'N/A'},
        {name: 'Vehicle size', value: formatAmount(data?.data?.size?.toString() || '0')},
        {
            name: 'Vehicle status',
            value: <p
                >{data?.data?.fundRaisingStatus === null ? "Deploying" : "fundRaising" } <span className='border-solid border-[#B4E5C8] border-[1px] px-[2px] font-medium rounded-md py-[1px] ml-1'><span className='text-[12px] text-[#0D9B48] bg-[#E7F7ED] px-1 rounded-md'>{capitalizeFirstLetters(data?.data?.fundRaisingStatus === null ? data?.data?.deployingStatus : data?.data?.fundRaisingStatus) }</span></span> </p>
        },
        {name: 'Vehicle visibility', value: <div className='flex items-center gap-1'>
            {capitalizeFirstLetters(data?.data?.investmentVehicleVisibility )}
             <span>
                <MdEdit color='#939CB0'/>
             </span>
                                         </div>},
        {name: 'Interest rate', value: `${data?.data?.rate || 0}%`},
        {
            name: 'Total amount in vehicle',
            value: formatAmount(data?.data?.totalAmountInInvestmentVehicle?.toString() || '0')
        },
        {name: 'Amount raised', value: formatAmount(data?.data?.amountRaised?.toString() || '0')},
        {name: 'Amount disbursed', value: formatAmount(data?.data?.amountDisbursed?.toString() || '0')},
        {name: 'Amount available', value: formatAmount(data?.data?.amountAvailable?.toString() || '0')},
        {name: 'Total income generated', value: formatAmount(data?.data?.totalIncomeGenerated?.toString() || '0')},
        {name: 'Net asset value', value: formatAmount(data?.data?.netAssetValue?.toString() || '0')},
    ];

    return (
        <>
            {isLoading ? (<SkeletonForDetailPage/>) : (
                <div
                    className='flex flex-col md:flex-row md:justify-between'
                > 
                  <div className='w-full'>
                    <div >
                        <InfoCard
                            icon={MdOutlinePayments}
                            fundTitle={data?.data?.name}
                            description={""}
                        />
                    </div>
                     <div className='border-[1px] border-solid px-3 py-2 md:max-w-72 lg:max-w-[29vw] border-[#D7D7D7] rounded-md grid grid-cols-1 gap-y-3 mb-5'>
                       <p>Mandate</p>
                       <div className='bg-[#F9F9F9] flex justify-between px-4 py-4 rounded-lg items-center'>
                       
                          <div className='flex gap-2 '>
                            <Image
                              src={"/pdf.png"}
                               alt='image'
                               width={16}
                               height={16}
                               priority 
                               style={{
                                width: 'auto',
                                height: 'auto'
                              }}
                            />
                            <p className='text-[14px] truncate max-w-[120px] md:max-w-[180px] lg:max-w-[180px] lg:whitespace-normal '>{docFilename}</p>
                          </div>
                         
                           <Button 
                            id='view-document'
                           type='button' 
                           variant={"default"} 
                           className='bg-[#D9EAFF] text-black text-[12px] font-medium hover:bg-[#D9EAFF] underline rounded-2xl h-7 w-[6.7vh]'
                            onClick={handleViewDocument}
                            disabled={!docUrl || isVerifying}
                            aria-label={`View ${docFilename}`}
                            >
                             {isVerifying ? 'Verifying...' : (docUrl ? 'View' : 'No Document')}
                           </Button>
                       </div>
                     </div>
                     {docError && (
                            <p className='text-red-500 text-xs mt-1 mb-3'>{docError}</p>
                            )}
                    </div>
                    <div className='w-full'>
                        <InfoPanel infoList={detailInfo}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Details;


