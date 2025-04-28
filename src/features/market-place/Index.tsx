"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import InvestmentCard from "@/reuseable/cards/Investment-card/InvestmentCard";
import { store } from "@/redux/store";
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import { useRouter } from "next/navigation";
import { setMarketInvestmentVehicleId } from "@/redux/slice/investors/MarketPlaceSlice";
import MarketPlaceInvestmentGrid from "@/reuseable/Skeleton-loading-state/Skeleton-for-MarketPlace";
import {MdOutlinePayments, MdSearch} from "react-icons/md";
import {useGetMarketplaceInvestmentVehiclesByTypeAndStatusQuery, useSearchInvestmentVehiclesQuery} from "@/service/financier/marketplace";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import LoanEmptyState from "@/reuseable/emptyStates/Index";

interface InvestmentVehicle {
    id: string;
    investmentVehicleType: "COMMERCIAL" | "ENDOWMENT";
    name: string;
    rate?: number;
    fundRaisingStatus: string | null;
    deployingStatus: string;
}

export const HandleCardDetails = (
    id: string,
    type: string,
    router: ReturnType<typeof useRouter>,
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
    const [selectedValue, setSelectedType] = useState<string>("");
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [allVehicles, setAllVehicles] = useState<InvestmentVehicle[]>([]);

    const observer = useRef<IntersectionObserver | null>(null);

    const valueToBackendMap: { [key: string]: string } = {
        Commercial: "COMMERCIAL",
        Endowment: "ENDOWMENT",
    };
    const backendValue = selectedValue ? valueToBackendMap[selectedValue] : "";

    const { data: searchData, isLoading: isSearchLoading, isFetching: isSearchFetching } =
        useSearchInvestmentVehiclesQuery(
            {
                searchTerm: searchTerm,
                investmentVehicleType: backendValue,
                investmentVehicleStatus: "PUBLISHED",
                pageSize: 48,
                pageNumber: pageNumber,
            },
            { skip: !searchTerm }
        );

    const { data, isLoading, isFetching } =
        useGetMarketplaceInvestmentVehiclesByTypeAndStatusQuery({
            pageSize: 48,
            pageNumber: pageNumber,
            investmentVehicleStatus: "PUBLISHED",
        });

    const { data:viewBy, isLoading: filteringIsLoading, isFetching: filteringIsFetching } =
        useGetMarketplaceInvestmentVehiclesByTypeAndStatusQuery({
            pageSize: 48,
            pageNumber: pageNumber,
            investmentVehicleStatus: "PUBLISHED",
            investmentVehicleType: backendValue
        });

    useEffect(() => {
        setPageNumber(0);
        setAllVehicles([]);
        setHasMore(true);
    }, [searchTerm, selectedValue]);

    useEffect(() => {
        if (searchTerm && searchData?.data?.body) {
            setAllVehicles((prev) => {
                const newVehicles = pageNumber === 0 ? searchData.data.body : [...prev, ...searchData.data.body];
                const validVehicles = newVehicles.filter(
                    (vehicle): vehicle is InvestmentVehicle =>
                        vehicle &&
                        typeof vehicle.id === "string" &&
                        typeof vehicle.investmentVehicleType === "string" &&
                        typeof vehicle.name === "string" &&
                        "fundRaisingStatus" in vehicle &&
                        "deployingStatus" in vehicle
                );
                const uniqueVehicles = Array.from(new Map(validVehicles.map((v) => [v.id, v])).values());
                return uniqueVehicles;
            });
            setHasMore(searchData.data.hasNextPage);
        }  if (!searchTerm && viewBy?.data?.body) {
            setAllVehicles((prev) => {
                const newVehicles = pageNumber === 0 ? viewBy.data.body : [...prev, ...viewBy.data.body];
                const validVehicles = newVehicles.filter(
                    (vehicle): vehicle is InvestmentVehicle =>
                        vehicle &&
                        typeof vehicle.id === "string" &&
                        typeof vehicle.investmentVehicleType === "string" &&
                        typeof vehicle.name === "string" &&
                        "fundRaisingStatus" in vehicle &&
                        "deployingStatus" in vehicle
                );
                const uniqueVehicles = Array.from(new Map(validVehicles.map((v) => [v.id, v])).values());
                return uniqueVehicles;
            });
            setHasMore(viewBy.data.hasNextPage);
        }
        else if (!searchTerm && data?.data?.body) {
            setAllVehicles((prev) => {
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
                const uniqueVehicles = Array.from(new Map(validVehicles.map((v) => [v.id, v])).values());
                return uniqueVehicles;
            });
            setHasMore(data.data.hasNextPage);
        }
    }, [data, searchData, pageNumber, searchTerm, viewBy]);

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
                    onChange={(value) => setSelectedType(value)}
                    selectContent={["Commercial", "Endowment"]}
                    placeHolder="Type"
                    triggerId="marketplaceTrigger"
                    className="h-11 md:w-sm w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
                />
            </div>

            {isLoading && pageNumber === 0  || isSearchLoading || isSearchFetching || filteringIsLoading || filteringIsFetching ? (
                <div className="w-full">
                    <MarketPlaceInvestmentGrid />
                </div>
            )
                : allVehicles.length === 0 ? (
                    <div className="flex justify-center items-center text-center md:h-[40vh] h-[40%] w-full mt-40">
                        {searchTerm ? (
                            <SearchEmptyState icon={MdSearch} name="Investment" />
                        ) : (
                            <LoanEmptyState title={"Investment vehicles will show here"} description={"There are no Investment vehicles available yet"} icon={<MdOutlinePayments height={`5rem`} width={"5rem"} color={"#142854"}/>} iconBg={`#D9EAFF`} id={"vehicleEmptyState"}/>
                        )}
                    </div>
                ) : (
                <div
                    id="card-segmentId"
                    className="grid grid-cols-1 px-3 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 h-[70vh] overflow-x-hidden overflow-y-auto gap-y-10 gap-x-5"
                >
                    {allVehicles.map((vehicle, index) => {
                        const backgroundColor =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "#D9EAFF"
                                : "#E6F2EA";
                        const imageSrc =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "/BlueCircles.svg"
                                : "/GreenCircles.svg";

                        const status = vehicle.fundRaisingStatus || vehicle.deployingStatus || "";
                        const statusClass =
                            status === "OPEN"
                                ? "bg-green-100 text-[#0D9B48] border-[#B4E5C8]"
                                : status === "CLOSE"
                                    ? "bg-red-100 text-red-600 border-[#F2BCBA]"
                                    : "bg-gray-100 text-gray-600 border-gray-300";
                        const borderClass =
                            status === "OPEN" ? "border-[#B4E5C8]" : status === "CLOSE" ? "border-[#F2BCBA]" : "border-gray-300";
                        // const statusKey = vehicle.fundRaisingStatus ? "fundRaisingStatus" : "deployingStatus";
                        const statusValue = vehicle.fundRaisingStatus ? vehicle.fundRaisingStatus : vehicle.deployingStatus ;
                        const statuses = vehicle.fundRaisingStatus ?  'Fundraising' : 'Deploying';
                        // fundRaising = `${statusKey}`;
                        const typeTextColor = vehicle.investmentVehicleType === "COMMERCIAL" ? "text-[#142854]" : "text-[#045620]";

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
                            status: statusValue,
                            statuses: statuses,
                            borderClass,
                            percentage: vehicle.rate || 0,
                            typeTextColor,
                            HandleCardDetails: ()=> { HandleCardDetails(vehicle.id, vehicle.investmentVehicleType, router)},
                        };

                        if (allVehicles.length === index + 1) {
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
