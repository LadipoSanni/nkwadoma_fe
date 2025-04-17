'use client';
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {cabinetGroteskMediumBold600, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import styles from "../../market-place/Index.module.css";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useGetInvestmentVehicleDetailQuery} from "@/service/financier/marketplace";
import {formatAmount} from "@/utils/Format";
import MarketDetailsSkeleton from "@/reuseable/Skeleton-loading-state/MarketDetails";

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

    const HandleInvest = () => {
        router.push("/marketplace/transfer");
    }

    // const status = data?.data.deployingStatus;
    //
    // const borderClass =
    //     status === "OPEN" ? "border-[#B4E5C8]" : status === "CLOSE" ? "border-[#F2BCBA]" : "border-gray-300";
    //
    // const statusClass =
    //     status === "OPEN"
    //         ? "bg-green-100 text-[#0D9B48] border-[#B4E5C8]"
    //         : status === "CLOSE"
    //             ? "bg-red-100 text-red-600 border-[#F2BCBA]"
    //             : "bg-gray-100 text-gray-600 border-gray-300";
    const actualStatus = data?.data?.fundRaisingStatus === null
        ? data?.data?.deployingStatus
        : data?.data?.fundRaisingStatus;

    const borderClass = actualStatus === "OPEN"
        ? "border-[#B4E5C8]"
        : actualStatus === "CLOSE"
            ? "border-[#F2BCBA]"
            : "border-gray-300";

    const statusClass = actualStatus === "OPEN"
        ? "text-[#0D9B48] bg-[#E7F7ED]"
        : actualStatus === "CLOSE"
            ? "text-red-600 bg-[#FCEEEE]"
            : "text-gray-600 bg-gray-100";


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



    const investmentBasicDetails = [
        {label: 'Maturity date', value: '13 Aug, 2026'},
        {label: 'Interest rate', value: `${data?.data?.rate || 0}%`},
        {label: 'Minimum amount', value: (<span className="text-sm font-medium text-[#212221]">{formatAmount(data?.data?.minimumInvestmentAmount?.toString() || '0')}</span>)},
        {label: 'Status', value: (
                <div id="minidetailsId" className="flex bg-[#F6F6F6] items-center gap-2 rounded-lg px-2 py-1 w-fit">
                    <span id="fundrasingId" className="font-normal text-black text-sm flex items-center justify-center">Fundraising</span>
                    <div id="statusDivId" className={`bg-meedlWhite p-1 border rounded-lg ${borderClass}`}>
                        <span id="statusId" className={`text-sm font-medium px-1 py-1 rounded-lg lowercase ${statusClass}`}>
                            {actualStatus ?.toLowerCase() || ""}</span>
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
                        className={`${styles.container} w-full grid md:w-2/5 md:h-[70vh] md:max-h-none `}
                    >
                        <div id="backgroundId" className={`w-full md:w-full rounded-md md:rounded-md ${bgColor}`}>
                            <div id="type" data-testid="type" className="py-5 px-4 flex flex-col">
                                <div
                                    id="investmentTypeId"
                                    className={`bg-white ${typeTextColor} text-sm font-medium rounded-[32px] px-3 py-1 w-[104px] h-[29px] flex items-center justify-center`}
                                >
                                    {vehicleType
                                        ? vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1).toLowerCase()
                                        : ""}
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
                            className={`id="keyValuePairId" ${cabinetGroteskMediumBold600.className} md:text-[32px] text-[24px] pt-5 md:text-[#212221]`}
                        >
                            {data?.data.name}
                        </p>
                        <div className={`${inter.className} flex md:flex-row gap-4`}>
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
                                <div className={`${inter.className} text-sm font-semibold text-[#212221]`}>
                                    {data?.data.bankPartner}
                                </div>
                            </div>
                        </div>


                        <div className='py-2 w-full grid grid-cols-1 gap-y-3 '>
                            <p className={`${inter.className} text-sm font-semibold text-[#212221]`}>Prospectus</p>
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
                                    className='bg-[#D9EAFF] text-black text-[12px] font-medium hover:bg-[#D9EAFF] rounded-2xl h-7 w-[6.7vh]'
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
                        <p className={`${inter.className} text-sm font-semibold mb-3 text-[#212221]`}>Investment details</p>
                        <div
                            className="bg-[#F9F9F9] h-fit md:grid px-5 w-full">
                            {investmentBasicDetails?.map((item, index) => (
                                <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                     key={"key" + index}
                                     className="flex md:flex-row md:py-6 py-4 flex-col w-full justify-between font-normal text-meedlBlack text-[14px]">
                                    <div id={`itemsId`}
                                         className={` ${inter.className} text-[#6A6B6A] text-[14px] font-normal`}>
                                        <span id={`item`}>{item.label}</span>
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
                                    disabled={actualStatus  === 'CLOSE'}
                                    className={`${inter.className} ${actualStatus  === 'CLOSE'? " bg-[#D0D5DD]  cursor-not-allowed" : "bg-meedlBlue text-meedlWhite"}  w-full `}
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