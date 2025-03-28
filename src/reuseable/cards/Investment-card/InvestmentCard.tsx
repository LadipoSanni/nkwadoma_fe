import React from "react"
import {cabinetGrotesk, inter} from "@/app/fonts";
import Image, {StaticImageData} from 'next/image';


interface InvestmentCardProps {
    id: string;
    backgroundColor: string;
    imageSrc?: string | StaticImageData;
    investmentVehicleType: string;
    investmentVehicleName: string;
    status: string;
    percentage: number;
    HandleCardDetails: (id: string) => void;
    statusClass: string;
    borderClass:string;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
                                                           id,
                                                           backgroundColor,
                                                           investmentVehicleType,
                                                           imageSrc,
                                                           investmentVehicleName,
                                                           status,
                                                           percentage,
                                                           HandleCardDetails,
                                                           statusClass,
                                                           borderClass,
                                                       }) => {
    return (
        <div id={`investment-card`} data-testid="investment-card"
             className={`${inter.className} max-w-[18rem] md:h-[20.5rem] h-[20.5rem]`}>
            <div id="investment-type-segment" data-testid={`investment-type-segment`} style={{backgroundColor}}
                 className="h-[10.75rem] rounded-md">
                <div id={`type`} data-testid={`type`} className={`py-5 px-4 flex flex-col`}>
                    <div id={"investmentTypeId"}
                        className="bg-white text-black text-sm font-medium rounded-[32px] px-3 py-1 w-[104px] h-[29px] flex items-center justify-center shadow">
                        {investmentVehicleType}
                    </div>
                </div>
                <div id={"imageId"} className="object-right-bottom justify-end flex ">
                    <Image
                        src={imageSrc || "/default-image.png"}
                        alt="circle"
                        width={104}
                        height={29}
                        className="rounded-[32px] object-right-bottom "
                        data-testid="circle-image"
                        loading="lazy"
                    />
                </div>
            </div>

            <div id={"detailsSectionId"} className={`pt-5`}>
                <div id={"minidetailsId"} className="flex bg-[#F6F6F6] items-center gap-2 rounded-lg px-2 py-1 w-fit">
                    <span id={"fundrasingId"}
                        className="font-normal text-black text-sm flex items-center justify-center">
                        Fundraising
                    </span>
                    <div id={"statusDivId"} className={`bg-meedlWhite p-1 border rounded-lg ${borderClass}`}>
                        <span id={"statusId"}
                            className={`text-sm font-medium px-1 py-1 rounded-lg ${statusClass}`}>
                            {status}
                        </span>
                    </div>
                </div>
                <div id={"investmentVehicleNameId"} className={`${cabinetGrotesk.className} pt-3 font-medium text-xl text-[#212221]`}>
                    {investmentVehicleName}
                </div>
                <div id={"percentageId"} className={`${inter.className} text-[#4D4E4D] font-normal text-sm`}>
                    {percentage}% interest
                </div>

                <div id={"HandleCardDetailsId"} className={`${inter.className} py-3 font-normal text-sm text-meedlBlue underline cursor-pointer`}
                     onClick={() => HandleCardDetails(id)}
                >
                    View details
                </div>
            </div>
        </div>
    );
}

export default InvestmentCard;
