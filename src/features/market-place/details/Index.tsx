'use client';
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {cabinetGroteskMediumBold600, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import styles from "../../market-place/Index.module.css";
import {useSelector} from "react-redux";
import {RootState, store} from "@/redux/store";
import {useGetInvestmentVehicleDetailQuery} from "@/service/financier/marketplace";
import {formatAmount} from "@/utils/Format";
import MarketDetailsSkeleton from "@/reuseable/Skeleton-loading-state/MarketDetails";
import {setMarketInvestmentVehicleId} from "@/redux/slice/investors/MarketPlaceSlice";
import ToastPopUp from "@/reuseable/notification/ToastPopUp";
import {insertSpaceCapitalized} from '@/utils/GlobalMethods';

const MarketPlaceDetails = () => {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(false);
    const [docError, setDocError] = useState<string | null>(null);

    const handleBack = () => {
        router.push("/marketplace");
    };

    const {
        marketInvestmentVehicleId,
        vehicleType,
    } = useSelector((state: RootState) => state.marketPlace.savedMarketplaceData) || {};

    const {data, isLoading, isFetching} = useGetInvestmentVehicleDetailQuery({id: marketInvestmentVehicleId});
    const getFilenameFromUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            return urlObj.pathname.split('/').pop();
        } catch {
            return url?.split('/').pop() || 'No file available';
        }
    };

    const networkPopUp = ToastPopUp({
        description: "No internet connection",
        status: "error",
    });

    const HandleInvest = () => {
        if (!navigator.onLine) {
            networkPopUp.showToast();
        } else {
            store.dispatch(
                setMarketInvestmentVehicleId({
                    marketInvestmentVehicleId: data?.data?.id,
                    minimumInvestmentAmount: data?.data?.minimumInvestmentAmount?.toString(),
                    vehicleType: data?.data?.investmentVehicleType
                })
            );
            router.push("/marketplace/transfer");
        }
    };

    const statusKeyAndValue = ()  => {
        if (data?.data?.fundRaisingStatus !== null){
              return {
                key: "Fundraising",
                value: data?.data?.fundRaisingStatus
              }
        }else if (data?.data?.deployingStatus !== null) {
              return {
                   key: "Deploying",
                   value: data?.data?.deployingStatus
              }
        } else if (data?.data?.couponDistributionStatus !== null) {
                return {
                    key: "CouponDistribution",
                    value: data?.data?.couponDistributionStatus
                }
        } else if (data?.data?.recollectionStatus !== null) {
            return {
                key: "Recollection",
                value: data?.data?.recollectionStatus
            } 
        }
           else if (data?.data?.maturity !== null) {
            return {
                key: "Maturity",
                value: data?.data?.maturity
            } 
           }
         else {
            return {
                key: "",
                value: null
            } 
        }

         }


    // const actualStatus = data?.data?.fundRaisingStatus === null
    //     ? data?.data?.deployingStatus
    //     : data?.data?.fundRaisingStatus;

    const borderClass = statusKeyAndValue().value === "OPEN"
        ? "border-[#B4E5C8]"
        : statusKeyAndValue().value === "CLOSE"
            ? "border-[#F2BCBA]"
            : "border-[#B4E5C8]";

    const statusClass = statusKeyAndValue().value === "OPEN"
        ? "text-[#0D9B48] bg-[#E7F7ED]"
        : statusKeyAndValue().value === "CLOSE"
            ? "text-red-600 bg-[#FCEEEE]"
            : "text-[#0D9B48] bg-[#E7F7ED]";

    // const statusKey = data?.data?.fundRaisingStatus ? "Fundraising" : "Deploying"; 

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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setDocError('Error opening document');
        } finally {
            setIsVerifying(false);
        }
    };



    const investmentBasicDetails = [
        {label: 'Maturity date', value: `${data?.data?.tenure} ${data?.data?.tenure <= 1 ? 'month' : 'months'}`},
        {label: 'Interest rate', value: `${data?.data?.rate || 0}%`},
        {label: 'Minimum amount', value: (<span className='text-meedlBlack text-[14px] font-semibold'>{formatAmount(data?.data?.minimumInvestmentAmount?.toString() || '0')}</span>)},
        {label: 'Status', value: (
                <div id="minidetailsId" className="flex bg-[#F6F6F6] items-center gap-2 rounded-lg px-2 py-1 w-fit">
                    <span id="fundrasingId" className="font-normal text-black text-sm flex items-center justify-center">{insertSpaceCapitalized(statusKeyAndValue().key) || 'Status'}</span>
                    <div id="statusDivId" className={`bg-meedlWhite p-1 border rounded-lg ${borderClass} ${statusKeyAndValue().value === "maturity"? "hidden" : ""}`}>
                        <span id="statusId" className={`text-sm font-medium px-1 py-1 rounded-lg lowercase ${statusClass} `}>
                            {statusKeyAndValue().value ?.toLowerCase() || ""}</span>
                    </div>
                </div>
            ),
        },
    ];

    const bgColor = vehicleType === "COMMERCIAL" ? "bg-[#D9EAFF]" : "bg-[#E6F2EA]";
    const imageSrc =
        vehicleType === "COMMERCIAL"
            ? "/BlueCircles.svg"
            : "/GreenCircles.svg";
    const typeTextColor = vehicleType === "COMMERCIAL" ? "text-[#142854]" : "text-[#045620]";

    const getTruncatedFilename = (filename: string, maxBaseLength: number) => {
        const lastDot = filename.lastIndexOf('.');
        const ext = lastDot !== -1 ? filename.slice(lastDot) : '';
        const base = lastDot !== -1 ? filename.slice(0, lastDot) : filename;

        if (base.length > maxBaseLength) {
            return `${base.slice(0, maxBaseLength)}...${ext}`;
        }
        return filename;
    };

    const smallScreenFilename = getTruncatedFilename(docFilename || 'No Document', 10)
    const largeScreenFilename = getTruncatedFilename(docFilename || 'No Document', 25);





    return (
        <>{isLoading || isFetching ? (<MarketDetailsSkeleton/>):
            <main id="mainDiv" className="md:px-10 py-6 px-3 w-full md:gap-10 gap-8">
                <div id="backButtonId">
                    <BackButton
                        id="createFundBackButton"
                        handleClick={handleBack}
                        iconBeforeLetters={true}
                        text="Back to investment"
                        textColor=""
                    />
                </div>

                <div
                    id="detailsPurposeAndObjectiveDiv"
                    className={`flex items-center justify-center md:pt-4 pt-4`}
                >
                    <div
                        id="purpposeDiv"
                        className={`${styles.container} w-full grid md:w-3/5 xl:w-2/5 lg:w-3/5 md:h-[70vh] md:max-h-none `}
                    >
                        <div id="backgroundId" className={`w-full md:w-full rounded-md md:rounded-md ${bgColor}`}>
                            <div id="type" data-testid="type" className="py-5 px-4 flex flex-col">
                                <div
                                    id="investmentTypeId"
                                    className={`bg-white ${typeTextColor} text-sm font-medium rounded-[32px] px-3 py-1 w-[104px] h-[29px] flex items-center justify-center`}
                                >
                                    {vehicleType
                                        ? vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1).toLowerCase()
                                        : data?.data?.investmentVehicleType}
                                </div>
                            </div>
                            <div id="imageId" className="object-right-bottom justify-end flex">
                                <Image
                                    src={imageSrc}
                                    alt="circle"
                                    width={104}
                                    height={29}
                                    className="object-right-bottom"
                                    data-testid="circle-image"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <p
                            className={`id="keyValuePairId" ${cabinetGroteskMediumBold600.className} md:text-[32px] text-[24px] pt-5 font-medium text-[#212221]`}
                        >
                            {data?.data.name}
                        </p>
                        <div className={`${inter.className} flex md:flex-row md:pt-0 pt-2 gap-4`}>
                            <div
                                className={`${bgColor} rounded-full h-12 w-12 flex items-center justify-center text-meedlBlue text-sm font-semibold uppercase`}
                            >
                                {data?.data.bankPartnerImage ? (
                                    <Image
                                        src={data?.data.bankPartnerImage}
                                        alt="logo"
                                        width={104}
                                        height={29}
                                        className="h-4 w-4 object-cover"
                                        data-testid="circle-image"
                                        loading="lazy"
                                    />
                                ) : (
                                    data?.data.bankPartner
                                        ?.split(" ")
                                        .map((word: string) => word[0])
                                        .join("")
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-[#6A6B6A] text-sm font-normal">
                                    {data?.data.fundManager}
                                </div>
                                <div className={`${inter.className} text-sm font-medium text-[#212221]`}>
                                    {data?.data.bankPartner}
                                </div>
                            </div>
                        </div>


                        <div className='py-5 w-full grid grid-cols-1 gap-y-4 '>
                            <p className={'text-meedlBlack text-[14px] font-semibold'}>Prospectus</p>
                            <div className="bg-[#F9F9F9] flex justify-between px-3 py-4 rounded-lg items-center flex-wrap">
                                <div className="flex gap-2 items-center max-w-[70%]">
                                    <Image
                                        src={"/MyMandateLogo.png"}
                                        alt="image"
                                        width={25}
                                        height={25}
                                        priority
                                        style={{ width: "auto", height: "auto" }}
                                    />
                                    <p
                                        className="text-[14px] items-center flex max-w-[150px] truncate sm:hidden"
                                        title={docFilename}
                                    >
                                        {smallScreenFilename}
                                    </p>

                                    <p className="text-[14px] items-center hidden sm:flex">
                                        {largeScreenFilename}
                                    </p>
                                </div>

                                <div className={`flex justify-center items-center`}>
                                    <Button
                                        id="view-document"
                                        type="button"
                                        variant={"default"}
                                        onClick={handleViewDocument}
                                        className="text-meedlBlue border-[1px] border-meedlBlue rounded-[20px] font-semibold text-[12px] md:px-4 px-3 py-2"
                                        disabled={!docUrl || isVerifying}
                                        aria-label={`View ${docFilename}`}
                                    >
                                        {isVerifying ? "Verifying..." : docUrl ? "View" : "No Document"}
                                    </Button>
                                </div>
                            </div>

                        </div>
                        {docError && (
                            <p className='text-red-500 text-xs mt-1 mb-3'>{docError}</p>
                        )}
                        <p className='text-meedlBlack py-2 text-[14px] font-semibold mb-3'>Investment
                            details</p>
                        <div
                            className="bg-[#F9F9F9] h-fit md:grid px-5 w-full">
                            {investmentBasicDetails?.map((item, index) => (
                                <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                     key={"key" + index}
                                     className="flex md:flex-row md:py-6 py-4 flex-col w-full justify-between font-normal text-meedlBlack text-[14px]">
                                    <div id={`itemsId`}
                                         className={` ${inter.className} text-[#6A6B6A] text-[14px] font-normal`}>
                                        <span id={`item`}>{insertSpaceCapitalized(item.label)}</span>
                                    </div>
                                    <div id={`valueId`}
                                         className={`${inter.className}  text-[#212221] text-[14px] font-normal`}>
                                        <span id={`value`}>{item.value ? item.value : 'Not provided'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`pt-3`}>
                            <Button type="button" id={`invest-button`} size="lg" variant="secondary"
                                    onClick={HandleInvest}
                                    // disabled={ statusKeyAndValue().value  === 'CLOSE'}
                                    // className={`${inter.className} ${statusKeyAndValue().value   === 'CLOSE'? " bg-[#D0D5DD]  cursor-not-allowed" : "bg-meedlBlue text-meedlWhite"}  w-full `}
                                    className={`${inter.className} bg-meedlBlue text-meedlWhite w-full`}
                            >
                                Invest
                            </Button>
                        </div>
                    </div>

                </div>
            </main>
        }
        </>
    );
};

export default MarketPlaceDetails;