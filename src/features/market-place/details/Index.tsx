'use client';
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {cabinetGroteskMediumBold600, inter, inter500} from "@/app/fonts";
import {Button} from "@/components/ui/button";


const MarketPlaceDetails = () => {
    const router = useRouter();
    const handleBack = () => {
        router.push("/marketplace")
    }

    const investmentBasicDetails = [
        {label: 'Investment start date', value: '23 jan,2024'},
        {label: 'Date invested', value: '21, june, 2023'},
        {label: 'Maturity date', value: '21, june, 2023 '},
        {
            label: 'Status', value:
                <div className={`flex gap-2 md:gap-2 md:flex`}>
                    Fundraising
                    <div
                        className={` w-fit md:w-fit md:h-fit h-fit md:py-0 py-0 md:px-1 px-1 md:rounded-md rounded-md border md:border border-green650 md:border-green650`}>
                        <span
                            className={` ${inter500.className} md:bg-green150 bg-green150 md:px-0.5 px-0.5 md:rounded-md rounded-md md:py-0.5 py-0.5 md:text-[14px] text-[14px] text-green750 md:text-green750 `}>Open</span>
                    </div>
                </div>
        },
    ]

    return (
        <main id={`mainDiv`} className={`md:px-10 px-4 w-full`}>
            <div id={"backButtonId"} className={`py-2`}>
                <BackButton
                    id="createFundBackButton"
                    handleClick={handleBack}
                    iconBeforeLetters={true}
                    text='Back'
                    textColor=''
                />
            </div>

            <div id={"detailsPurposeAndObjectiveDiv"} className={`flex md:flex-row flex-col`}>
                <div id={"purpposeDiv"} className={`w-full max-w-[33%] grid gap-3 md:grid md:gap-4 h-fit md:h-fit `}>
                    <div
                        className={` w-full md:w-full h-[13rem] md:h-[10rem] rounded-md md:rounded-md bg-[#D9EAFF] md:bg-[#D9EAFF]`}>
                        <div id={`type`} data-testid={`type`} className={`py-5 px-4 flex flex-col`}>
                            <div id={"investmentTypeId"}
                                 className="bg-white text-black text-sm font-medium rounded-[32px] px-3 py-1 w-[104px] h-[29px] flex items-center justify-center shadow">
                                Commercial
                            </div>
                        </div>
                        <div id={"imageId"} className="object-right-bottom justify-end flex ">
                            <Image
                                src={"/asset/image/BlueCircles.svg"}
                                alt="circle"
                                width={104}
                                height={29}
                                className="rounded-[32px] object-right-bottom "
                                data-testid="circle-image"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div id={"keyValuePairId"} className={""}>
                        <p className={` ${cabinetGroteskMediumBold600.className} font-medium text-2xl text-[#212221] `}>Software
                            Engineering Fund</p>
                        <div className={` bg-grey105 md:bg-grey105 grid h-fit md:h-fit  gap-7 py-2 md:py-3 px-3  `}>
                            {investmentBasicDetails.map((item, index) => (
                                <div key={"key" + index}
                                     className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                    <p
                                        className={`  ${inter.className} text-black300 text-[14px]  font-normal`}>{item.label}</p>
                                    <div
                                        className={` ${inter.className}  text-black500 text-[14px] le font-normal`}> {item.value ? item.value : 'Not provided'}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type={"button"} size={"lg"} variant={"secondary"}
                            className={"bg-meedlBlue text-meedlWhite"}>
                        Invest
                    </Button>

                </div>

                <div id={"purposeAndObjectiveDiv"}>

                </div>
            </div>
        </main>
    );
}

export default MarketPlaceDetails;