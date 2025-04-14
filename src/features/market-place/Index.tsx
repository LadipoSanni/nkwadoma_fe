"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import InvestmentCard from "@/reuseable/cards/Investment-card/InvestmentCard";
import { store } from "@/redux/store";
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import { useRouter } from "next/navigation";
import { setMarketInvestmentVehicleId } from "@/redux/slice/investors/MarketPlaceSlice";
import { useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery } from "@/service/admin/fund_query";
import MarketPlaceInvestmentGrid from "@/reuseable/Skeleton-loading-state/Skeleton-for-MarketPlace";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import { MdOutlinePayments } from "react-icons/md";

interface InvestmentVehicle {
    id: string;
    investmentVehicleType: "COMMERCIAL" | "ENDOWMENT";
    name: string;
    rate?: number;
    fundRaisingStatus: string | null;
    deployingStatus: string | null;
}

export const HandleCardDetails = (
    id: string,
    type: string,
    router: ReturnType<typeof useRouter>
) => {
    store.dispatch(
        setMarketInvestmentVehicleId({
            marketInvestmentVehicleId: id,
            vehicleType: type,
        })
    );
    router.push("/marketplace/details");
};

const MarketPlaceView = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [allVehicles, setAllVehicles] = useState<InvestmentVehicle[]>([]);

    const observer = useRef<IntersectionObserver | null>(null);
    // const lastCardRef = useRef<HTMLDivElement | null>(null);

    const { data, isLoading, isFetching } =
        useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery({
            pageSize: 48,
            pageNumber: pageNumber,
            investmentVehicleStatus: "PUBLISHED",
        });

    useEffect(() => {
        setPageNumber(0);
        setAllVehicles([]);
    }, [searchTerm, selectedValue]);

    useEffect(() => {
        if (data?.data?.body) {
            console.log("API Response:", data.data.body);
            setAllVehicles(prev => {
                const newVehicles = pageNumber === 0 ? data.data.body : [...prev, ...data.data.body];
                const validVehicles = newVehicles.filter(
                    (vehicle): vehicle is InvestmentVehicle =>
                        vehicle &&
                        typeof vehicle.id === "string" &&
                        typeof vehicle.investmentVehicleType === "string" &&
                        typeof vehicle.name === "string" &&
                        "fundRaisingStatus" in vehicle &&
                        "deployingStatus" in vehicle
                );
                const uniqueVehicles = Array.from(new Map(validVehicles.map(v => [v.id, v])).values());
                return uniqueVehicles;
            });

            setHasMore(data.data.hasNextPage);
        }
    }, [data, pageNumber]);
// useEffect(() => {
//         if (data?.data?.body) {
//             console.log("API Response:", data.data.body);
//             setAllVehicles(prev => {
//                 const newVehicles = pageNumber === 0 ? data.data.body : [...prev, ...data.data.body];
//                 const uniqueVehicles = Array.from(
//                     new Map(newVehicles.map(vehicle => [vehicle.id, vehicle])).values()
//                 );
//                 return uniqueVehicles;
//             });
//             setHasMore(data.data.hasNextPage);
//         }
//     }, [data, pageNumber]);

    const lastCardObserver = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading || isFetching) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting && hasMore) {
                        setPageNumber(prevPage => prevPage + 1);
                    }
                },
                {
                    rootMargin: "100px",
                }
            );

            if (node) observer.current.observe(node);
        },
        [isLoading, isFetching, hasMore]
    );

    const filteredVehicles = allVehicles.filter((vehicle) => {
        const matchesSearch = vehicle.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const typeMatch =
            selectedValue === "" ||
            (selectedValue === "Commercial Investment" &&
                vehicle.investmentVehicleType === "COMMERCIAL") ||
            (selectedValue === "Endowment Investment" &&
                vehicle.investmentVehicleType === "ENDOWMENT");

        return matchesSearch && typeMatch;
    });

    return (
        <main id="marketplaceView" className="py-9 px-5">
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

            {isLoading && pageNumber === 0 ? (
                <div className="w-full">
                    <MarketPlaceInvestmentGrid />
                </div>
            ) : filteredVehicles.length === 0 ? (
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
                    {filteredVehicles.map((vehicle, index) => {
                        const backgroundColor =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "#D9EAFF"
                                : "#E6F2EA";
                        const imageSrc =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "/BlueCircles.svg"
                                : "/GreenCircles.svg";

                        const status = vehicle.fundRaisingStatus || vehicle.deployingStatus || "Unknown";
                        const statusClass =
                            status === "OPEN"
                                ? "bg-green-100 text-[#0D9B48] border-[#B4E5C8]"
                                : status === "CLOSE"
                                    ? "bg-red-100 text-red-600 border-[#F2BCBA]"
                                    : "bg-gray-100 text-gray-600 border-gray-300";
                        const borderClass =
                            status === "OPEN" ? "border-[#B4E5C8]" : status === "CLOSE" ? "border-[#F2BCBA]" : "border-gray-300";
                        // const statusKey = vehicle.fundRaisingStatus ? "fundRaisingStatus" : "deployingStatus";
                        const statusValue = vehicle.fundRaisingStatus || vehicle.deployingStatus || "Unknown";
                        const statuses = ` ${statusValue}`;
                        // fundRaising = `${statusKey}`;

                        const truncatedTitle =
                            vehicle.name.length > 20
                                ? vehicle.name.slice(0, 20) + "..."
                                : vehicle.name;

                        const cardProps = {
                            id: vehicle.id,
                            backgroundColor,
                            investmentVehicleType: vehicle.investmentVehicleType,
                            imageSrc,
                            investmentVehicleName: truncatedTitle,
                            statusClass,
                            statuses,
                            borderClass,
                            percentage: vehicle.rate || 0,
                            HandleCardDetails: () =>
                                HandleCardDetails(vehicle.id, vehicle.investmentVehicleType, router),
                        };

                        if (filteredVehicles.length === index + 1) {
                            return (
                                <div key={`wrapper-${vehicle.id}`} ref={lastCardObserver}>
                                    <InvestmentCard key={vehicle.id} {...cardProps} />
                                </div>
                            );
                        }

                        return <InvestmentCard key={vehicle.id} {...cardProps} />;
                    })}
                    {isFetching && pageNumber > 0 && (
                        <div className="col-span-full text-center py-4">
                            Loading more...
                        </div>
                    )}
                </div>
            )}
        </main>
    );
};

export default MarketPlaceView;
