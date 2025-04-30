
'use client'
import React from 'react';
// import MarketDetailsSkeleton from "@/reuseable/Skeleton-loading-state/MarketDetails";
// import BackButton from "@/components/back-button";
import styles from "@/features/market-place/Index.module.css";
import Image from "next/image";
import {cabinetGroteskMediumBold600, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
// import {formatAmount} from "@/utils/Format";

const Page = () => {
    // const handleBack = ()=> {
    //
    // }

    const investmentBasicDetails = [
        {label: 'Maturity date',
            // value: `${data?.data?.tenure} ${data?.data?.tenure === 1 ? 'month' : 'months'}`}
            value: ''},
        {label: 'Interest rate', value:
            // `${data?.data?.rate || 0}%`}
                ''},
        {label: 'Minimum amount', value: ''}
        // (<span className='text-meedlBlack text-[14px] font-semibold'>{formatAmount(data?.data?.minimumInvestmentAmount?.toString() || '0')}</span>)}
        ,
        {label: 'Status', value: ''
            //     (
            //     <div id="minidetailsId" className="flex bg-[#F6F6F6] items-center gap-2 rounded-lg px-2 py-1 w-fit">
            //         <span id="fundrasingId" className="font-normal text-black text-sm flex items-center justify-center">{statusKey}</span>
            //         <div id="statusDivId" className={`bg-meedlWhite p-1 border rounded-lg ${borderClass}`}>
            //             <span id="statusId" className={`text-sm font-medium px-1 py-1 rounded-lg lowercase ${statusClass}`}>
            //                 {actualStatus ?.toLowerCase() || ""}</span>
            //         </div>
            //     </div>
            // ),
        },
    ];

    return (
        <>
            {/*{isLoading || isFetching ? (<MarketDetailsSkeleton/>):*/}
            <main id="mainDiv" className="md:px-10 py-6 px-3 w-full md:gap-10 gap-8">
                {/*<div id="backButtonId">*/}
                {/*    <BackButton*/}
                {/*        id="createFundBackButton"*/}
                {/*        handleClick={handleBack}*/}
                {/*        iconBeforeLetters={true}*/}
                {/*        text="Back to investment"*/}
                {/*        textColor=""*/}
                {/*    />*/}
                {/*</div>*/}

                <div
                    id="detailsPurposeAndObjectiveDiv"
                    className={`flex items-center justify-center md:pt-4 pt-4`}
                >
                    <div
                        id="purpposeDiv"
                        className={`${styles.container} w-full grid md:w-2/5 md:h-[70vh] md:max-h-none `}
                    >
                        <div id="backgroundId" className={`w-full bg-[#D9EAFF] md:w-full rounded-md md:rounded-md `}>
                            <div id="type" data-testid="type" className="py-5 px-4 flex flex-col">
                                <div
                                    id="investmentTypeId"
                                    className={`bg-white  text-sm font-medium rounded-[32px] px-3 py-1 w-[104px] h-[29px] flex items-center justify-center`}
                                >
                                    {/*{vehicleType*/}
                                    {/*    ? vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1).toLowerCase()*/}
                                    {/*    : ""}*/}
                                    Commercial
                                </div>
                            </div>
                            <div id="imageId" className="object-right-bottom justify-end flex">
                                <Image
                                    src={'/BlueCircles.svg'}
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
                            {/*{data?.data.name}*/}
                            lAHO II
                        </p>
                        <div className={`${inter.className} flex md:flex-row md:pt-0 pt-2 gap-4`}>
                            <div
                                className={`} rounded-full h-12 w-12 flex items-center justify-center text-meedlBlue text-sm font-semibold uppercase`}
                            >
                                {/*{data?.data.bankPartnerImage ? (*/}
                                <Image
                                    src={`/GreenCircles.svg`}
                                    alt="logo"
                                    width={104}
                                    height={29}
                                    className="h-4 w-4 object-cover"
                                    data-testid="circle-image"
                                    loading="lazy"
                                />
                                {/*) : (*/}
                                {/*    data?.data.bankPartner*/}
                                {/*        ?.split(" ")*/}
                                {/*        .map((word: string) => word[0])*/}
                                {/*        .join("")*/}
                                {/*)}*/}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-[#6A6B6A] text-sm font-normal">
                                    {/*{data?.data.fundManager}*/}
                                    Fund manager
                                </div>
                                <div className={`${inter.className} text-sm font-medium text-[#212221]`}>
                                    {/*{data?.data.bankPartner}*/}
                                    bank partner
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
                                        // title={docFilename}
                                    >
                                        {/*{smallScreenFilename}*/}
                                        file name
                                    </p>

                                    <p className="text-[14px] items-center hidden sm:flex">
                                        {/*{largeScreenFilename}*/}
                                        larger
                                    </p>
                                </div>

                                <div className={`flex justify-center items-center`}>
                                    <Button
                                        id="view-document"
                                        type="button"
                                        variant={"default"}
                                        // onClick={handleViewDocument}
                                        className="text-meedlBlue border-[1px] border-meedlBlue rounded-[20px] font-semibold text-[12px] md:px-4 px-3 py-2"
                                        // disabled={!docUrl || isVerifying}
                                        // aria-label={`View ${docFilename}`}
                                    >
                                        {/*{isVerifying ? "Verifying..." : docUrl ? "View" : "No Document"}*/}
                                        view
                                    </Button>
                                </div>
                            </div>

                        </div>
                        {/*{docError && (*/}
                        {/*    <p className='text-red-500 text-xs mt-1 mb-3'>{docError}</p>*/}
                        {/*)}*/}
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
                                // onClick={HandleInvest}
                                    className={` w-full `}
                                // disabled={actualStatus  === 'CLOSE'}
                                // className={`${inter.className} ${actualStatus  === 'CLOSE'? " bg-[#D0D5DD]  cursor-not-allowed" : "bg-meedlBlue text-meedlWhite"}  w-full `}
                            >
                                Invest
                            </Button>
                        </div>
                    </div>

                </div>
            </main>
            {/*}*/}
        </>
    );
};

export default Page;
