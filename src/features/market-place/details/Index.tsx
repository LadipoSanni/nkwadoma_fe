'use client';
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {cabinetGroteskMediumBold600, inter, inter500} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import styles from "../../market-place/Index.module.css";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const MarketPlaceDetails = () => {
    const router = useRouter();

    const handleBack = () => {
        router.push("/marketplace");
    };

    const {
        marketInvestmentVehicleId,
        vehicleType,
    } = useSelector((state: RootState) => state.marketPlace.savedMarketplaceData) || {};

    const HandleInvest = () => {
        // vehicleType
        router.push("/marketplace/transfer");
        console.log(marketInvestmentVehicleId);
    }

    const investmentBasicDetails = [
        {label: 'Maturity date', value: '13 Aug, 2026'},
        {label: 'Interest rate', value: '20%'},
        {label: 'Minimum amount', value: '₦900,000'},
        {
            label: 'Status',
            value: (
                <div className="flex gap-2 md:gap-2 md:flex">
                    Fundraising
                    <div
                        className="w-fit md:w-fit md:h-fit h-fit md:py-0 py-0 md:px-1 px-1 md:rounded-md rounded-md border md:border border-green650 md:border-green650">
            <span
                className={`${inter500.className} md:bg-green150 bg-green150 md:px-0.5 px-0.5 md:rounded-md rounded-md md:py-0.5 py-0.5 md:text-[14px] text-[14px] text-green750 md:text-green750`}>
              Open
            </span>
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
                        Software Engineering Fund
                    </p>

                    <div className={`${inter.className} flex md:flex-row gap-4`}>
                        <div className={`${bgColor} rounded-full h-12 w-12`}>
                            <Image
                                src={`BlueCircles.svg`}
                                alt="logo"
                                width={104}
                                height={29}
                                className="p-3 h-4 w-4 object-cover"
                                data-testid="circle-image"
                                loading="lazy"
                            />
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <div className={`text-[#6A6B6A] text-sm font-normal`}>Fund manager</div>
                            <div className={`text-sm font-medium text-[#212221]`}>Cowrywise</div>
                        </div>
                    </div>


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
                                className={`${inter.className} bg-meedlBlue w-full text-meedlWhite`}
                                onClick={HandleInvest}
                                // disabled={color === 'black'}
                                // disabled={status === 'CLOSE'}
                                // className={`${inter.className} ${status === 'CLOSE'? " bg-black  cursor-not-allowed" : "bg-meedlBlue text-meedlWhite"}  w-full `}
                        >
                            Invest
                        </Button>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default MarketPlaceDetails;