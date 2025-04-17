import React from "react"
import {cabinetGrotesk, inter} from "@/app/fonts";
import Image, {StaticImageData} from 'next/image';
import {useRouter} from "next/navigation";


interface InvestmentCardProps {
    id: string;
    backgroundColor: string;
    imageSrc: string | StaticImageData;
    investmentVehicleType: string;
    investmentVehicleName: string;
    statuses: string;
    percentage: number;
    HandleCardDetails: (id: string, investmentVehicleType: string, router: ReturnType<typeof useRouter>) => void;
    statusClass: string;
    borderClass:string;
    typeTextColor:string;
    status?: boolean;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
                                                           id,
                                                           status,
                                                           backgroundColor,
                                                           investmentVehicleType,
                                                           imageSrc,
                                                           investmentVehicleName,
                                                           statuses,
                                                           percentage,
                                                           HandleCardDetails,
                                                           statusClass,
                                                           borderClass,
                                                           typeTextColor,
                                                       }) => {
    const router = useRouter();

    return (
        <div id={`investment-card`} data-testid="investment-card"
             className={`${inter.className} md:h-80 h-72`}>
            <div id="investment-type-segment" data-testid={`investment-type-segment`} style={{backgroundColor}}
                 className="rounded-md">
                <div id={`type`} data-testid={`type`} className={`py-5 px-4 flex flex-col`}>
                    <div
                        id="investmentTypeId"
                        className={`bg-white text-sm font-medium rounded-[32px] px-3 py-1 w-[104px] h-[29px] flex items-center justify-center ${typeTextColor}`}>
                        {investmentVehicleType
                            ? investmentVehicleType.charAt(0).toUpperCase() + investmentVehicleType.slice(1).toLowerCase()
                            : ""}
                    </div>
                </div>
                <div id={"imageId"} className="object-right-bottom justify-end flex ">
                    <Image
                        src={imageSrc}
                        alt="circle"
                        width={104}
                        height={29}
                        className="object-right-bottom flex  "
                        data-testid="circle-image"
                        loading="lazy"
                    />
                </div>
            </div>

            <div id={"detailsSectionId"} className={`pt-5`}>
                <div id={"minidetailsId"} className="flex bg-[#F6F6F6] items-center gap-2 rounded-lg px-2 py-1 w-fit">
                    <span id={"fundrasingId"}
                        className="font-normal text-black text-sm flex items-center justify-center">
                        {status}
                    </span>
                    <div id={"statusDivId"} className={`bg-meedlWhite p-1 border rounded-lg ${borderClass}`}>
                        <span id={"statusId"}
                            className={`text-sm font-medium px-1 py-1 rounded-lg lowercase ${statusClass}`}>
                            {statuses}
                        </span>
                    </div>
                </div>
                <div id={"investmentVehicleNameId"} className={`${cabinetGrotesk.className} pt-3 font-medium text-xl text-[#212221] capitalize `}>
                    {investmentVehicleName}
                </div>
                <div id={"percentageId"} className={`${inter.className} text-[#4D4E4D] font-normal text-sm`}>
                    {percentage}% interest
                </div>

                <div id={"HandleCardDetailsId"} className={`${inter.className} py-3 font-normal text-sm text-meedlBlue underline cursor-pointer`}
                     onClick={() => HandleCardDetails(id, investmentVehicleType, router)}
                >
                    View details
                </div>
            </div>
        </div>
    );
}

export default InvestmentCard;
