'use client'
import React, {useEffect, useState} from 'react';
import styles from "@/features/market-place/Index.module.css";
import Image from "next/image";
import {cabinetGroteskMediumBold600, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import {useViewPublicInvestmentDetailsQuery} from "@/service/unauthorized/view-investment";
import {formatAmount} from "@/utils/Format";
import MarketDetailsSkeleton from '@/reuseable/Skeleton-loading-state/MarketDetails';
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {MdOutlinePayments} from "react-icons/md";


const ViewPublicInvestmentVehicle = () => {

    const [isVerifying, setIsVerifying] = useState(false);
    const [docError, setDocError] = useState<string | null>(null);
    const [details, setDetails] = useState([])
    const router = useRouter()

        const searchParams = useSearchParams()


        const getInvestmentVehicleName = () => {
            if (searchParams){
                const pathVariable = searchParams.get("name")
                if (pathVariable){
                    return pathVariable
                }
            }
        }
        const vehicleName = getInvestmentVehicleName()
       const {data, isLoading, isFetching} = useViewPublicInvestmentDetailsQuery(vehicleName)

    useEffect(()=> {
        setDetails(data?.data)

    }, [data])




    const vehicleType = data?.data?.investmentVehicleType;
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


    const docUrl = data?.data?.mandate;
    const docFilename = getFilenameFromUrl(docUrl);
    const isCloudinaryUrl = docUrl?.includes('cloudinary.com');
    const fileExtension = docFilename?.split('.').pop()?.toLowerCase();

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
    const largeScreenFilename = getTruncatedFilename(docFilename || 'No Document', 35);


    const recollectionStatus = data?.data?.recollectionStatus
    const couponDistributionStatus = data?.data?.couponDistributionStatus
    const deployingStatus =  data?.data?.deployingStatus
    const fundRaisingStatus =  data?.data?.fundRaisingStatus
    const maturity =  data?.data?.maturity
    const status = recollectionStatus !== null
        ? 'Recollection'
        : couponDistributionStatus !== null
            ? 'Coupon Distribution'
            : deployingStatus !== null
                ? 'Deploying'
                : fundRaisingStatus !== null
                    ? 'Fund Raising'
                    : 'Maturity';
    const statusValue = recollectionStatus !== null
        ? recollectionStatus
        : couponDistributionStatus !== null
            ? couponDistributionStatus
            : deployingStatus !== null
                ? deployingStatus
                : fundRaisingStatus !== null
                    ? fundRaisingStatus
                    : maturity;

    const id = data?.data?.id;

    const redirectToLogin =()=> {
        router.push(`/auth/login?vehicleId=${id}?vehicleType=${vehicleType}`)
    }



    const investmentBasicDetails = [
        {label: 'Maturity date',
            value: `${data?.data?.tenure} ${data?.data?.tenure === 1 ? 'month' : 'months'}`},
            // value: ''},
        {label: 'Interest rate', value: `${data?.data?.rate || 0}%`},
            //     ''},
        {label: 'Minimum amount', value: (<span className='text-meedlBlack text-[14px] font-semibold'>{formatAmount(data?.data?.minimumInvestmentAmount?.toString() || '0')}</span>)}
        ,
        {label: 'Status', value:
                (
                <div id="minidetailsId" className="flex bg-[#F6F6F6]  items-center gap-2 rounded-lg px-2 py-1 w-fit">
                    <span id="fundrasingId" className="font-normal text-black text-sm flex items-center justify-center">{status}</span>
                    <div id="statusDivId" className={`bg-meedlWhite ${statusValue === 'CLOSE' ?  'border-[#F2BCBA]' : 'border-[#B4E5C8]' } p-1 border rounded-lg }`}>
                        <p id="statusId" className={`text-sm ${statusValue === 'CLOSE' ? 'text-red-600 bg-[#FCEEEE]' : 'text-[#0D9B48] bg-[#E7F7ED]' } font-medium px-1 py-1 rounded-lg lowercase `}>
                            {statusValue ?.toLowerCase() || ""}</p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div>
            {isLoading || isFetching ? (<MarketDetailsSkeleton/>):
                !details ? (
                        <div className=" grid content-center  h-full  py-6 px-3 w-full">
                         <div className={`  mr-auto ml-auto w-fit h-fit`}>
                             <LoanEmptyState title={"Investment vehicle not found"} description={"Investment vehicle will show here"} icon={<MdOutlinePayments height={`5rem`} width={"5rem"} color={"#142854"}/>} iconBg={`#D9EAFF`} id={"vehicleEmptyState"}/>
                         </div>
                        </div>
                    ):
           ( <main id="mainDiv" className="md:px-10 py-6 px-3 w-full md:gap-10 gap-8">
                <div
                    id="detailsPurposeAndObjectiveDiv"
                    className={`flex items-center justify-center md:pt-4 pt-4`}
                >
                    <div
                        id="purpposeDiv"
                        className={`${styles.container} h-full w-full grid sm:w-4/5 md:w-3/5 xl:w-2/5 lg:w-3/5  md:h-[70vh] md:max-h-none `}
                    >
                            <div id="backgroundId" className={`w-full ${ vehicleType === 'COMMERCIAL'? 'bg-[#D9EAFF] md:bg-[#D9EAFF]' : 'bg-[#E6F2EA].,' }md:w-full rounded-md md:rounded-md `}>
                            <div id="type" data-testid="type" className="py-5 px-4 flex flex-col">
                                <div
                                    id="investmentTypeId"
                                    className={`bg-white  text-sm font-medium rounded-[32px] px-3 py-1 w-[104px] h-[29px] flex items-center justify-center`}
                                >
                                    {vehicleType
                                        ? vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1).toLowerCase()
                                        : ""}
                                </div>
                            </div>
                            <div id="imageId" className="object-right-bottom justify-end flex">
                                <Image
                                    src={vehicleType === 'COMMERCIAL' ?'/BlueCircles.svg' : '/GreenCircles.svg'}
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
                            id={'fundManagerName'}
                            className={`id="keyValuePairId" ${cabinetGroteskMediumBold600.className} md:text-[32px] text-[24px] pt-5 font-medium text-[#212221]`}
                        >
                            {data?.data.name}
                        </p>
                        <div className={`${inter.className} flex md:flex-row md:pt-0 pt-2 gap-4`}>
                            <div
                                className={`} rounded-full h-12 w-12 flex items-center bg-[#D9EAFF] justify-center text-meedlBlue text-sm font-semibold uppercase`}
                            >
                                {data?.data.bankPartnerImage ? (
                                <Image
                                    src={`/GreenCircles.svg`}
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
                                onClick={redirectToLogin}
                                // disabled={statusValue  === 'CLOSE'}
                                className={`${inter.className} bg-meedlBlue text-meedlWhite  w-full `}
                            >
                                Invest
                            </Button>
                        </div>
                    </div>

                </div>
            </main>)
            }
        </div>
    );
};

export default ViewPublicInvestmentVehicle;