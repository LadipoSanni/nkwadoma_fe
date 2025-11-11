'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useViewLoaneeLoansQuery, useViewLoansTotalCalculationQuery, useSearchLoaneeLoanQuery} from "@/service/admin/loan/Loan-disbursal-api";
import {useRouter} from "next/navigation";
import { setClickedLoanId } from '@/redux/slice/loan/selected-loan';
import { store } from '@/redux/store';
import Details from "@/components/loanee-my-profile/Details";
import styles from '@/features/Overview/index.module.css';
import GeneralEmptyState from "@/reuseable/emptyStates/General-emptystate";
import {MdPersonOutline} from "react-icons/md";
import { LoanType} from "@/types/loanee";
import SearchInput from "@/reuseable/Input/SearchInput";
import {useDebounce} from "@/hooks/useDebounce";
import LoaneeViewLoan from "@/reuseable/cards/LoaneeViewLoan";
import {inter500} from "@/app/fonts";
import {setMakePaymentFrom} from "@/redux/slice/wallet";

interface LoanGridProps  {
    data: LoanType[];
    lastCardObserver: React.RefCallback<HTMLDivElement>;
    isLoading: boolean;
    handleClick: (id: string) => void;
}

const Myloans = () => {
    const [pageNumber,setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const request = {
        pageSize: pageSize,
        pageNumber: pageNumber,
    }
    const router = useRouter()
    const observer = useRef<IntersectionObserver | null>(null);
    const {data: loaneeLoans, isLoading , isFetching } = useViewLoaneeLoansQuery(request)
    const {data:loansTotalCalculations,isLoading:loansTotalCalculationsLoading } = useViewLoansTotalCalculationQuery({})
    const [hasMore, setHasMore] = useState(true);
    const [fetchData, setFetchData] = useState<LoanType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 100);
    const searchParameter = {
        pageNumber: pageNumber,
        pageSize: pageSize,
        organizationName:debouncedSearchTerm,
    }
    const [loadedData, setLoadedData] = useState<LoanType[]>([]);

    const {data: searchData, isLoading: isSearching, isFetching: isFetchingSearchedData} = useSearchLoaneeLoanQuery(searchParameter , {skip: !debouncedSearchTerm})
    useEffect(() => {
        if (!debouncedSearchTerm){
            // setFetchData((prev) => {
            //     const combined = [...prev, ...(loaneeLoans?.data?.body || [])];
            //     const unique = Array.from(
            //         new Map(combined.map((item) => [item.loanProgressId, item])).values()
            //     );
            //     return unique;
            // });
            setFetchData((prev) => {
                // const combined = [...prev, ...[loadedData ,(loaneeLoans?.data?.body || [])]];
                const combined = [...prev, ...(loadedData || []), ...(loaneeLoans?.data?.body || [])];
                const seen = new Set<number>();
                return combined.filter((item) => {
                    if (seen.has(item.loanProgressId)) return false;
                    seen.add(item.loanProgressId);
                    return true;
                });
            });
            setHasMore(loaneeLoans?.data?.hasNextPage)
            setPageSize(loaneeLoans?.data?.pageSize)
        }else{
            setFetchData(searchData?.data?.body )
            setHasMore(searchData?.data?.hasNextPage)
            setPageSize(searchData?.data?.pageSize)
        }
    }, [loaneeLoans, searchData,debouncedSearchTerm]);
    const handleClick = (loanId:string) => {
        store.dispatch(setClickedLoanId(loanId))
        router.push('/my-loan-profile');
    }

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

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 h-[50vh] px-4">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="w-full h-[20rem] px-4 py-8 animate-pulse bg-[#f4f4f5] rounded-lg"
                />
            ))}
        </div>
    );

    const EmptyState = () => (
        <div className="h-60 relative bottom-3">
            <GeneralEmptyState
                icon={MdPersonOutline}
                iconSize="1.8rem"
                iconContainerClass="w-[50px] h-[50px]"
                message={
                    <div className="relative bottom-2">
                        <p>
                            {searchTerm
                                ? "No matching loan found for the organization you searched."
                                : "Loanee does not have loan"}
                        </p>
                    </div>
                }
                className="h-14"
            />
        </div>
    );



    const LoanGrid = ({ data, lastCardObserver, isLoading, handleClick }: LoanGridProps) => (
        <div className="w-full h-full grid gap-4 md:grid-cols-2">
            {data.map((loan:LoanType, index) => (
                <div key={ "key"+loan.loanProgressId + index} ref={lastCardObserver}>
                    <LoaneeViewLoan
                        isLoading={isLoading}
                        viewLoanDetails={() => {handleClick(loan.loanProgressId)}}
                        makePayment={()=> {
                            store.dispatch(setMakePaymentFrom('my-loans'))
                            router.push('/payment/make-payment')
                        }}
                        data={loan}
                    />
                </div>
            ))}
        </div>
    );

    const RenderIf = ({ condition, children }: { condition: boolean; children: React.ReactNode }) =>
        condition ? <>{children}</> : null;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.value !== ''){
            setLoadedData(fetchData)
        }
        setSearchTerm(event.target.value);
    };


    return (
        <main className={` w-full h-[85vh]  grid gap-8   pt-3 `}>
            <div className={`w-full flex gap-4  md:gap-6 ${styles.overviewCard} px-4  `}>
                <Details isLoading={loansTotalCalculationsLoading} sx={`  w-[20em] md:w-full  `} name={'Total loan amount'} valueType={"currency"}  id={'loaneeTotalLoan'} showAsWholeNumber={false}   maxWidth={'100%'}  value={loansTotalCalculations?.data?.totalAmountReceived}/>
                <Details isLoading={loansTotalCalculationsLoading} sx={` w-[20em] md:w-full `} id={'loaneeTotalLoaneOutstanding'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount outstanding '} value={loansTotalCalculations?.data?.totalAmountOutstanding} valueType={'currency'}  />
                <Details isLoading={loansTotalCalculationsLoading} sx={` w-[20em] md:w-full `} id={'loaneeTotalAmountRepaid'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount repaid '} value={loansTotalCalculations?.data?.totalAmountRepaid} valueType={'currency'}  />
            </div>
            <div className={` px-4 flex justify-between  `}>
                <p className={` hidden lg:flex md:flex text-base mt-auto mb-auto  ${inter500.className} text-black `}>Loan portfolio</p>
                <SearchInput
                    id={'searchField'}
                    data-testid={'searchField'}
                    placeholder={'Search by organization'}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <section
                className={` max-h-[48vh] overflow-y-auto  pl-4 pr-1 `}>
                <RenderIf condition={isLoading || isFetching || isSearching || isFetchingSearchedData}>
                    <LoadingSkeleton />
                </RenderIf>
                <RenderIf condition={!isLoading && !isFetching && !isSearching && !isFetchingSearchedData && fetchData?.length === 0}>
                    <EmptyState />
                </RenderIf>
                <RenderIf condition={!isLoading && !isFetching && !isSearching && !isFetchingSearchedData && fetchData?.length > 0}>
                    <LoanGrid
                        data={fetchData}
                        lastCardObserver={lastCardObserver}
                        isLoading={isFetching || isLoading}
                        handleClick={handleClick}
                    />
                </RenderIf>
            </section>
        </main>
    );
};

export default Myloans;