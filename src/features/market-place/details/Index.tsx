'use client';
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {cabinetGrotesk, cabinetGroteskMediumBold600, inter, inter500} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import styles from "../../market-place/Index.module.css";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";


interface SectionProps {
    index: number;
    title: string;
    content: React.ReactNode;
    subtitle?: string;
    isList?: boolean;
    parentIndex?: number;
}

const Section: React.FC<SectionProps> = ({index, title, content, subtitle, isList = false, parentIndex}) => {

    const number = parentIndex !== undefined ? `${parentIndex + 1}.${index + 1}` : `${index + 1}.`;

    return (
        <div className="space-y-6">
            {title && (
                <h1 className={`${cabinetGrotesk.className} text-2xl font-extralight flex items-start gap-2 mb-4`}>
                    <span>{number}</span>
                    <span>{title}</span>
                </h1>
            )}
            {subtitle && (
                <h3 className="font-medium text-lg flex items-start gap-2 md-[15px]">
                    {parentIndex !== undefined && <span>{number}</span>}
                    <span>{subtitle}</span>
                </h3>
            )}
            {isList ? (
                <ul className={`${inter.className} list-disc pl-5 text-gray-700 font-normal text-base space-y-4`}>
                    {content}
                </ul>
            ) : (
                <p className={`${inter.className} font-normal text-base`}>{content}</p>
            )}
        </div>
    );
};

const MarketPlaceDetails = () => {
    const router = useRouter();

    const handleBack = () => {
        router.push("/marketplace");
    };

    const {
        marketInvestmentVehicleId,
        vehicleType
    } = useSelector((state: RootState) => state.program.savedMarketplaceData) || {};

    // console.log(marketInvestmentVehicleId, vehicleType);

    const HandleInvest = () => {
        // vehicleType
        router.push("/marketplace/confirmTransfer");
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

    const purposeAndObjectiveData = [
        {
            title: "Purpose & Objectives",
            content: "The Tech Innovators Fund aims to generate high returns by investing in early-stage and growth-stage software engineering companies. The fund prioritizes companies developing innovative software solutions with scalable business models and strong market potential.",
            isList: false,
        },
        {
            title: "Investment Strategy",
            subsections: [
                {
                    subtitle: "Target Sectors",
                    content: (
                        <>
                            <li>Artificial Intelligence & Machine Learning</li>
                            <li>Cloud Computing & SaaS Platforms</li>
                            <li>Cybersecurity</li>
                            <li>Fintech & Blockchain</li>
                            <li>Enterprise Software & Automation</li>
                        </>
                    ),
                    isList: true,
                },
                {
                    subtitle: "Investment Stages",
                    content: <li>Pre-seed, Seed, Series A, and Growth-stage startups</li>,
                    isList: true,
                },
            ],
        },
    ];
    // const bgColor = vehicleType === "commercial" ? "#D9EAFF" : "#E6F2EA";
    const bgColor = vehicleType === "Commercial" ? "bg-[#D9EAFF]" : "bg-[#E6F2EA]";
    const imageSrc =
        vehicleType === "Commercial"
            ? "/asset/image/Asset.svg"
            : "/asset/image/Circles.svg";

    return (
        <main id="mainDiv" className="md:px-10 py-6 px-3 w-full md:gap-10 gap-8">
            <div id="backButtonId">
                <BackButton
                    id="createFundBackButton"
                    handleClick={handleBack}
                    iconBeforeLetters={true}
                    text="Back"
                    textColor=""
                />
            </div>

            <div
                id="detailsPurposeAndObjectiveDiv"
                className={`w-full md:w-full grid md:flex md:justify-between gap-3.5 gap- md:pt-4 pt-4`}
            >
                <div
                    id="purpposeDiv"
                    className={`${styles.container} w-full md:w-1/3 grid  md:h-[70vh] md:max-h-none `}
                >
                    <div id="backgroundId" className={`w-full md:w-full rounded-md md:rounded-md ${bgColor}`}>
                        <div id="type" data-testid="type" className="py-5 px-4 flex flex-col">
                            <div
                                id="investmentTypeId"
                                className="bg-white text-black text-sm font-medium rounded-[32px] px-3 py-1 w-[104px] h-[29px] flex items-center justify-center"
                            >
                                {vehicleType}
                            </div>
                        </div>
                        <div id="imageId" className="object-right-bottom justify-end flex">
                            <Image
                                src={imageSrc}
                                alt="circle"
                                width={104}
                                height={29}
                                className="rounded-[32px] object-right-bottom"
                                data-testid="circle-image"
                                loading="lazy"
                            />
                        </div>
                    </div>;

                    <p
                        className={`id="keyValuePairId" ${cabinetGroteskMediumBold600.className} md:text-[32px] text-[24px] md:text-[#212221]`}
                    >
                        Software Engineering Fund
                    </p>
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

                    <div className={`pt-4`}>
                        <Button type="button" size="lg" variant="secondary"
                                className={`${inter.className} bg-meedlBlue w-full text-meedlWhite`} onClick={HandleInvest}>
                            Invest
                        </Button>
                    </div>
                </div>

                <div
                    id="purposeAndObjectiveDiv"
                    className={`${styles.container} text-[#212221] w-full md:w-3/5 md:h-[75vh] md:max-h-none rounded-[20px] border border-[#D7D7D7] bg-grey105 md:p-10 py-2 px-5 space-y-6`}
                >
                    {purposeAndObjectiveData.map((section, index) => (
                        <div key={index}>
                            <Section
                                index={index}
                                title={section.title}
                                content={section.content || ""}
                                isList={section.isList}
                            />
                            {section.subsections && section.subsections.map((subsection, subIndex) => (
                                <Section
                                    key={`${index}-${subIndex}`}
                                    index={subIndex}
                                    parentIndex={index}
                                    title=""
                                    subtitle={subsection.subtitle}
                                    content={subsection.content}
                                    isList={subsection.isList}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MarketPlaceDetails;