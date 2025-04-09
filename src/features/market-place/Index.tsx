"use client";
import React, { useState } from "react";
import InvestmentCard from "@/reuseable/cards/Investment-card/InvestmentCard";
import { store } from "@/redux/store";
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import { useRouter } from "next/navigation";
import { setMarketInvestmentVehicleId } from "@/redux/slice/investors/MarketPlaceSlice";
import { useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery } from "@/service/admin/fund_query";
import MarketPlaceInvestmentGrid from "@/reuseable/Skeleton-loading-state/Skeleton-for-MarketPlace";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import {MdOutlinePayments} from "react-icons/md";

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

    const { data, isLoading, isFetching } =
        useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery({
            pageSize: 100,
            pageNumber: 0,
            investmentVehicleStatus: "PUBLISHED",
        });

    const vehicles = data?.data?.body || [];

    const filteredVehicles = vehicles.filter((vehicle) => {
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


            {isLoading || isFetching ? (
                <div className="w-full">
                    <MarketPlaceInvestmentGrid />
                </div>
            ) : filteredVehicles.length === 0 ? (
                <div className={`flex justify-center items-center text-center md:mt-36 mt-28`}>
                    <LoanEmptyState
                        id="Vehicles"
                        icon={<MdOutlinePayments className="w-10 h-10" color="#142854" />}
                        iconBg="#D9EAFF"
                        title="Investment Vehicles will show here"
                        description="There are no investments veehicle available yet"
                    />
                </div>
                ) : (
                <div
                    id="card-segmentId"
                    className="grid grid-cols-1 px-3 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 h-[70vh] overflow-x-hidden overflow-y-auto gap-y-10 gap-x-5"
                >
                    {filteredVehicles.map((vehicle) => {
                        const backgroundColor =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "#D9EAFF"
                                : "#E6F2EA";
                        const imageSrc =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "/asset/image/BlueCircles.svg"
                                : "/asset/image/GreenCircles.svg";

                        const status = "Open";
                        const statusClass =
                            status === "Open"
                                ? "bg-green-100 text-[#0D9B48] border-[#B4E5C8]"
                                : "bg-red-100 text-red-600 border-[#F2BCBA]";
                        const borderClass =
                            status === "Open" ? "border-[#B4E5C8]" : "border-[#F2BCBA]";

                        const truncatedTitle =
                            vehicle.name.length > 20
                                ? vehicle.name.slice(0, 20) + "..."
                                : vehicle.name;

                        return (
                            <InvestmentCard
                                key={vehicle.id}
                                id={vehicle.id}
                                backgroundColor={backgroundColor}
                                investmentVehicleType={vehicle.investmentVehicleType}
                                imageSrc={imageSrc}
                                investmentVehicleName={truncatedTitle}
                                statusClass={statusClass}
                                status={status}
                                borderClass={borderClass}
                                percentage={vehicle.rate || 0}
                                HandleCardDetails={() =>
                                    HandleCardDetails(vehicle.id, vehicle.investmentVehicleType, router)
                                }
                            />
                        );
                    })}
                </div>
            )}
        </main>
    );
};

export default MarketPlaceView;
