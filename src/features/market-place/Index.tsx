"use client"
import React, {useState} from 'react';
import InvestmentCard from "@/reuseable/cards/Investment-card/InvestmentCard";
import {setMarketInvestmentVehicleId} from "@/redux/slice/program/programSlice";
import {store} from "@/redux/store";
import SearchInput from "@/reuseable/Input/SearchInput";
// import { useSelector } from 'react-redux';


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

export const HandleCardDetails = (id: string) => {
    store.dispatch(setMarketInvestmentVehicleId(id))
}

export const handleSearchChange = () =>{

}

const MarketPlaceView = () => {
    // const marketInvestmentVehicleId = useSelector(
    //     (state: RootState) => state.program.marketInvestmentVehicleId
    // );
    //
    // console.log(marketInvestmentVehicleId);
    const [searchTerm, setSearchTerm] = useState("");
    console.log(setSearchTerm);

    return (
        <main id={"marketplaceView"} className={`pt-2 px-2 max:h-96`}>
            <div id={"searchDiv"} className={`py-4 px-4`}>
                <SearchInput
                    id={'ProgramSearchInput'}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div id={"card-segmentId"}
                 className="grid grid-cols-1 px-4 md:grid-cols-2 lg:grid-cols-4 max:md:h-96 h-96 overflow-x-hidden overflow-y-auto gap-y-10 gap-x-5">
            {dummyInvestments.map((investment) => {
                    const backgroundColor = investment.type === "Commercial" ? "#D9EAFF" : "#E6F2EA";
                    const imageSrc = investment.type === "Commercial"
                        ? "/asset/image/Circles.svg"
                        : "/asset/image/Asset.svg";
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
;

