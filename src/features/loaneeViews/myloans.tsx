'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useViewAllLoanDisbursalQuery, useViewLoansTotalCalculationQuery} from "@/service/admin/loan/Loan-disbursal-api";
import {useRouter} from "next/navigation";
import { setClickedLoanId } from '@/redux/slice/loan/selected-loan';
import { store } from '@/redux/store';
import Details from "@/components/loanee-my-profile/Details";
import styles from '@/features/Overview/index.module.css';
import GeneralEmptyState from "@/reuseable/emptyStates/General-emptystate";
import {MdPersonOutline} from "react-icons/md";
import {AdminViewLoanType} from "@/types/loanee";
import OrganizationLoan from "@/reuseable/cards/OrganizationLoan";

interface LoanGridProps  {
    data: AdminViewLoanType[];
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
    const {data: loaneeLoans, isLoading , isFetching } = useViewAllLoanDisbursalQuery(request)
    const {data:loansTotalCalculations,isLoading:loansTotalCalculationsLoading } = useViewLoansTotalCalculationQuery({})
    const [hasMore, setHasMore] = useState(true);
    const [fetchData, setFetchData] = useState<AdminViewLoanType[]>([]);

    useEffect(() => {
        if (loaneeLoans){
            setFetchData((prev) =>[...prev, ...(loaneeLoans?.data?.body || [])])
            setHasMore(loaneeLoans?.data?.hasNextPage)
            setPageSize(loaneeLoans?.data?.pageSize)
        }
    }, [loaneeLoans]);
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[50vh] px-4">
            {[...Array(3)].map((_, i) => (
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
                        <p>Loanee does not have loan</p>
                    </div>
                }
                className="h-14"
            />
        </div>
    );



    const LoanGrid = ({ data, lastCardObserver, isLoading, handleClick }: LoanGridProps) => (
        <div className="w-full h-full grid gap-4 md:grid-cols-3">
            {data.map((loan:AdminViewLoanType) => (
                <div key={loan.id} ref={lastCardObserver}>
                    <OrganizationLoan
                        id={loan.id}
                        isLoading={isLoading}
                        loanAmountApproved={loan.loanAmountApproved?.toString()}
                        loanAmountOutstanding={loan.loanAmountOutstanding?.toString()}
                        loanAmountRepaid={loan.loanAmountRepaid?.toString()}
                        organizationName={loan.organizationName}
                        handleClick={() => {handleClick(loan.id)}}
                    />
                </div>
            ))}
        </div>
    );

    const RenderIf = ({ condition, children }: { condition: boolean; children: React.ReactNode }) =>
        condition ? <>{children}</> : null;


    return (
        <main className={` w-full h-[85vh]  grid gap-8   pt-3 `}>
            <div className={`w-full flex gap-4  md:gap-6 ${styles.overviewCard} px-4  `}>
                <Details isLoading={loansTotalCalculationsLoading} sx={`  w-[20em] md:w-full  `} name={'Total loan amount'} valueType={"currency"}  id={'loaneeTotalLoan'} showAsWholeNumber={false}   maxWidth={'100%'}  value={loansTotalCalculations?.data?.totalAmountReceived}/>
                <Details isLoading={loansTotalCalculationsLoading} sx={` w-[20em] md:w-full `} id={'loaneeTotalLoaneOutstanding'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount outstanding '} value={loansTotalCalculations?.data?.totalAmountOutstanding} valueType={'currency'}  />
                <Details isLoading={loansTotalCalculationsLoading} sx={` w-[20em] md:w-full `} id={'loaneeTotalAmountRepaid'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount repaid '} value={loansTotalCalculations?.data?.totalAmountRepaid} valueType={'currency'}  />
            </div>
            <section
                className={` max-h-[58vh] overflow-y-auto  pl-4 pr-1 `}>
                <RenderIf condition={isLoading || isFetching}>
                    <LoadingSkeleton />
                </RenderIf>
                <RenderIf condition={!isLoading && !isFetching && fetchData?.length === 0}>
                    <EmptyState />
                </RenderIf>
                <RenderIf condition={!isLoading && !isFetching && fetchData?.length > 0}>
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