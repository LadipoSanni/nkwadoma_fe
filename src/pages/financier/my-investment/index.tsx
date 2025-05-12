"use client";
import React, {  useState, useEffect } from "react";
import { store } from "@/redux/store";
import SearchInput from "@/reuseable/Input/SearchInput";
import CustomSelect from "@/reuseable/Input/Custom-select";
import { useRouter } from "next/navigation";
import { setCurrentMyInvestmentVehicleDetails } from "@/redux/slice/financier/financier";
import {useFilterMyInvestmentQuery, useSearchMyInvestmentQuery} from '@/service/financier/api'
import dynamic from "next/dynamic";
import {
     CurrentMyInvestmentVehicleDetails,
} from "@/types/Component.type";
import Card from "@/pages/financier/my-investment/card";
import MarketPlaceInvestmentGrid from "@/reuseable/Skeleton-loading-state/Skeleton-for-MarketPlace";
import {MdOutlinePayments, MdSearch} from "react-icons/md";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import InfiniteScroll from "react-infinite-scroll-component";

const MyInvestmentContent = dynamic(
    () => Promise.resolve(MyInvestment),
    {ssr: false}
)


const MyInvestment = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [isFiltered, setIsFiltered] = useState<boolean>(false)
    const [hasNextPage, setNextPage] = useState(true);
    const [pageNumber,setPageNumber] = useState(0)

    const filterProps = {
        investmentVehicleType: selectedValue?.toUpperCase(),
        pageSize: 10,
        pageNumber: pageNumber
    }

    const searchProps = {
        name: searchTerm,
        investmentType: selectedValue?.toUpperCase(),
        pageSize: 10,
        pageNumber: pageNumber
    }
    const {data: filteredData, isLoading: isFilteredDataLoading, isFetching: isFetchingFilteredItems} = useFilterMyInvestmentQuery(filterProps)
    const {data: searchData, isLoading: isSearchItemLoading, isFetching: isFetchingSearchTerms} = useSearchMyInvestmentQuery(searchProps, {skip: !searchTerm})
    const [myInvestmentVehicles, setMyInvestmentVehicles] = useState(filteredData?.data?.body)

    useEffect(()=> {
        setMyInvestmentVehicles(filteredData?.data?.body)
        // if (searchTerm?.length !== 0){
        //     setMyInvestmentVehicles([])
        //     setMyInvestmentVehicles([])
        // }
        if (searchTerm === '' && searchData?.data?.body){
            console.log('inside useEffect')
            setMyInvestmentVehicles([])
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setMyInvestmentVehicles((prev)=> {
                console.log('adding more cause why not ??')
                if(pageNumber === 0) {
                    console.log('on page one')
                    return searchData?.data?.body
                }
                const newInvestmentVehicle = searchData?.data?.body.filter(
                    (newFinancier: CurrentMyInvestmentVehicleDetails) => !prev.some((prevVehicle: CurrentMyInvestmentVehicleDetails) => prevVehicle.id === newFinancier.id)
                );
                console.log('prev:: ', prev)
                console.log('newInvestmentVehicle:: ', newInvestmentVehicle)
                console.log('expected total: ', [...prev, ...newInvestmentVehicle])
                return [...prev, ...newInvestmentVehicle]
            })
            setNextPage(searchData?.data?.hasNextPage)
        }
        if (isFiltered && searchData?.data?.body?.length === 0 && filteredData?.data?.body !== 0){
            setMyInvestmentVehicles([])
            setMyInvestmentVehicles(
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                (prev)=> {
                    if(pageNumber === 0) {
                        return filteredData?.data?.body
                    }
                    const newInvestmentVehicle = filteredData?.data?.body.filter(
                        (newFinancier: CurrentMyInvestmentVehicleDetails) => !prev.some((prevVehicle: CurrentMyInvestmentVehicleDetails) => prevVehicle.id === newFinancier.id)
                    );
                    return [...prev, ...newInvestmentVehicle]
                }

                // filteredData?.data?.body
            )
            setNextPage(filteredData?.data?.hasNextPage)
        }
    }, [isFiltered, filteredData, searchData, searchTerm,hasNextPage,pageNumber])


    const loadMore = () => {
        console.log('load more ....')
        if (!isFetchingFilteredItems && hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };


    const HandleCardDetails = (vehicleDetails: CurrentMyInvestmentVehicleDetails ) => {
        store.dispatch(
            setCurrentMyInvestmentVehicleDetails(vehicleDetails)
        );
        router.push("/my-investment/details");
    };






    const getStatusColor = (status: string) => {
        if(status === 'CLOSE') {
            return 'bg-red-100 md:bg-red-100 md:text-red-600 text-red-600 border-[#F2BCBA] md:border-[#F2BCBA]'
        }
        return 'bg-green-100 md:bg-green-100 md:text-[#0D9B48] text-[#0D9B48] border-[#B4E5C8] md:border-[#B4E5C8]'
    }

    const getStatusBorderColor =  (status: string) => {
        if(status === 'CLOSE') {
            return 'border-[#F2BCBA] md:border-[#F2BCBA]'
        }
        return 'border-[#B4E5C8] md:border-[#B4E5C8]'
    }

    const filterInvestments = (type: string) => {
        if (type === 'All'){
            setSelectedValue('')
            setIsFiltered(true)
        }else {
            setSelectedValue(type)
            setIsFiltered(true)
        }
    }

    // dataLength={myInvestmentVehicles.length}
    // next={loadMore}
    // hasMore={hasNextPage}
    // loader={isFetchingFilteredItems ? <MarketPlaceInvestmentGrid /> : null}


    return (
        <main
            id="marketplaceView"
            className="py-9 px-5 h ">
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
                    onChange={(value) => filterInvestments(value)}
                    selectContent={["Commercial", "Endowment", 'All']}
                    placeHolder="Type"
                    triggerId="marketplaceTrigger"
                    className="h-11 md:w-sm w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
                />
            </div>

            { isFilteredDataLoading || isSearchItemLoading || isFetchingSearchTerms || isFetchingFilteredItems ? (
                <div className="w-full">
                    <MarketPlaceInvestmentGrid />
                </div>
            ) : myInvestmentVehicles?.length === 0  || !myInvestmentVehicles   ? (
                <div className="flex justify-center items-center text-center md:h-[40vh] h-[40%] w-full mt-40">
                    { selectedValue === '' ?
                        <LoanEmptyState title={"Investment vehicles will show here"}
                                     description={"There are no Investment vehicles available yet"}
                                     icon={<MdOutlinePayments height={`5rem`} width={"5rem"} color={"#142854"}/>}
                                     iconBg={`#D9EAFF`} id={"vehicleEmptyState"}/>
                        :
                        <LoanEmptyState title={"Investment vehicles will show here"}
                                        description={`There are no ${selectedValue} Investment vehicles available yet`}
                                        icon={<MdOutlinePayments height={`5rem`} width={"5rem"} color={"#142854"}/>}
                                        iconBg={`#D9EAFF`} id={"vehicleEmptyState"}/>
                    }                </div>
            ) :  searchData?.data?.body?.length === 0 && searchTerm?.length  !== 0 ?   (
                        <SearchEmptyState icon={MdSearch} name="Investment" />
                ):
                (
                <InfiniteScroll
                    dataLength={myInvestmentVehicles.length}
                    next={loadMore}
                    hasMore={hasNextPage}
                    loader={isFetchingFilteredItems ? <MarketPlaceInvestmentGrid /> : null}
                    //  scrollableTarget="select-content"
                    height="70vh"
                    className="grid grid-cols-1 px-3 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 h-[70vh] overflow-x-hidden overflow-y-auto gap-y-10 gap-x-5"
                >

                    {myInvestmentVehicles?.map((vehicle: CurrentMyInvestmentVehicleDetails, index: number) => {
                        const backgroundColor =
                             vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "#D9EAFF"
                                : "#E6F2EA";
                        const imageSrc =
                            vehicle.investmentVehicleType === "COMMERCIAL"
                                ? "/BlueCircles.svg"
                                : "/GreenCircles.svg";
                         const recollectionStatus = vehicle?.recollectionStatus
                        const couponDistributionStatus = vehicle?.couponDistributionStatus
                        const deployingStatus =  vehicle?.deployingStatus
                        const fundRaisingStatus =  vehicle?.fundRaisingStatus
                        const maturity =  vehicle?.maturity
                        const status = recollectionStatus !== null
                            ? 'Recollection'
                            : couponDistributionStatus !== null
                                ? 'Coupon Distribution'
                                : deployingStatus !== null
                                    ? 'Deploying'
                                    : fundRaisingStatus !== null
                                        ? 'Fund Raising'
                                        : 'Maturity';
                        const statusValue = recollectionStatus !== null
                            ? recollectionStatus
                            : couponDistributionStatus !== null
                                ? couponDistributionStatus
                                : deployingStatus !== null
                                    ? deployingStatus
                                    : fundRaisingStatus !== null
                                        ? fundRaisingStatus
                                        : maturity;
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
                            percentage={vehicle.rate || 0}

                        />;
                    })}

                </InfiniteScroll>
            )}
        </main>
    );
};

export default MyInvestmentContent;
