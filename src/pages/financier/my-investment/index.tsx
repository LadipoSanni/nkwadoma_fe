"use client";
import React, {  useState } from "react";
import { store } from "@/redux/store";
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import { useRouter } from "next/navigation";
import { setCurrentMyInvestmentVehicleDetails } from "@/redux/slice/financier/financier";
// import {
//     useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery,
// } from "@/service/admin/fund_query";
// import MarketPlaceInvestmentGrid from "@/reuseable/Skeleton-loading-state/Skeleton-for-MarketPlace";
// import LoanEmptyState from "@/reuseable/emptyStates/Index";
// import { MdOutlinePayments } from "react-icons/md";
import {useViewMyInvestmentQuery} from '@/service/financier/api'
import dynamic from "next/dynamic";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {
    CurrentMyInvestmentVehicleDetails,
} from "@/pages/financier/my-investment/types";
import Card from "@/pages/financier/my-investment/card";
import MarketPlaceInvestmentGrid from "@/reuseable/Skeleton-loading-state/Skeleton-for-MarketPlace";
import {MdOutlinePayments} from "react-icons/md";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
// interface InvestmentVehicle {
//     id: string;
//     investmentVehicleType: "COMMERCIAL" | "ENDOWMENT";
//     name: string;
//     rate?: number;
// }

const MyInvestmentContent = dynamic(
    () => Promise.resolve(MyInvestment),
    {ssr: false}
)


const MyInvestment = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    // const [hasMore, setHasMore] = useState(true);
    // const [pageNumber, setPageNumber] = useState(0);
    // const [allVehicles, setAllVehicles] = useState<InvestmentVehicle[]>([]);

    // const observer = useRef<IntersectionObserver | null>(null);
    // const lastCardRef = useRef<HTMLDivElement | null>(null);

    // const { data, isLoading, isFetching } =
    //     useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery({
    //         pageSize: 48,
    //         pageNumber: pageNumber,
    //         investmentVehicleStatus: "PUBLISHED",
    //     });
    // console.log('data', data);

    const {data: datss, isLoading} = useViewMyInvestmentQuery({})


    // const hh = datss?.data?.investmentSummaries?.name
    // const hh2 = datss?.data?.investmentSummaries?.name



    const HandleCardDetails = (vehicleDetails: CurrentMyInvestmentVehicleDetails ) => {
        store.dispatch(
            setCurrentMyInvestmentVehicleDetails(vehicleDetails)
        );
        router.push("/my-investment/details");
    };




    const getStatusColor = (status: string) => {
        if(capitalizeFirstLetters(status)?.toString() === 'Closed') {
            return 'bg-red-100 md:bg-red-100 md:text-red-600 text-red-600 border-[#F2BCBA] md:border-[#F2BCBA]'
        }
        return 'bg-green-100 md:bg-green-100 md:text-[#0D9B48] text-[#0D9B48] border-[#B4E5C8] md:border-[#B4E5C8]'
    }

    const getStatusBorderColor =  (status: string) => {
        if(capitalizeFirstLetters(status)?.toString() === 'Closed') {
            return 'border-[#F2BCBA] md:border-[#F2BCBA]'
        }
        return 'border-[#B4E5C8] md:border-[#B4E5C8]'
    }




    const vehicles = datss?.data?.investmentSummaries

    return (
        <main id="marketplaceView" className="py-9 px-5 h ">
            <div id="searchDiv" className="px-2 flex md:flex-row flex-col gap-3">
                <SearchInput
                    id="ProgramSearchInput"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style="md:w-20 w-full"
                />
                <CustomSelect
                    id="marketplaceSelect"
                    value={selectedValue}
                    onChange={(value) => setSelectedValue(value)}
                    selectContent={["Commercial Investment", "Endowment Investment"]}
                    placeHolder="Type"
                    triggerId="marketplaceTrigger"
                    className="h-11 md:w-sm w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
                />
            </div>

            {isLoading  ? (
                <div className="w-full">
                    <MarketPlaceInvestmentGrid />
                </div>
            ) : vehicles.length === 0 ? (
                <div className="flex justify-center items-center text-center md:h-[40vh] h-[40%] w-full mt-40">
                    <LoanEmptyState
                        id="Vehicles"
                        icon={<MdOutlinePayments className="w-10 h-10" color="#142854" />}
                        iconBg="#D9EAFF"
                        title="Investment Vehicles will show here"
                        description="There are no investment vehicles available yet"
                    />
                </div>
            ) : (
                <div
                    id="card-segmentId"
                    className="grid grid-cols-1 px-3 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 h-[70vh] overflow-x-hidden overflow-y-auto gap-y-10 gap-x-5"
                >

                    {vehicles?.map((vehicle: CurrentMyInvestmentVehicleDetails, index: number) => {
                        const backgroundColor =
                             vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "#D9EAFF"
                                : "#E6F2EA";
                        const imageSrc =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "/BlueCircles.svg"
                                : "/GreenCircles.svg";
                        const statusValue = vehicle.fundRaisingStatus ? vehicle.fundRaisingStatus : vehicle.deployingStatus ;
                        const status = vehicle.fundRaisingStatus ?  'Fundraising' : 'Deploying';

                        const statusClass = getStatusColor(statusValue)
                        const borderClass = getStatusBorderColor(statusValue)

                        const truncatedTitle =
                            vehicle.name.length > 20
                                ? vehicle.name.slice(0, 20) + "..."
                                : vehicle.name;



                        return <Card
                            key={`wrapper-${index}`}
                            HandleCardDetails={HandleCardDetails}
                            vehicleDetails={vehicle}
                            backgroundColor={backgroundColor}
                            investmentVehicleType={vehicle.investmentVehicleType}
                            imageSrc={imageSrc}
                            investmentVehicleName={truncatedTitle}
                            statusClass={statusClass}
                            status={status}
                            statusValue={statusValue}
                            borderClass={borderClass}
                            percentage={vehicle.interestRateOffered || 0}

                        />;
                    })}

                </div>
            )}
        </main>
    );
};

export default MyInvestmentContent;
