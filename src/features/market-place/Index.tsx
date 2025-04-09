"use client"
import React, {useState} from 'react';
import InvestmentCard from "@/reuseable/cards/Investment-card/InvestmentCard";
import {store} from "@/redux/store";
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import { useRouter } from "next/navigation";
import {setMarketInvestmentVehicleId} from "@/redux/slice/investors/MarketPlaceSlice";


const dummyInvestments = [
    { id: "1", type: "Commercial", status: "Open", title: "Software Engineering Fund", interest: 2 },
    { id: "2", type: "Endowment", status: "Closed", title: "Product Design Fund", interest: 20 },
    { id: "3", type: "Commercial", status: "Open", title: "AI Startup Investment", interest: 5 },
    { id: "4", type: "Endowment", status: "Closed", title: "Healthcare Innovation Fund", interest: 15 },
    { id: "5", type: "Commercial", status: "Open", title: "Blockchain Research Grant", interest: 10 },
    { id: "6", type: "Endowment", status: "Open", title: "Renewable Energy Project", interest: 8 },
    { id: "7", type: "Commercial", status: "Closed", title: "E-commerce Growth Fund", interest: 12 },
    { id: "8", type: "Endowment", status: "Open", title: "Education Scholarship Endowment", interest: 7 },
    { id: "9", type: "Commercial", status: "Open", title: "Real Estate Expansion Fund", interest: 9 },
    { id: "10", type: "Endowment", status: "Closed", title: "Non-Profit Development Grant", interest: 6 },
    { id: "11", type: "Endowment", status: "Open", title: "Renewable Energy Project", interest: 8 },
    { id: "12", type: "Commercial", status: "Closed", title: "E-commerce Growth Fund", interest: 12 },
    { id: "13", type: "Endowment", status: "Open", title: "Education Scholarship Endowment", interest: 7 },
    { id: "14", type: "Commercial", status: "Open", title: "Real Estate Expansion Fund", interest: 9 },
    { id: "15", type: "Endowment", status: "Closed", title: "Non-Profit Development Grant", interest: 6 }
];

export const HandleCardDetails = (
    id: string,
    type: string,
    router: ReturnType<typeof useRouter>
) => {
    store.dispatch(setMarketInvestmentVehicleId({
        marketInvestmentVehicleId: id,
        vehicleType: type
    }));
    router.push("/marketplace/details");
};

export const handleSearchChange = (setSearchTerm: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


export const handleSelectChange = (value: string, setSelectedValue: (value: string) => void) => {
    setSelectedValue(value);
};

const MarketPlaceView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    console.log(setSearchTerm)
    const [selectedValue, setSelectedValue] = useState<string>('');
    // const router = useRouter();

    return (
        <main id={"marketplaceView"} className={`py-9 px-5`}>
            <div id={"searchDiv"} className={`px-2 flex md:flex-row flex-col gap-3`}>
                    <SearchInput
                        id={'ProgramSearchInput'}
                        value={searchTerm}
                        onChange={handleSearchChange(setSearchTerm)}
                        style={`md:w-20 w-full`}
                    />
                    <CustomSelect
                        id="marketplaceSelect"
                        value={selectedValue}
                        onChange={(value) => handleSelectChange(value, setSelectedValue)}
                        selectContent={['Commercial Investment', 'Endowment Investment']}
                        placeHolder="Type"
                        triggerId="marketplaceTrigger"
                        className={`h-11 md:w-sm w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]`}
                    />
            </div>

            <div id={"card-segmentId"}
                 className="grid grid-cols-1 px-3 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 h-[70vh] overflow-x-hidden overflow-y-auto gap-y-10 gap-x-5">
            {dummyInvestments.map((investment) => {
                    const backgroundColor = investment.type === "Commercial" ? "#D9EAFF" : "#E6F2EA";
                    const imageSrc = investment.type === "Commercial"
                        ? "/asset/image/BlueCircles.svg"
                        :"/asset/image/GreenCircles.svg";
                    const statusClass = investment.status === "Open"
                        ? "bg-green-100 text-[#0D9B48] border-[#B4E5C8} "
                        : "bg-red-100 text-red-600 border-[#F2BCBA]";
                    const borderClass = investment.status === "Open"
                        ? "border-[#B4E5C8]"
                        : "border-[#F2BCBA]";

                    const truncatedTitle = investment.title.length > 10
                        ? investment.title.slice(0, 20) + "..."
                        : investment.title;

                    return (
                        <InvestmentCard
                            key={investment.id}
                            id={investment.id}
                            backgroundColor={backgroundColor}
                            investmentVehicleType={investment.type}
                            imageSrc={imageSrc}
                            investmentVehicleName={truncatedTitle}
                            statusClass={statusClass}
                            status={investment.status}
                            borderClass={borderClass}
                            percentage={investment.interest}
                            HandleCardDetails={HandleCardDetails}
                        />
                    );
                })}
            </div>
        </main>
    );
};

export default MarketPlaceView;


