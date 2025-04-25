"use client";
import React, { useState,useEffect} from 'react';
import InfoCard from '@/reuseable/details/InfoCard';
import {MdOutlinePayments} from 'react-icons/md';
import InfoPanel from '@/reuseable/details/InfoPanel';
import {formatAmount} from '@/utils/Format';
import {useGetInvestmentVehicleDetailQuery} from '@/service/admin/fund_query';
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import {useAppSelector} from "@/redux/store";
// import { MdEdit } from "react-icons/md";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { inter } from '@/app/fonts';
import {formatMonthInDate} from '@/utils/Format';
import {setDraftId,setEditStatus,clearEditStatus,clearSaveInvestmentStatus,setPublicVehicleUrl,clearPublicVehicleUrl,setStatusDefaultValue,resetStatusDefaultValue} from '@/redux/slice/vehicle/vehicle';
import {store} from "@/redux/store";
import { useRouter } from 'next/navigation'
import {markStepCompleted} from '@/redux/slice/multiselect/vehicle-multiselect';
import { resetVehicleState,setVisibilityType } from '@/redux/slice/multiselect/vehicle-multiselect';

const Details = () => {
    const currentVehicleId = useAppSelector(state => (state.vehicle.currentVehicleId))
    const statusType = useAppSelector(state => (state.vehicle.setEditStatus))
    const [investmentId] = useState(currentVehicleId);
    const [isVerifying, setIsVerifying] = useState(false);
    const [docError, setDocError] = useState<string | null>(null);
    const router = useRouter()

    const {data, isLoading,refetch} = useGetInvestmentVehicleDetailQuery({id: investmentId}, {skip: !investmentId});

    // const setStatus = {
    //     state: data?.data?.fundRaisingStatus === null ? data?.data?.deployingStatus : data?.data?.fundRaisingStatus,
    //     status: data?.data?.fundRaisingStatus === null ? "deployingStatus" : "fundRaising"
    // }

    useEffect(() => {
         if(statusType === "changeStatus" || statusType === "changeVisibility"){
            refetch()
         }else {
        store.dispatch(clearEditStatus())
         store.dispatch(resetVehicleState())
         store.dispatch(clearSaveInvestmentStatus())
          store.dispatch(clearPublicVehicleUrl())
          store.dispatch(resetStatusDefaultValue())
         }
    },[refetch,statusType])

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

    const handleChangeVisibility = () => {
         store.dispatch(setDraftId(data?.data?.id))
         store.dispatch(markStepCompleted("setup"))
         store.dispatch(setEditStatus("changeVisibility"))
         store.dispatch(setPublicVehicleUrl(data?.data?.investmentVehicleLink))
         store.dispatch(setVisibilityType(data?.data?.investmentVehicleVisibility))
         router.push("/vehicle/edit/visibility")
    }

    const handleChangeStatus = () => {
        // store.dispatch(setInvestmentStatus(setStatus))
        store.dispatch(setDraftId(data?.data?.id))
        store.dispatch(setEditStatus("changeStatus"))
        store.dispatch(markStepCompleted("setup"))
        if(data?.data?.fundRaisingStatus || data?.data?.deployingStatus){
            store.dispatch(setStatusDefaultValue("operation"))
        }else if (data?.data?.couponDistributionStatus){
            store.dispatch(setStatusDefaultValue("coupon")) 
        }else {
            store.dispatch(setStatusDefaultValue("closure"))
        }
        router.push("/vehicle/edit/status")
    }

    
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
        {name: 'Fund manager', value: capitalizeFirstLetters(data?.data?.fundManager )|| 'N/A'},
        {name: 'Vehicle size', value: formatAmount(data?.data?.size?.toString() || '0')},
        // {
        //     name: 'Vehicle status',
        //     value: <p
        //         >{data?.data?.fundRaisingStatus === null ? "Deploying" : "fundRaising" } <span className='border-solid border-[#B4E5C8] border-[1px] px-[2px] font-medium rounded-md py-[1px] ml-1'><span className='text-[12px] text-[#0D9B48] bg-[#E7F7ED] px-1 rounded-md'>{capitalizeFirstLetters(data?.data?.fundRaisingStatus === null ? data?.data?.deployingStatus : data?.data?.fundRaisingStatus) }</span></span> </p>
        // },
        // {name: 'Vehicle visibility', value: <div className='flex items-center gap-1'>
        //     {capitalizeFirstLetters(data?.data?.investmentVehicleVisibility )}
        //      <span>
        //         <MdEdit color='#939CB0'/>
        //      </span>
        //                                  </div>},
        {name: 'Vehicle start date', value: formatMonthInDate(data?.data?.startDate) },
        {name: 'Interest rate', value: `${data?.data?.rate || 0}%`},
        {name: 'Tenor', value: `${data?.data?.tenure} ${data?.data?.tenure <= 1 ? 'month' : 'months'}`},
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

    const getVehicleStatus = () => {
        const statuses = [
          { type: "fundRaising", value: data?.data?.fundRaisingStatus },
          { type: "deploying", value: data?.data?.deployingStatus },
          { type: "couponDistribution", value: data?.data?.couponDistributionStatus },
          { type: "recollection", value: data?.data?.recollectionStatus },
          { type: "maturity", value: data?.data?.maturity }
        ];
      
        
        const activeStatus = statuses.find(status => status.value !== null);
        
        return activeStatus || { type: "unknown", value: null };
      };
      
      const { type: statusTypes, value: statusValue } = getVehicleStatus();

    return (
        <>
            {isLoading ? (<SkeletonForDetailPage/>) : (
                <div
                    className={`flex flex-col md:flex-row md:justify-between ${inter.className}`}
                > 
                  <div className='w-full'>
                    <div >
                        <InfoCard
                            icon={MdOutlinePayments}
                            fundTitle={data?.data?.name}
                            description={""}
                        />
                    </div>
                     <div className='py-2 md:max-w-72 lg:max-w-[29vw] rounded-md grid grid-cols-1 gap-y-3'>
                       <p className='text-[14px] font-semibold'>Prospectus</p>
                       <div className='bg-[#F9F9F9] flex justify-between px-4 py-4 rounded-lg items-center'>
                       
                          <div className='flex gap-2 items-center'>
                            <div>
                            <Image
                              src={"/MyMandateLogo.png"}
                               alt='image'
                               width={16}
                               height={16}
                               priority 
                               style={{
                                width: 'auto',
                                height: 'auto'
                              }}
                            />
                            </div>
                            <p className='text-[14px] truncate max-w-[120px] md:max-w-[180px]  lg:whitespace-normal '>{docFilename}</p>
                          </div>
                         
                           <Button 
                            id='view-document'
                           type='button' 
                           variant={"default"} 
                           className={`border-solid border-[1px] border-[#142854] text-[#142854] text-[12px]  hover:bg-white font-semibold rounded-2xl h-7  ${docUrl? "w-[6.9vh]" : "w-[8.9vh]"}`}
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
                    <div className='py-2 md:max-w-72 lg:max-w-[29vw] rounded-md grid grid-cols-1 gap-y-3'>
                       <p className='text-meedlBlack text-[14px] font-semibold'>Visibility</p>
                       <div className='bg-[#F9F9F9] flex justify-between px-4 py-4 rounded-lg items-center'>
                       
                          <div className='flex gap-2 items-center'>
                            <p className='text-[14px] truncate max-w-[120px] md:max-w-[180px] lg:max-w-[180px] lg:whitespace-normal '>{capitalizeFirstLetters(data?.data?.investmentVehicleVisibility)}</p>
                          </div>
                         
                           <Button 
                            id='edit_visibility'
                           type='button' 
                           variant={"default"} 
                           className='border-solid border-[1px] border-[#142854] text-[#142854] text-[12px]  hover:bg-white rounded-2xl h-7 w-[8.5vh] font-semibold'
                            onClick={handleChangeVisibility}
                            
                            >
                             Change
                           </Button>
                      

                       </div>
                     </div>
                     <div className='py-2 md:max-w-72 lg:max-w-[29vw] rounded-md grid grid-cols-1 gap-y-3'>
                       <p className='text-meedlBlack text-[14px] font-semibold'>Status</p>
                       <div className='bg-[#F9F9F9] flex justify-between px-4 py-4 rounded-lg items-center'>
                       
                          <div className='flex gap-2 items-center'>
                            {/* <p className='text-[14px] truncate max-w-[120px] md:max-w-[180px] lg:max-w-[180px] lg:whitespace-normal '>{capitalizeFirstLetters(data?.data?.investmentVehicleVisibility)}</p> */}
                            <p
                            className='text-[14px]   lg:max-w-[180px] xl:max-w-[250px] lg:whitespace-normal '
                >{statusTypes } <span className='border-solid border-[#B4E5C8] border-[1px] px-[2px] font-medium rounded-md py-[1px] ml-1'><span className='text-[12px] text-[#0D9B48] bg-[#E7F7ED] px-1 rounded-md'>{capitalizeFirstLetters(statusValue) }</span></span> </p>
                          </div>
                         
                           <Button 
                             id='edit_status'
                           type='button' 
                           variant={"default"} 
                           className='border-solid border-[1px] border-[#142854] text-[#142854] text-[12px]  hover:bg-white rounded-2xl h-7 w-[8.5vh] font-semibold '
                            onClick={handleChangeStatus}
                            
                            >
                             Change
                           </Button>
                      

                       </div>
                     </div>
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


